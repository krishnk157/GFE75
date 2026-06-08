import { useRef, useEffect } from "react";

function useClickOutSide(elementRef, handler) {
  useEffect(() => {
    const cb = (e) => {
      if (!elementRef?.current?.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", cb);

    return () => {
      document.removeEventListener("mousedown", cb);
    };
  }, [elementRef, handler]);
}

export default function ModalDialog({ isOpen, closeModal, children, title }) {
  const modalRef = useRef();
  useClickOutSide(modalRef, closeModal);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeModal]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div
        className="modal-container"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h1 className="modal-title">{title}</h1>
        {children}

        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}
