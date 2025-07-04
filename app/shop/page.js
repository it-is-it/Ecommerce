import ProductFilter from "@/components/product/ProductFilter";
import Pagination from "@/components/product/Pagination";
import ProductCard from "@/components/product/ProductCard";

export const dynamic = "force-dynamic";

async function getProducts(searchParams) {
  const searchQuery = new URLSearchParams({
    page: searchParams.page || 1,
    minPrice: searchParams.minPrice || "",
    maxPrice: searchParams.maxPrice || "",
    ratings: searchParams.ratings || "",
    category: searchParams.category || "",
    tag: searchParams.tag || "",
    brand: searchParams.brand || "",
  }).toString();
  try {
    const response = await fetch(
      `${process.env.API}/product?${searchQuery}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    if (!data || !Array.isArray(data.products)) {
      console.error("No products returned");
      return { products: [], currentPage: 1, totalPages: 1 };
    }
    return data;
  } catch (err) {
    console.log(err);
    return { products: [], currentPage: 1, totalPages: 1 };
  }
}

export default async function Shop({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const { currentPage, totalPages, products } = await getProducts(
    resolvedSearchParams
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 overflow-auto" style={{ maxHeight: "90vh" }}>
          <ProductFilter searchParams={resolvedSearchParams} />
        </div>
        <div className="col-lg-9 overflow-auto" style={{ maxHeight: "90vh" }}>
          <h4 className="text-center fw-bold mt-3">Shop Latest Products</h4>

          <div className="row">
            {products?.map((product) => (
              <div className="col-lg-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <br />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={resolvedSearchParams}
            pathname="/shop"
          />
        </div>
      </div>
    </div>
  );
}
