import Pagination from "@/components/product/Pagination";
import ProductCard from "@/components/product/ProductCard";

export async function getProducts(searchParams) {
  const searchQuery = new URLSearchParams({
    page: (await searchParams)?.page || "1",
  }).toString();

  const response = await fetch(`${process.env.API}/product?${searchQuery}`, {
    method: "GET",
    next: {
      revalidate: 10,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
}

export default async function Home({ searchParams }) {
  const { products, totalPages, currentPage } = await getProducts(searchParams);

  return (
    <div className="container">
      <h1 className="display-4 text-center">
        <strong>Latest Products</strong>
      </h1>

      <div className="row">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        pathname={"/"}
      />
    </div>
  );
}
