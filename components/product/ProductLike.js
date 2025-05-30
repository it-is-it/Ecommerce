"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

export default function ProductLike({ product }) {
  const { data, status } = useSession();
  const [likes, setLikes] = useState(product?.likes);
  const router = useRouter();
  const pathname = usePathname();

  const isLiked = likes?.includes(data?.user?._id);

  const handleLike = async () => {
    if (status === "unauthenticated") {
      toast.error("Please sign in to like this product");
      router.push(`/login?callbackUrl=${pathname}`);
      return;
    }

    try {
      if (isLiked) {
        const answer = window.confirm(
          "Are you sure you want to unlike this product?"
        );
        if (answer) {
          handleUnlike();
        }
      } else {
        const response = await fetch(`${process.env.API}/user/product/like`, {
          method: "PUT",
          body: JSON.stringify({ productId: product?._id }),
        });

        if (!response.ok) {
          throw new Error("Failed to like product");
        } else {
          const data = await response.json();
          setLikes(data?.likes);
          toast.success("Product liked successfully");
          router.refresh();
        }
      }
    } catch (error) {
      toast.error("Failed to like this product");
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await fetch(`${process.env.API}/user/product/unlike`, {
        method: "PUT",
        body: JSON.stringify({ productId: product?._id }),
      });

      if (!response.ok) {
        throw new Error("Failed to unlike product");
      } else {
        const data = await response.json();
        setLikes(data?.likes);
        toast.success("Product unliked successfully");
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to unlike this product");
    }
  };

  return (
    <small>
      {!likes?.length ? (
        <>
          <span onClick={handleLike} className="pointer">
            ❤️ Be the first person to like
          </span>
        </>
      ) : (
        <>
          <span onClick={handleLike} className="pointer">
            ❤️ {likes?.length} people liked
          </span>
        </>
      )}
    </small>
  );
}
