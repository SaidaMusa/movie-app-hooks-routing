import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ open, onClose, children }: Props) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const closeBtnRef =
  useRef<HTMLButtonElement>(null);

useEffect(() => {
  if (open) {
    closeBtnRef.current?.focus();
  }
}, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
  ref={closeBtnRef}
  className={styles.close}
  onClick={onClose}
>
  ✖
</button>

        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;