"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useProduct } from "@/context/product";
import ProductCard from "@/components/product/ProductCard";

export default function SearchProducts() {
  const {
    productSearchResults,
    setProductSearchResults,
    setProductSearchQuery,
  } = useProduct();

  const productSearchParams = useSearchParams();
  const productSearchQuery = productSearchParams.get("productSearchQuery");

  useEffect(() => {
    setProductSearchQuery(productSearchQuery);
    fetchProductResultsOnLoad(productSearchQuery);
  }, [productSearchQuery]);

  const fetchProductResultsOnLoad = async (productSearchQuery) => {
    try {
      const response = await fetch(
        `${process.env.API}/search/products?productSearchQuery=${productSearchQuery}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProductSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h4>Search Results: {productSearchResults?.length}</h4>

          <hr />
          <div className="row">
            {productSearchResults?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
