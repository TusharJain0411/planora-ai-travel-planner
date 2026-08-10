import "../../CSS/itinerary/budgetCard.css";
import { useSelector } from "react-redux";
export default function BudgetCard({ item, total }) {
  const percentage = ((item.amount / total) * 100).toFixed(0);
const{ theme}=useSelector((state)=>state.commonStates);
  return (
    <div className={`budgetCard ${theme?"":"light-budgetCard"}`}>
      <div className="budgetCardTop">
        <div className="budgetIcon">
          <span>{item.icon}</span>
        </div>

        <div className="budgetInfo">
          <h3>{item.title}</h3>
          <p>{percentage}% of total budget</p>
        </div>

        <h2>₹{item.amount.toLocaleString()}</h2>
      </div>

      <div className="budgetProgress">
        <div
          className="budgetFill"
          style={{
            width: `${percentage}%`,
            background: item.color,
          }}
        ></div>
      </div>
    </div>
  );
}
