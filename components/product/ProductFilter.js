import { priceRanges } from "@/utils/filterData";
import Link from "next/link";

export default function ProductFilter({ searchParams }) {
  const pathname = "/shop";
  const { minPrice, maxPrice, ratings, category, tag, brand } = searchParams;

  const button = "btn btn-secondary mx-1 border-20";
  const activeButton = "btn btn-primary mx-1 border-20";

  return (
    <div>
      <p className="lead">Filter Products</p>

      <p className="text-primary mt-4 alert alert-secondary">Price</p>
      <div className="row d-flex align-items-center mx-1">
        {priceRanges?.map((range) => {
          const url = {
            pathname,
            query: {
              ...searchParams,
              minPrice: range?.min,
              maxPrice: range?.max,
              page: 1,
            },
          };

          const isActive =
            minPrice === String(range?.min) && maxPrice === String(range?.max);
          return (
            <Link href={url} className={isActive ? activeButton : button}>
              {range?.label}
            </Link>
          );
        })}
      </div>

      <pre>{JSON.stringify(searchParams, null, 4)}</pre>
    </div>
  );
}
