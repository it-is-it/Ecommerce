"use client";
import { useProduct } from "@/context/product";
import { useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import Pagination from "../product/Pagination";

export default function ProductList() {
  const {
    products,
    fetchProducts,
    currentPage,
    totalPages,
    setUpdatingProduct,
  } = useProduct();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get("page");

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleClick = (product) => {
    setUpdatingProduct(product);
    router.push(`/dashboard/admin/product`);
  };

  return (
    <div className="container my-5">
      <div className="row gx-3">
        {products?.map((product) => (
          <div key={product?._id} className="col-lg-6 my-3">
            <div style={{ height: "200px", overflow: "hidden" }}>
              <Image
                src={product?.images[0]?.secure_url || `/images/default.jpeg`}
                alt={product?.title}
                width={500}
                height={300}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <div className="card-body">
              <h5
                className="card-title pointer"
                onClick={() => handleClick(product)}
              >
                ${product?.price?.toFixed(2)} {product?.title}
              </h5>

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
          </div>
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        pathname={pathname}
      />
    </div>
  );
}
