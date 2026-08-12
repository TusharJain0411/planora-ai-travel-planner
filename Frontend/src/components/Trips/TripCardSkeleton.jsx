import "../../CSS/tripCardSkeleton.css";
import { useSelector } from "react-redux";


export default function TripCardSkeleton() {
const {theme}=useSelector((state)=>state.commonStates);

    return (
    <div className={`tripSkeletonCard ${theme?"":"light-tripSkeletonCard"}`}>
      {/* Image */}
      <div className="trip-skeleton trip-skeletonImage"></div>

      {/* Content */}
      <div className="trip-skeletonContent">
        <div className="trip-skeleton trip-skeletonTitle"></div>

        <div className="trip-skeleton trip-skeletonText"></div>
        <div className="trip-skeleton trip-skeletonText short"></div>

        {/* Details */}
        <div className="trip-skeletonDetails">
          <div className="trip-skeleton trip-skeletonDetail"></div>
          <div className="trip-skeleton trip-skeletonDetail"></div>
          <div className="trip-skeleton trip-skeletonDetail"></div>
        </div>

        {/* Button */}
        <div className="trip-skeleton trip-skeletonButton"></div>
      </div>
    </div>
  );
}
