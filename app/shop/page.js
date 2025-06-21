import ProductFilter from "@/components/product/ProductFilter";
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
      `${process.env.API}/product/filters?${searchQuery}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    if (!data || !Array.isArray(data.products)) {
      throw new Error("No products returned");
    }
    return data;
  } catch (err) {
    console.log(err);
    return { products: [], currentPage: 1, totalPages: 1 };
  }
}

export default async function Shop({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const data = await getProducts(resolvedSearchParams);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 d-flex justify-content-between">
          <ProductFilter searchParams={resolvedSearchParams} />
          <div className="col-lg-9">Products list</div>
        </div>
      </div>
    </div>
  );
}
