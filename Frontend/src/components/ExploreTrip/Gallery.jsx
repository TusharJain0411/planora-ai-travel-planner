import "../../CSS/exploreTrip/gallery.css";
import { useSelector } from "react-redux";
export default function Gallery({ destination }) {
  const {theme}=useSelector((state)=>state.commonStates);
  return (
    <section className={`gallerySection ${theme?"":"light-gallertSection"}`}>
      <div className="sectionHeading">
        <h2>Photo Gallery</h2>
        <p>Discover the beauty of {destination.name}</p>
      </div>

      <div className="galleryGrid">
        {destination.gallery.map((image, index) => (
          <div key={index} className={`galleryItem item${(index % 6) + 1}`}>
            <img src={image} alt={`${destination.name} ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
