import { FaStar } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

import "../../CSS/exploreTrip/destinationHero.css";

export default function DestinationHero({ destination }) {
  return (
    <section className="destinationHero">
      <img src={destination.heroImage} alt={destination.name} />

      <div className="heroOverlay">
        <div className="heroContent">
          <span className="country">
            <FiMapPin />
            {destination.country}
          </span>

          <h1>{destination.name}</h1>

          <div className="heroRating">
            <FaStar />
            <span>{destination.rating}</span>
            <small>({destination.reviews.toLocaleString()} Reviews)</small>
          </div>

          <div className="heroTags">
            {destination.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
