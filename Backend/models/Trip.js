import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    destination: {
      name: String,
      placeId: String,
      lat: Number,
      lng: Number,
    },

    travelDates: {
      startDate: {
        type: Date,
        required: true,
      },

      endDate: {
        type: Date,
        required: true,
      },

      duration: Number,
    },

    travelers: {
      adults: {
        type: Number,
        default: 1,
      },

      children: {
        type: Number,
        default: 0,
      },

      infants: {
        type: Number,
        default: 0,
      },

      rooms: {
        type: Number,
        default: 1,
      },
    },

    budget: {
      amount: Number,

      category: {
        type: String,
        enum: ["Economy", "Standard", "Luxury", "Premium"],
      },
    },

    travelStyle: {
      style: {
        type: String,
        enum: [
          "Solo",
          "Couple",
          "Family",
          "Friends",
          "Backpacking",
          "Adventure",
        ],
      },

      interests: [
        {
          type: String,
        },
      ],
    },

    preferences: {
      transport: {
        type: String,
        enum: ["Flight", "Train", "Road Trip", "Bus", "Cruise"],
      },

      accommodation: {
        type: String,
        enum: ["Hotel", "Villa", "Homestay", "Hostel", "Resort"],
      },

      food: {
        type: String,
        enum: ["Vegetarian", "Non-Veg", "Vegan", "Jain"],
      },

      extras: [
        {
          type: String,
        },
      ],
    },

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "generated", "completed"],
    },

    itinerary: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Trip", tripSchema);
