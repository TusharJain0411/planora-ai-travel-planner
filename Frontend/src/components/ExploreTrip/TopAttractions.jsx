import { FaStar } from "react-icons/fa";

import "../../CSS/exploreTrip/topAttractions.css";

import { useSelector } from "react-redux";

export default function TopAttractions({ destination }) {

const {theme}=useSelector((state)=>state.commonStates);

    return (
    <section className={`topAttractions ${theme?"":"light-topAttractions"}`}>
      <div className="sectionHeading">
        <h2>Top Attractions</h2>
        <p>Must-visit places during your trip.</p>
      </div>

      <div className="attractionsGrid">
        {destination.attractions.map((place, index) => (
          <div className="attractionCard" key={index}>
            <div className="attractionImage">
              <img src={place.image} alt={place.name} />

              <div className="attractionRating">
                <FaStar />
                {place.rating}
              </div>
              <div className="attractionContent">
                <h3>{place.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
