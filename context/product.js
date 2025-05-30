"use client";
import { useState, useContext, createContext, useEffect } from "react";
import toast from "react-hot-toast";
import Resizer from "react-image-file-resizer";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatingProduct, setUpdatingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [comment, setComment] = useState("");

  const [showImagePreviewModal, setShowImagePreviewModal] = useState(false);
  const [currentImagePreviewUrl, setCurrentImagePreviewUrl] = useState("");

  useEffect(() => {
    // window.addEventListener("click", handleClickOutside);
    // return () => {
    //   window.removeEventListener("click", handleClickOutside);
    // };

    // function handleClickOutside(e) {
    //   if (!e.target.classList.contains("modal")) {
    //     closeModal();
    //   }
    // }
  }, []);

  const openModal = (url) => {
    setCurrentImagePreviewUrl(url);
    setShowImagePreviewModal(true);
  };

  const closeModal = () => {
    setShowImagePreviewModal(false);
    setCurrentImagePreviewUrl("");
  };

  const uploadImages = (e) => {
    const files = e.target.files;

    let allUploadedfiles = updatingProduct
      ? updatingProduct?.images || []
      : product
      ? product?.images || []
      : [];

    const uploadPromises = [];

    if (files) {
      const totalImages = allUploadedfiles?.length + files?.length;
      if (totalImages > 4) {
        toast.error("You can upload maximum 4 images");
        return;
      }
      setUploading(true);

      for (let i = 0; i < files?.length; i++) {
        const file = files[i];

        const promise = new Promise((resolve) => {
          Resizer.imageFileResizer(
            file,
            1280,
            720,
            "JPEG",
            100,
            0,
            (uri) => {
              fetch(`${process.env.API}/admin/upload/image`, {
                method: "POST",
                body: JSON.stringify({ image: uri }),
              })
                .then((response) => response.json())
                .then((data) => {
                  allUploadedfiles.unshift(data);
                  resolve();
                })
                .catch((err) => {
                  console.log("Error uploading image:", err);
                  resolve();
                });
            },
            "base64"
          );
        });
        uploadPromises.push(promise);
      }
    }
    Promise.all(uploadPromises)
      .then(() => {
        updatingProduct
          ? setUpdatingProduct({ ...updatingProduct, images: allUploadedfiles })
          : setProduct({ ...product, images: allUploadedfiles });
        setUploading(false);
      })
      .catch((err) => {
        console.log("Error uploading images:", err);
        setUploading(false);
      });
  };

  const deleteImage = (public_id) => {
    setUploading(true);
    fetch(`${process.env.API}/admin/upload/image`, {
      method: "PUT",
      body: JSON.stringify({ public_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredImages = updatingProduct
          ? updatingProduct?.images?.filter(
              (image) => image?.public_id !== public_id
            )
          : product?.images?.filter((image) => image?.public_id !== public_id);

        updatingProduct
          ? setUpdatingProduct({ ...updatingProduct, images: filteredImages })
          : setProduct({ ...product, images: filteredImages });
      })
      .catch((err) => {
        console.log("Error deleting image:", err);
      })
      .finally(() => setUploading(false));
  };

  const createProduct = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/product`, {
        method: "POST",
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.error || "Error creating product");
      } else {
        toast.success(`Product '${data?.title} created successfully`);
        // router.push("/dashboard/admin/product");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      toast.error("Error creating product");
    }
  };

  const fetchProducts = async (page = 1) => {
    try {
      const response = await fetch(`${process.env.API}/product?page=${page}`, {
        method: "GET",
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.error || "Error fetching products");
      } else {
        setProducts(data?.products);
        setCurrentPage(data?.currentPage);
        setTotalPages(data?.totalPages);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching products");
    }
  };

  const updateProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/product/${updatingProduct?._id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatingProduct),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.error || "Error updating product");
      } else {
        toast.success(`Product '${data?.title} updated successfully`);
        // router.back();
        window.location.href = `/dashboard/admin/products`;
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating product");
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/product/${updatingProduct?._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.error || "Error deleting product");
      } else {
        toast.success(`Product '${data?.title} deleted successfully`);
        // router.back();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
        products,
        setProducts,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        updatingProduct,
        setUpdatingProduct,
        uploading,
        setUploading,
        uploadImages,
        deleteImage,
        createProduct,
        fetchProducts,
        updateProduct,
        deleteProduct,
        showImagePreviewModal,
        setShowImagePreviewModal,
        currentImagePreviewUrl,
        setCurrentImagePreviewUrl,
        openModal,
        closeModal,
        showRatingModal,
        setShowRatingModal,
        currentRating,
        setCurrentRating,
        comment,
        setComment,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
