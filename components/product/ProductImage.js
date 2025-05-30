"use client";
import Image from "next/image";
import Modal from "@/components/Modal";
import { useProduct } from "@/context/product";

export default function ProductImage({ product }) {
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

  const { showImagePreviewModal, currentImagePreviewUrl, openModal } =
    useProduct();

  return (
    <>
      {showImagePreviewModal && (
        <Modal>{showImage(currentImagePreviewUrl, product?.title)}</Modal>
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
