import "../../CSS/travelDetailsCSS/budget.css";
import {
  FaWallet,
  FaMoneyBillWave,
  FaGem,
  FaCrown,
  FaRupeeSign,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setBudget } from "../../Redux/Slice/tripSlice";


function Budget() {
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.commonStates);

  const { amount } = useSelector((state) => state.trip.budget);

  const MIN = 1000;
  const MAX = 500000;

  const percentage = ((amount - MIN) / (MAX - MIN)) * 100;

  let category = "Economy";

  if (percentage >= 75) {
    category = "Premium";
  } else if (percentage >= 50) {
    category = "Luxury";
  } else if (percentage >= 25) {
    category = "Standard";
  }

  const handleBudgetChange = (e) => {
    const value = Number(e.target.value);

    const progress = ((value - MIN) / (MAX - MIN)) * 100;

    let selectedCategory = "Economy";

    if (progress >= 75) {
      selectedCategory = "Premium";
    } else if (progress >= 50) {
      selectedCategory = "Luxury";
    } else if (progress >= 25) {
      selectedCategory = "Standard";
    }

    dispatch(
      setBudget({
        amount: value,
        category: selectedCategory,
      }),
    );
  };


  const options = [
    {
      title: "Economy",
      subtitle: "Budget-friendly",
      icon: <FaWallet />,
    },
    {
      title: "Standard",
      subtitle: "Best value",
      icon: <FaMoneyBillWave />,
    },
    {
      title: "Luxury",
      subtitle: "Premium comfort",
      icon: <FaGem />,
    },
    {
      title: "Premium",
      subtitle: "Ultra luxury",
      icon: <FaCrown />,
    },
  ];

  return (
    <section className={`budget-section ${theme ? "" : "light-budget"}`}>
      <div className="budget-header">
        <div className="budget-title">
          <div className="budget-icon">
            <FaRupeeSign />
          </div>

          <h2>Budget</h2>
        </div>

        <div className="budget-value">₹{amount.toLocaleString("en-IN")}</div>
      </div>

      <div
        className={`slider-area ${
          theme ? "dark-slider-area" : "light-slider-area"
        }`}
      >
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={1000}
          value={amount}
          style={{
            "--progress": `${percentage}%`,
          }}
          onChange={handleBudgetChange}
        />

        <div className="slider-labels">
          <span>1000</span>
          <span>₹5,00,000</span>
        </div>
      </div>

      <div className="budget-grid">
        {options.map((item) => (
          <div
            key={item.title}
            className={`budget-card ${
              category === item.title ? "active-budget" : ""
            }`}
          >
            <div className="budget-card-icon">{item.icon}</div>

            <div>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Budget;
