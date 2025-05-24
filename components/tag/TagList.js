"use client";
import { useEffect } from "react";
import { useTag } from "@/context/tag";
export default function TagsList() {
  // context
  const { tags, fetchTags, setUpdatingTag } = useTag();

  useEffect(() => {
    fetchTags();
  }, []);
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col">
          {tags.map((tag) => (
            <button
              key={tag._id}
              className="btn"
              onClick={() => {
                setUpdatingTag(tag);
              }}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
