import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import queryString from "query-string";

export async function GET(req) {
  await dbConnect();
  const searchParams = queryString.parseUrl(req.url).query;
  const { page, category, tag, brand, ratings, minPrice, maxPrice } =
    searchParams || {};
  const pageSize = 6;

  const filter = {};

  if (category) filter.category = category;
  if (tag) filter.tag = tag;
  if (brand) filter.brand = brand;
  if (minPrice && maxPrice) filter.price = { $gte: minPrice, $lte: maxPrice };

  try {
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * pageSize;
    const totalProducts = await Product.countDocuments();
    const allProducts = await Product.find(filter)
      .populate("category", "name slug")
      .populate("tags", "name slug")
      .sort({ createdAt: -1 });

    const calculateAverageRating = (ratings) => {
      if (!Array.isArray(ratings) || ratings.length === 0) return 0;
      const totalRating = ratings.reduce((sum, r) => sum + (r.rating || 0), 0);
      return totalRating / ratings.length;
    };

    const productWithAverageRating = allProducts.map((product) => ({
      ...product.toObject(),
      averageRating: calculateAverageRating(product.ratings),
    }));

    const filteredProducts = productWithAverageRating.filter((product) => {
      if (!ratings) {
        return true;
      }
      // include products with average rating >= selected rating
      return product.averageRating >= Number(ratings);
    });

    const totalFilteredProducts = filteredProducts.length;

    const paginatedProducts = filteredProducts.slice(skip, skip + pageSize);

    return NextResponse.json({
      products: paginatedProducts,
      currentPage,
      totalPages: Math.ceil(totalFilteredProducts / pageSize),
    });
  } catch (err) {
    console.log("filter products error", err);
    return NextResponse.json(
      {
        err: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
