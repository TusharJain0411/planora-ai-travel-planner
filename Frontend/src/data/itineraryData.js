export const itinerary = [
  {
    day: 1,
    title: "Arrival in Tokyo",
    date: "2027-03-12",
    displayDate: "12 March 2027",

    activities: [
      {
        time: "09:00 AM",
        title: "Sensoji Temple",
        lat: 35.7148,
        lng: 139.7967,
        description:
          "Visit Tokyo's oldest Buddhist temple and explore the nearby Nakamise shopping street.",
        image:
          "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
        duration: "2 Hours",
        transport: "Metro",
        cost: "Free",
        rating: "4.8",
        tip: "Visit before 9:00 AM to avoid crowds and capture the best photographs.",
      },

      {
        time: "12:00 PM",
        title: "Tokyo Skytree",
        lat: 35.7101,
        lng: 139.8107,
        description:
          "Enjoy breathtaking panoramic views of Tokyo from the observation deck.",
        image:
          "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800",
        duration: "2 Hours",
        transport: "Metro",
        cost: "₹1800",
        rating: "4.7",
        tip: "Book tickets online to skip the queue.",
      },

      {
        type: "Lunch",
        time: "02:15 PM",
        title: "Lunch",
        lat: 35.7101,
        lng: 139.8107,
        description:
          "Take a break and enjoy a delicious meal at one of the nearby restaurants.",

        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",

        duration: "1 Hour",
        transport: "Walk",
        cost: "₹1000 - ₹1500",
        rating: "4.6",
        tip: "Explore nearby restaurants based on your cuisine and dietary preferences.",

        restaurants: [
          {
            placeId: "1",
            name: "Sushi Zanmai",
            image:
              "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600",
            rating: 4.8,
            cuisine: "Japanese Sushi",
            priceLevel: "₹₹₹",
            foodType: "Non-Veg",
            distance: "120 m",
            mapsUrl: "#",
          },

          {
            placeId: "2",
            name: "Ramen Kagetsu",
            image:
              "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=600",
            rating: 4.6,
            cuisine: "Ramen",
            priceLevel: "₹₹",
            foodType: "Both",
            distance: "180 m",
            mapsUrl: "#",
          },

          {
            placeId: "3",
            name: "T's Tantan",
            image:
              "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
            rating: 4.7,
            cuisine: "Vegan Japanese",
            priceLevel: "₹₹",
            foodType: "Veg",
            distance: "250 m",
            mapsUrl: "#",
          },

          {
            placeId: "4",
            name: "Tempura Daikokuya",
            image:
              "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600",
            rating: 4.5,
            cuisine: "Tempura",
            priceLevel: "₹₹₹",
            foodType: "Both",
            distance: "320 m",
            mapsUrl: "#",
          },

          {
            placeId: "5",
            name: "Coco Ichibanya",
            image:
              "https://images.unsplash.com/photo-1544025162-d76694265947?w=600",
            rating: 4.4,
            cuisine: "Japanese Curry",
            priceLevel: "₹₹",
            foodType: "Both",
            distance: "410 m",
            mapsUrl: "#",
          },
        ],
      },
    ],
  },

  {
    day: 2,
    title: "Tokyo City Tour",
    date: "2027-03-13",
    displayDate: "13 March 2027",
    activities: [1, 2],
  },

  {
    day: 3,
    title: "Mount Fuji",
    date: "2027-03-14",
    displayDate: "14 March 2027",
    activities: [1, 2],
  },
];
