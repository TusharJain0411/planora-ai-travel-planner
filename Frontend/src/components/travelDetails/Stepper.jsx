import {
  FaPlaneDeparture,
  FaMapMarkerAlt,
  FaSuitcase,
  FaSlidersH,
} from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import "../../CSS/travelDetailsCSS/stepper.css";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentStep } from "../../Redux/Slice/tripSlice";
import { FaArrowLeft, FaRegBookmark } from "react-icons/fa";
import{useNavigate} from "react-router-dom";

function Stepper() {
  const { currentStep } = useSelector((state) => state.trip);
const {theme} = useSelector((state) => state.commonStates);
const navigate=useNavigate();
const dispatch = useDispatch();

  const steps = [
    {
      id: 1,
      title: "Destination",
      icon: <FaMapMarkerAlt />,
    },
    {
      id: 2,
      title: "Travel Details",
      icon: <FaSuitcase />,
    },
    {
      id: 3,
      title: "Preferences",
      icon: <FaSlidersH />,
    },
    {
      id: 4,
      title: "Generate",
      icon: <FaGears />,
    },
  ];

  const handleBack=()=>{
    navigate("/");
  }

  return (
    <div
      className={`travel-header ${theme ? "dark-travel-header" : "light-travel-header"}`}
    >
      <div className="itinary-navbar">
        <div className="planner-title">
          <button className="back-btn" onClick={handleBack}>
            <FaArrowLeft />
          </button>
          <div className="planner-icon">
            <FaPlaneDeparture />
          </div>

          <div className="title-text">
            <h2>AI Travel Planner</h2>
            <p>Create a personalized itinerary tailored to your preferences.</p>
          </div>
        </div>
      </div>

      <div className={`stepper `}>
        {steps.map((step, index) => (
          <div className="step-wrapper" key={step.id}>
            <div
              className={`step-circle
  ${currentStep > step.id ? "completed" : ""}
  ${currentStep === step.id ? "active" : ""}`}
              onClick={() =>{ dispatch(setCurrentStep(step.id))
                
              }}
              style={{ cursor: "pointer" }}
            >
              {step.icon}
            </div>

            <span>{step.title}</span>

            {index !== steps.length - 1 && (
              <div
                className={`step-line ${currentStep > step.id ? "filled" : ""}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stepper;
