"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductImage({ product }) {
  const [shoeImagePreviewModal, setShowImagePreviewModal] = useState(false);
  const [currentImagePreviewUrl, setCurrentImagePreviewUrl] = useState("");

  const openModal = (url) => {
    setCurrentImagePreviewUrl(url);
    setShowImagePreviewModal(true);
  };

  const closeModal = () => {
    setShowImagePreviewModal(false);
    setCurrentImagePreviewUrl("");
  };

  const showImage = (src, title) => (
    <Image
      alt={title ?? "Product image"}
      src={src}
      width={500}
      height={300}
      className="card-img-top"
      style={{ objectFit: "contain", width: "100%", height: "100%" }}
    />
  );
  return (
    <>
      {shoeImagePreviewModal && (
        <div className="modal fade show" style={{ display: "block" }} onClick={closeModal}>
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            style={{ maxHeight: "calc(100vh -60px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-content"
              style={{ height: "calc(100% -60px)" }}
            >
              <div className="modal-body">
                {showImage(currentImagePreviewUrl, product?.title)}
              </div>
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
      )}
      <div className="d-flex justify-content-center align-items-center">
        {product?.images?.length > 0 ? (
          <>
            {product?.images?.map((image) => (
              <div
                key={image.public_id}
                style={{
                  height: "350px",
                  overflow: "hidden",
                }}
                className="pointer"
                onClick={() => openModal(image?.secure_url)}
              >
                {showImage(image?.secure_url, product?.title)}
              </div>
            ))}
          </>
        ) : (
          <div
            style={{ height: "350px", overflow: "hidden" }}
            className="pointer"
            onClick={() => openModal("/images/default.jpeg")}
          >
            {showImage("/images/default.jpeg", product?.title)}
          </div>
        )}
      </div>
    </>
  );
}
