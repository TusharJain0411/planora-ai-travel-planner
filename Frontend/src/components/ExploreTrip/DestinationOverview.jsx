import { FiGlobe, FiDollarSign, FiClock, FiMapPin } from "react-icons/fi";

import "../../CSS/exploreTrip/destinationOverview.css";

import{useSelector} from "react-redux"

export default function DestinationOverview({ destination }) {
  const info = destination.quickInfo;
  const {theme}=useSelector((state)=>state.commonStates);
  return (
    <section className={`destinationOverview ${theme?"":"light-destinationOverview"}`}>
      <div className="overviewLeft">
        <h2>About {destination.name}</h2>

        <p>{destination.description}</p>
      </div>

      <div className="overviewRight">
        <div className="infoCard">
          <FiDollarSign />
          <div>
            <span>Currency</span>
            <h4>{info.currency}</h4>
          </div>
        </div>

        <div className="infoCard">
          <FiGlobe />
          <div>
            <span>Language</span>
            <h4>{info.language}</h4>
          </div>
        </div>

        <div className="infoCard">
          <FiClock />
          <div>
            <span>Time Zone</span>
            <h4>{info.timezone}</h4>
          </div>
        </div>

        <div className="infoCard">
          <FiMapPin />
          <div>
            <span>Airport</span>
            <h4>{info.airport}</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
