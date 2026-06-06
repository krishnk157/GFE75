import { useRef, useEffect } from "react";
import { INDETERMINATE } from "./App.tsx";

function CheckBox({ label, checked, id, handleChange }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.indeterminate = checked === INDETERMINATE;
  }, [checked]);

  return (
    <div>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={() => handleChange(id)}
      />
      <label>{label}</label>
    </div>
  );
}

export default function Checkboxes({ checkboxData, handleChange }) {
  return (
    <div>
      {checkboxData.map((item) => (
        <div style={{ marginLeft: "1rem", padding: "0.25rem" }} key={item.id}>
          <CheckBox
            label={item.name}
            checked={item.checked}
            id={item.id}
            handleChange={handleChange}
          />
          {item?.children?.length > 0 && (
            <Checkboxes
              checkboxData={item.children}
              handleChange={handleChange}
            />
          )}
        </div>
      ))}
    </div>
  );
}
