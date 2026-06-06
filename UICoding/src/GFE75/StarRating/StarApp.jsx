import { useState } from "react";
import StarRating from "./StarRating";

export default function App() {
  const [currentRating, setCurrentRating] = useState(0);
  return (
    <div>
      <StarRating
        maxRating={5}
        rating={currentRating}
        setRating={setCurrentRating}
      />
    </div>
  );
}
