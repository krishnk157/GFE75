import { useState, useEffect } from "react";

export default function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDate(new Date());
    }, 100);

    //clear timer on ummount
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  let hour = date.getHours();
  const min = String(date.getMinutes()).padStart(2, "0");
  const sec = String(date.getSeconds()).padStart(2, "0");

  const ampm = hour > 12 ? "PM" : "AM";
  hour = String(hour % 12 || 12).padStart(2, "0");

  return (
    <time className="clock" dateTime={`${hour}:${min}:${sec} ${ampm}`}>
      {hour}:{min}:{sec} {ampm}
    </time>
  );
}
