import Trip from "../models/Trip.js";
import { generateItinerary } from "../services/groqService.js";
import { generateImage } from "../services/imageService.js";
import { getPlaceDetails } from "../services/placeService.js";
import { getNearbyRestaurants } from "../services/restaurantService.js";
import { getNearbyStays } from "../services/stayService.js";
import { getFormattedWeather } from "../services/weatherService.js";

export const createItinerary = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    // Return saved itinerary if already generated
    if (trip.itinerary) {
      return res.status(200).json({
        success: true,

        trip: {
          destination: trip.destination,
          travelDates: trip.travelDates,
          travelers: trip.travelers,
          budget: trip.budget,
          travelStyle: trip.travelStyle,
          preferences: trip.preferences,
        },

        itinerary: trip.itinerary,
      });
    }

    // Generate itinerary from Gemini
    let itinerary = await generateItinerary(trip);

    // Remove markdown if Gemini returns it
    itinerary = itinerary
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Convert string to object
    itinerary = JSON.parse(itinerary);

    const destination = trip.destination.name;
    const accommodation = trip.preferences.accommodation;
    const destinationDetails = await getPlaceDetails(destination, destination);
    const stays = await getNearbyStays(destination, accommodation);
    const startDate = new Date(trip.travelDates.startDate)
      .toISOString()
      .split("T")[0];
    const endDate = new Date(trip.travelDates.endDate)
      .toISOString()
      .split("T")[0];

    const weather = await getFormattedWeather(
      destinationDetails.lat,
      destinationDetails.lng,
      startDate,
      endDate,
    );

    for (const day of itinerary.days) {
      for (const activity of day.activities) {
        // 1. Find actual activity place
        const placeDetails = await getPlaceDetails(activity.place, destination);

        // 2. Add place information
        activity.location = {
          address: placeDetails.address,
          lat: placeDetails.lat,
          lng: placeDetails.lng,
        };

        activity.rating = placeDetails.rating;
        activity.image = placeDetails.image;

        // 3. Find restaurants only for meals
        const isMeal = ["Breakfast", "Lunch", "Dinner"].includes(activity.type);

        if (isMeal && placeDetails.lat != null && placeDetails.lng != null) {
          console.log(
            `🍽 Finding restaurants for ${activity.type} at ${activity.place}`,
          );

          activity.restaurants = await getNearbyRestaurants(
            placeDetails.lat,
            placeDetails.lng,
            trip.preferences.food,
          );

          console.log(
            `✅ ${activity.type}: ${activity.restaurants.length} restaurants found`,
          );
        } else {
          activity.restaurants = [];
        }
      }
    }

    // Fill data from database
    itinerary.trip.destination = trip.destination.name;
    itinerary.trip.days = trip.travelDates.duration;
    itinerary.trip.estimatedBudget = trip.budget.amount;

    itinerary.stays = stays;
    itinerary.weather = weather;

    itinerary.trip.travelers = {
      adults: trip.travelers.adults,
      children: trip.travelers.children,
      infants: trip.travelers.infants,
      rooms: trip.travelers.rooms,
      total:
        trip.travelers.adults +
        trip.travelers.children +
        trip.travelers.infants,
    };

    // Temporary AI score
    itinerary.trip.aiScore = 98;

    itinerary.trip.image = await generateImage(itinerary.trip.imageQuery);

    // Save itinerary in database
    trip.itinerary = itinerary;
    trip.status = "generated";

    await trip.save();

    res.status(200).json({
      success: true,

      trip: {
        destination: trip.destination,
        travelDates: trip.travelDates,
        travelers: trip.travelers,
        budget: trip.budget,
        travelStyle: trip.travelStyle,
        preferences: trip.preferences,
      },

      itinerary,
    });
  } catch (err) {
    console.error("Itinerary Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateItinerary = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    // Make sure itinerary exists
    if (!trip.itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }

    // Update itinerary with edited data
    trip.itinerary = req.body.itinerary;

    await trip.save();

    res.status(200).json({
      success: true,
      message: "Itinerary updated successfully",
      itinerary: trip.itinerary,
    });
  } catch (err) {
    console.error("Update Itinerary Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};