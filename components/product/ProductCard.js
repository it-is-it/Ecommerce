import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import ProductRating from "./ProductRating";
import AddToCart from "./AddToCart";

dayjs.extend(relativeTime);

export default function ProductCard({ product }) {
  return (
    <div key={product?._id} className="card my-3">
      <div
        style={{ position: "relative", height: "300px", overflow: "hidden" }}
      >
        <Image
          alt={product?.name ?? "Product image"}
          src={product?.images?.[0]?.secure_url || `/images/default.jpeg`}
          width={300}
          height={350}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="card-body">
        <Link href={`/product/${product?.slug}`}>
          <div className="card-title flex justify-between items-center">
            <strong>{product?.price ? `$${product.price} ` : "N/A"}</strong>
            <span className="text-blue-600">
              {product?.title?.length > 50
                ? product.title.substring(0, 50) + "..."
                : product.title}
            </span>
          </div>
        </Link>
        <div
          className="card-text"
          dangerouslySetInnerHTML={{
            __html:
              product?.description?.length > 160
                ? `${product?.description?.substring(0, 160)} ...`
                : product?.description,
          }}
        />
      </div>

      <div className="card-footer d-flex justify-content-between">
        <small>Category: {product?.category?.name}</small>
        <small>Tags: {product?.tags?.map((tag) => tag.name).join(", ")}</small>
      </div>

      <div className="card-footer d-flex justify-content-between">
        <small>🩷 Likes</small>
        <small>Created at: {dayjs(product?.createdAt).fromNow()}</small>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <small className={`text-${product?.brand?.length}px`}>
          Brand: {product?.brand}
        </small>
        <ProductRating product={product} leaveARating={false} />
      </div>
      <div className="card-footer">
        <AddToCart product={product} />
      </div>
    </div>
  );
}
