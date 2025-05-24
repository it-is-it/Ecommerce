"use client";

import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [updatingTag, setUpdatingTag] = useState(null);

  const createTag = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, parentCategory }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Error creating tag");
        setName("");
        setParentCategory("");
        return;
      }
      // successful create
      toast.success("Tag created successfully");
      setName("");
      setTags([data, ...tags]);
    } catch (error) {
      console.log(error);
      toast.error("Error creating tag");
      setName("");
      setParentCategory("");
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/tag`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Error fetching tags");
      } else {
        setTags(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching tags");
    }
  };

  const updateTag = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/tag/${updatingTag?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatingTag),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Error updating tag");
      } else {
        toast.success("Tag updated successfully");
        setUpdatingTag(null);
        setParentCategory("");
        setTags((prevTags) =>
          prevTags?.map((tag) => (tag._id === data._id ? data : tag))
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating tag");
    }
  };

  const deleteTag = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/tag/${updatingTag?._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Error deleting tag");
      } else {
        toast.success("Tag deleted successfully");
        setUpdatingTag(null);
        setParentCategory("");
        setTags((prevTags) => prevTags?.filter((tag) => tag._id !== data._id));
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting tag");
    }
  };

  return (
    <TagContext.Provider
      value={{
        name,
        setName,
        parentCategory,
        setParentCategory,
        tags,
        setTags,
        updatingTag,
        setUpdatingTag,
        createTag,
        fetchTags,
        updateTag,
        deleteTag,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

export const useTag = () => useContext(TagContext);
