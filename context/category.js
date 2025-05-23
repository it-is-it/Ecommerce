"use client";
import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [updatingCategory, setUpdatingCategory] = useState(null);

  const createCategory = async () => {
    // Prevent empty submissions
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    try {
      const response = await fetch(`${process.env.API}/admin/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Error creating category");
      } else {
        toast.success("Category created");
        setName("");
        setCategories([data, ...categories]);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occured. Try again");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Error fetching categories");
      } else {
        setCategories(data);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occured. Try again");
    }
  };

  const updateCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category/${updatingCategory?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatingCategory),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Error updating category");
      } else {
        toast.success("Category updated");
        setUpdatingCategory(null);
        setCategories(
          categories.map((category) =>
            category._id === updatingCategory._id ? data : category
          )
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occured. Try again");
    }
  };

  const deleteCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category/${updatingCategory?._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Error deleting category");
      } else {
        toast.success("Category deleted");
        setCategories(
          categories.filter((category) => category._id !== updatingCategory._id)
        );
        setUpdatingCategory(null);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occured. Try again");
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        name,
        setName,
        categories,
        setCategories,
        updatingCategory,
        setUpdatingCategory,
        createCategory,
        fetchCategories,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
