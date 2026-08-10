import { useState} from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../CSS/travelDetailsCSS/calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { setTravelDates } from "../../Redux/Slice/tripSlice";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar() {

  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const dates = [];

  const { theme } = useSelector((state) => state.commonStates);

  const dispatch = useDispatch();

  const { startDate, endDate } = useSelector((state) => state.trip.travelDates);


  for (let i = 0; i < firstDay; i++) {
    dates.push(null);
  }

  for (let i = 1; i <= totalDays; i++) {
    dates.push(i);
  }

  const previousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

const handleDateClick = (day) => {
  if (!day) return;

  const selectedDate = new Date(year, month, day);

  let newStart = startDate ? new Date(startDate) : null;
  let newEnd = endDate ? new Date(endDate) : null;

  if (!newStart || (newStart && newEnd)) {
    newStart = selectedDate;
    newEnd = null;
  } else if (selectedDate < newStart) {
    newStart = selectedDate;
  } else {
    newEnd = selectedDate;
  }

  const days =
    newStart && newEnd
      ? Math.ceil((newEnd - newStart) / (1000 * 60 * 60 * 24))
      : 0;

  dispatch(
    setTravelDates({
      startDate: newStart ? newStart.toISOString() : null,
      endDate: newEnd ? newEnd.toISOString() : null,
      duration: days,
    }),
  );
};
  
  const isSameDate = (date1, date2) => {
    if (!date1 || !date2) return false;

    const d1 = new Date(date1);
    const d2 = new Date(date2);

    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const isStart = (day) => {
    if (!startDate) return false;

    return isSameDate(startDate, new Date(year, month, day));
  };

  const isEnd = (day) => {
    if (!endDate) return false;

    return isSameDate(endDate, new Date(year, month, day));
  };

  const isBetween = (day) => {
    if (!startDate || !endDate) return false;

    const current = new Date(year, month, day);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return current > start && current < end;
  };
  

  return (
    <div className={`calendar  ${theme ? "dark-calendar":"light-calendar"}`}>
      <div className="calendar-top">
        <button onClick={previousMonth}>
          <FaChevronLeft />
        </button>

        <h3>
          {months[month]} {year}
        </h3>

        <button onClick={nextMonth}>
          <FaChevronRight />
        </button>
      </div>

      <div className="week-row">
        {weekDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="date-grid">
        {dates.map((date, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(date)}
            className={`date-cell
              ${!date ? "empty" : ""}
              ${date && isStart(date) ? "start" : ""}
              ${date && isEnd(date) ? "end" : ""}
              ${date && isBetween(date) ? "between" : ""}
            `}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
