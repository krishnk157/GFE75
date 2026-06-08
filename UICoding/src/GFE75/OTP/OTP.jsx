import "./OTP.css";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const OTP = ({ otpLength = 6 }) => {
  const [otp, setOtp] = useState(Array.from({ length: otpLength }, () => ""));
  const inputRefs = useRef([]);

  const handleKeyDown = (e, index) => {
    const { key } = e;

    if (key === "Backspace") {
      setOtp((prevOtps) => {
        const copy = [...prevOtps];
        copy[index] = "";
        return [...copy];
      });
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
      return;
    }

    // ArrowLeft
    if (key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
      return;
    }

    // ArrowRight
    if (key === "ArrowRight" && index < otpLength - 1) {
      inputRefs.current[index + 1].focus();
      return;
    }

    if (isNaN(key)) {
      return;
    }
    setOtp((prevOtps) => {
      const copy = [...prevOtps];
      copy[index] = key;
      return [...copy];
    });
    if (index < otpLength - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  return (
    <div className="otp-container">
      {otp.map((value, index) => {
        return (
          <input
            className="input-box"
            key={index}
            value={value}
            ref={(currValue) => (inputRefs.current[index] = currValue)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
};

export default OTP;
