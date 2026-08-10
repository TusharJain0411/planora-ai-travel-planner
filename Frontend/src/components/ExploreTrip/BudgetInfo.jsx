import { FiBriefcase, FiCheck } from "react-icons/fi";

import { FaGem, FaCrown } from "react-icons/fa";

import { MdOutlineWorkspacePremium } from "react-icons/md";

import "../../CSS/exploreTrip/budgetInfo.css";
import { useSelector } from "react-redux";

export default function BudgetInfo({ destination }) {
  const plans = destination.budget;
const {theme}=useSelector((state)=>state.commonStates);
  return (
    <section className="budgetSection">
      <div className={`budgetHeading ${theme?"":"light-budgetHeading"}`}>
        <h2>Budget Estimator</h2>
        <p>Estimated cost for your trip</p>
      </div>

      <div className="budgetCards">
        {plans.map((plan, index) => (
          <div key={index} className={`budgetCard ${plan.type.toLowerCase()}`}>
            {/* {plan.popular && <span className="popularBadge">Popular</span>} */}
            <div className="budgetCard-Head">
              <div className="budgetIcon">
                {plan.type === "Economy" && <FiBriefcase />}

                {plan.type === "Standard" && <MdOutlineWorkspacePremium />}

                {plan.type === "Luxury" && <FaGem />}

                {plan.type === "Premium" && <FaCrown />}
              </div>
              <h3>{plan.type}</h3>
            </div>

            <h1>{plan.price}</h1>

            <span className="perDay">per day</span>

            <div className="totalBox">
              <small>12-day total</small>
              <h4>{plan.total}</h4>
            </div>

            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <FiCheck />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
