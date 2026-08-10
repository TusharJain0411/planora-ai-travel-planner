import BudgetCard from "./BudgetCard";

import "../../CSS/itinerary/budgetSection.css";

import{useSelector} from "react-redux";

const budget = [
  {
    title: "Hotels",
    icon: "🏨",
    amount: 35000,
    color: "#6C5CE7",
  },
  {
    title: "Food",
    icon: "🍜",
    amount: 12000,
    color: "#00B894",
  },
  {
    title: "Transport",
    icon: "🚄",
    amount: 8500,
    color: "#0984E3",
  },
  {
    title: "Activities",
    icon: "🎟️",
    amount: 15000,
    color: "#F39C12",
  },
  {
    title: "Shopping",
    icon: "🛍️",
    amount: 10000,
    color: "#E84393",
  },
];

const total = budget.reduce((sum, item) => sum + item.amount, 0);

export default function BudgetSection() {

const {theme}=useSelector((state)=>state.commonStates);
  return (
    <section className="budgetSection">
      <div className={`budgetHeader ${theme?"":"light-budgetHeader"}`}>
        <h2>Budget Breakdown</h2>

        <p>Estimated expenses for your entire journey.</p>
      </div>


      <div className={`budgetSummary ${theme?"":"light-budgetSummary"}`}>
        <div>

          <span>Total Estimated Cost</span>
          <span>₹ {total.toLocaleString()}</span>
        </div>

        <div>

          <span>Per Person</span>
          <span>₹ {(total / 2).toLocaleString()}</span>
        </div>

        <div>
          <span>Per Day</span>

          <span>₹ {Math.round(total / 7).toLocaleString()}</span>
        </div>
      </div>

      <div className="budgetGrid">
        {budget.map((item, index) => (
          <BudgetCard key={index} item={item} total={total} />
        ))}
      </div>

    </section>
  );
}
