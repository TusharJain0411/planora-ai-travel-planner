import axios from "axios";

const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth radius in km

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const formatCuisine = (place) => {
  const type = place.primaryType || "";

  const cuisineMap = {
    indian_restaurant: "Indian",
    japanese_restaurant: "Japanese",
    chinese_restaurant: "Chinese",
    italian_restaurant: "Italian",
    mexican_restaurant: "Mexican",
    thai_restaurant: "Thai",
    korean_restaurant: "Korean",
    french_restaurant: "French",
    mediterranean_restaurant: "Mediterranean",
    seafood_restaurant: "Seafood",
    steak_house: "Steakhouse",
    american_restaurant: "American",
    hamburger_restaurant: "Burgers",
    pizza_restaurant: "Pizza",
    barbecue_restaurant: "BBQ",
    vegan_restaurant: "Vegan",
    vegetarian_restaurant: "Vegetarian",
    breakfast_restaurant: "Breakfast",
    cafe: "Cafe",
  };

  return cuisineMap[type] || "Restaurant";
};

const getFoodType = (place) => {
  if (place.primaryType === "vegan_restaurant") {
    return "Veg";
  }

  if (place.primaryType === "vegetarian_restaurant") {
    return "Veg";
  }

  if (place.servesVegetarianFood === true) {
    return "Both";
  }

  return "Non-Veg";
};

const formatPriceLevel = (priceLevel) => {
  const priceMap = {
    PRICE_LEVEL_FREE: "Free",
    PRICE_LEVEL_INEXPENSIVE: "₹",
    PRICE_LEVEL_MODERATE: "₹₹",
    PRICE_LEVEL_EXPENSIVE: "₹₹₹",
    PRICE_LEVEL_VERY_EXPENSIVE: "₹₹₹₹",
  };

  return priceMap[priceLevel] || "Price unavailable";
};

export const getNearbyRestaurants = async (lat, lng, foodPreference) => {
  try {
    if (lat == null || lng == null) {
      console.log("❌ Restaurant coordinates missing");
      return [];
    }

    console.log("🍽 SEARCHING RESTAURANTS NEAR:", lat, lng);

    const response = await axios.post(
      "https://places.googleapis.com/v1/places:searchNearby",
      {
        includedTypes: ["restaurant"],

        maxResultCount: 20,

        rankPreference: "POPULARITY",

        locationRestriction: {
          circle: {
            center: {
              latitude: lat,
              longitude: lng,
            },
            radius: 2000,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",

          "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,

          "X-Goog-FieldMask": [
            "places.id",
            "places.displayName",
            "places.formattedAddress",
            "places.location",
            "places.rating",
            "places.photos",
            "places.googleMapsUri",
            "places.primaryType",
            "places.primaryTypeDisplayName",
            "places.servesVegetarianFood",
            "places.priceLevel",
          ].join(","),
        },
      },
    );

    let places = response.data.places || [];

    // Filter restaurants according to user's food preference

    if (foodPreference?.toLowerCase() === "vegetarian") {
      places = places.filter(
        (place) =>
          place.servesVegetarianFood === true ||
          place.primaryType === "vegetarian_restaurant" ||
          place.primaryType === "vegan_restaurant",
      );
    }

    if (foodPreference?.toLowerCase() === "non-vegetarian") {
      places = places.filter(
        (place) =>
          place.primaryType !== "vegetarian_restaurant" &&
          place.primaryType !== "vegan_restaurant",
      );
    }

    console.log(`✅ FOUND ${places.length} RESTAURANTS`);

    return places.map((place) => {
      let image = "";

      if (place.photos?.length > 0) {
        const photoName = place.photos[0].name;

        image =
          `https://places.googleapis.com/v1/${photoName}/media` +
          `?maxWidthPx=500` +
          `&maxHeightPx=400` +
          `&key=${process.env.GOOGLE_MAPS_API_KEY}`;
      }

      const restaurantLat = place.location?.latitude;

      const restaurantLng = place.location?.longitude;

      const distance =
        restaurantLat != null && restaurantLng != null
          ? calculateDistance(lat, lng, restaurantLat, restaurantLng)
          : null;

      return {
        placeId: place.id || "",

        name: place.displayName?.text || "",

        cuisine: formatCuisine(place),

        priceLevel: formatPriceLevel(place.priceLevel),

        foodType: getFoodType(place),

        distance:
          distance != null
            ? `${distance.toFixed(1)} km`
            : "Distance unavailable",

        rating: place.rating ?? null,

        address: place.formattedAddress || "",

        image,

        location: {
          lat: restaurantLat ?? null,
          lng: restaurantLng ?? null,
        },

        googleMapsUri: place.googleMapsUri || "",
      };
    });
  } catch (error) {
    console.error(
      "❌ RESTAURANT SEARCH ERROR:",
      error.response?.data || error.message,
    );

    return [];
  }
};
