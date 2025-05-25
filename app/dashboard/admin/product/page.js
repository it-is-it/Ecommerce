"use client";
import ProductCreate from "@/components/product/ProductCreate";
export default function Product() {
  return (
    <div className="container mb-5 mt-5">
      <div className="row">
        <div className="col">
          <ProductCreate />
        </div>
      </div>
    </div>
  );
}
