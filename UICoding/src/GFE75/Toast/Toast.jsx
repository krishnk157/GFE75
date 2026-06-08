import "./ToastConatiner.css";
import { useState } from "react";
import { useRef } from "react";

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const timersRef = useRef({});

  const handleClose = (id) => {
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
    setToasts((prevToasts) => {
      const filteredArr = prevToasts.filter((toast) => {
        return toast.id !== id;
      });
      return filteredArr;
    });
  };

  const handleAdd = (type, msg) => {
    const id = new Date().getTime();
    setToasts((prev) => [...prev, { id, msg, type }]);
    timersRef.current[id] = setTimeout(() => handleClose(id), 5000);
  };
  return (
    <>
      <div className="toast-container">
        {toasts.map(({ id, msg, type }) => {
          return (
            <div className={`toast ${type}`} key={id}>
              {msg}
              <span className="toast-action" onClick={() => handleClose(id)}>
                X
              </span>
            </div>
          );
        })}
      </div>

      <div className="btn-containers">
        <button onClick={() => handleAdd("success", "Successful Call")}>
          Success
        </button>
        <button onClick={() => handleAdd("warning", "Warnings found")}>
          Warning
        </button>
        <button onClick={() => handleAdd("info", "Information")}>
          Information
        </button>
        <button onClick={() => handleAdd("error", "Error Occurred")}>
          Error
        </button>
      </div>
    </>
  );
};

export default ToastContainer;
