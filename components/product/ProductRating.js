"use client";
import Stars from "./Stars";
import { calculateAverageRating } from "@/utils/helper";
import { toast } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import { useProduct } from "@/context/product";
import { useSession } from "next-auth/react";

export default function ProductRating({ product }) {
  const {
    showRatingModal,
    setShowRatingModal,
    currentRating,
    setCurrentRating,
    comment,
    setComment,
  } = useProduct();

  const [productRatings, setProductRatings] = useState(product?.ratings || []);
  const [averageRating, setAverageRating] = useState(0);

  const { data, status } = useSession();

  const alreadyRated = productRatings?.find(
    (rate) => rate?.postedBy?._id === data?.user?._id
  );

  useEffect(() => {
    if (alreadyRated) setAverageRating(calculateAverageRating(productRatings));
  }, [productRatings]);

  return <Stars rating={calculateAverageRating(productRatings)} />;
}
