"use client";
import { useProduct } from "@/context/product";

export default function Modal({ children }) {
  const { closeModal } = useProduct();
  return (
    <div
      className="modal fade show"
      style={{ display: "block" }}
      onClick={closeModal}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        style={{ maxHeight: "calc(100vh -60px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content" style={{ height: "calc(100% -60px)" }}>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
