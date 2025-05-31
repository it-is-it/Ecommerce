import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProductImage from "@/components/product/ProductImage";
import ProductLike from "@/components/product/ProductLike";
import ProductRating from "@/components/product/ProductRating";

dayjs.extend(relativeTime);

async function getProduct(slug) {
  const response = await fetch(`${process.env.API}/product/${slug}`, {
    method: "GET",
    next: {
      revalidate: 1,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();
  return data;
}

export default async function ProductViewPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-lg-8 offset-lg-2 card py-5">
          <h1 className="text-center">{product?.title}</h1>

          <ProductImage product={product} />

          <div className="card-body">
            <div
              className="card-text"
              dangerouslySetInnerHTML={{
                __html: product?.description
                  .replace(/\./g, "<br />")
                  .replace(/\n/g, "<br />"),
              }}
            />
          </div>
          <div className="card-footer d-flex justify-content-between">
            <small>Category: {product?.category?.name}</small>
            <small>
              Tags: {product?.tags?.map((tag) => tag.name).join(", ")}
            </small>
          </div>

          <div className="card-footer d-flex justify-content-between">
            <ProductLike product={product} />
            <small>Created at: {dayjs(product?.createdAt).fromNow()}</small>
          </div>

          <div className="card-footer d-flex justify-content-between">
            <small>Brand: {product?.brand}</small>
            <small>
              <ProductRating />
            </small>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h4 className="text-center my-5">Related Products</h4>
        </div>
      </div>
    </div>
  );
}
