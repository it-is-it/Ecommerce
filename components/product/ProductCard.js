import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function ProductCard({ product }) {
  return (
    <div key={product?._id} className="card my-4 col-lg-4 ">
      <div style={{ position: "relative", height: "300px", overflow: "hidden" }}>
        <Image
          alt={product?.name ?? "Product image"}
          src={product?.images?.[0]?.secure_url || `/images/default.jpeg`}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{product?.title}</h5>
        <div
          className="card-text"
          dangerouslySetInnerHTML={{
            __html:
              product?.description?.length > 160
                ? `${product?.description?.substring(0, 160)} ...`
                : product?.description,
          }}
        />
        <p className="card-text">Price: ${product?.price}</p>
        <p className="card-text">Stock: {product?.stock}</p>
        <p className="card-text">Shipping: {product?.shipping}</p>
        <p className="card-text">Category: {product?.category}</p>
        <p className="card-text">Tags: {product?.tags.join(", ")}</p>
        <p className="card-text">Likes: {product?.likes.length}</p>
        <p className="card-text">Ratings: {product?.ratings.length}</p>
        <p className="card-text">Sold: {product?.sold}</p>
        <p className="card-text">Created At: {product?.createdAt}</p>
        <p className="card-text">Updated At: {product?.updatedAt}</p>
      </div>
    </div>
  );
}
