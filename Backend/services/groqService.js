import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const generateItinerary = async (trip) => {

  console.log("DESTINATION SENT TO AI:", trip.destination);

  const prompt = `
You are an expert AI travel planner.

Create a detailed and realistic travel itinerary.

STRICT RULE:
The itinerary MUST be ONLY for the provided destination.
Never replace, modify, translate, or choose another destination.

Trip Details:

Destination:
${trip.destination?.name}

Duration:
${trip.travelDates?.duration} Days

Budget:
₹${trip.budget?.amount}

Budget Category:
${trip.budget?.category}

Travelers:
Adults: ${trip.travelers?.adults}
Children: ${trip.travelers?.children}
Infants: ${trip.travelers?.infants}

Travel Style:
${trip.travelStyle?.style}

Interests:
${
  trip.travelStyle?.interests?.length
    ? trip.travelStyle.interests.join(", ")
    : "None"
}

Transport:
${trip.preferences?.transport}

Accommodation:
${trip.preferences?.accommodation}

Food Preference:
${trip.preferences?.food}

Extra Preferences:
${
  trip.preferences?.extras?.length ? trip.preferences.extras.join(", ") : "None"
}

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do NOT wrap the response in markdown or code fences.
3. Do NOT explain anything.
4. Generate realistic places and timings.
5. Use actual tourist attractions.
6. Include breakfast, lunch and dinner whenever appropriate.
7. Do not use the user's travel date to decide the season. Use the destination's ideal visiting season.
8. For imageQuery, select the most famous and visually attractive landmark, monument, beach, mountain, or tourist attraction from the destination.
9. The imageQuery must contain the attraction name and destination name.
10. Choose a place that represents the destination for a travel cover image.
11. For every activity, generate a useful practical travel tip.
12. The tip should be specific to that activity.
13. Tips can mention what to carry, dress requirements, ticket advice, crowd conditions, photography advice, or local etiquette.
14. Keep each tip short, around 1-2 sentences.

15. For meal activities, the "type" MUST be exactly "Breakfast", "Lunch", or "Dinner".

16. NEVER recommend, generate, invent, or list restaurants.

17. NEVER include restaurant names, ratings, prices, addresses, or restaurant recommendations.

18. For Breakfast, Lunch, and Dinner, provide only a real and searchable area, neighborhood, landmark, or location where the meal should take place.

19. The "place" field for a meal MUST NOT be a restaurant name.

20. Lunch and Dinner locations must be searchable using Google Places.

21. Lunch should normally be scheduled between 12:00 and 14:00.

22. Dinner should normally be scheduled between 19:00 and 21:00.

23. Restaurants will be found separately using Google Places based on the meal location and the user's food preference.

24. Do NOT create a "restaurants" field.

25. Do NOT create restaurant objects anywhere in the response.

26. For sightseeing activities, use "Sightseeing".

Return JSON in this exact format:

{
  "trip": {
    "cities": [],
    "season": "Best season to visit this destination based on weather and tourism",
    "summary": "",
    "imageQuery": "The most iconic tourist attraction or landmark of the destination suitable for a travel cover image"
  },
  "days": [
    {
      "day": 1,
      "city": "",
      "title": "",
      "activities": [
        {
          "time": "09:00",
          "place": "",
          "description": "",
          "type": "",
          "tip": "A short practical travel tip for visiting this place"

        }
      ]
    }
  ]
}
`;

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 4000,
  });

  let result = response.choices[0].message.content;

  result = result
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return result;
};
