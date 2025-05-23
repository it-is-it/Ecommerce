'use client'
import { useEffect } from "react";
import { useCategory } from "@/context/category";

export default function CategoryList() {
  const { categories, fetchCategories, setUpdatingCategory } = useCategory();

  useEffect(() => {
    fetchCategories();
  }, []);

  return <div className="my-5">
    {categories?.map((category) => (
      <button key={category._id} className="btn" onClick={() => setUpdatingCategory(category)}>
        {category.name}
      </button>
    ))}
  </div>;
}
