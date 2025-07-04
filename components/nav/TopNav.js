"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useProduct } from "@/context/product";
import { HiSearch, HiShoppingCart } from "react-icons/hi";
import { useCart } from "@/context/cart";

export default function TopNav() {
  const { data, status } = useSession();
  const { cartItems } = useCart();

  const {
    productSearchQuery,
    setProductSearchQuery,
    fetchProductSearchResults,
  } = useProduct();

  return (
    <nav className="nav shadow p-2 justify-content-between mb-3">
      <div className="d-flex">
        <Link href="/" className="nav-link">
          🛒 NEXTECOM
        </Link>
        <Link href="/shop" className="nav-link">
          Shop
        </Link>
      </div>

      <form
        className="d-flex mx-2 mb-0"
        role="search"
        onSubmit={fetchProductSearchResults}
      >
        <input
          type="search"
          className="form-control"
          placeholder="Search products..."
          aria-label="Search"
          onChange={(e) => setProductSearchQuery(e.target.value)}
          value={productSearchQuery}
        />
        <button className="btn rounded-pill" type="submit">
          <HiSearch color="blue" />
        </button>
      </form>

      <div className="d-flex justify-content-end">
        {status === "authenticated" ? (
          <>
            <Link href="/cart" className="nav-link text-danger">
              <HiShoppingCart size={25} />
              <sup>{cartItems.length}</sup>
            </Link>
            <Link
              href={`/dashboard/${
                data?.user?.role === "admin" ? "admin" : "user"
              }`}
              className="nav-link"
            >
              {data?.user?.name}({data?.user?.role})
            </Link>
            <a
              className="nav-link pointer"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Log out
            </a>
          </>
        ) : status === "loading" ? (
          <a className="nav-link text-danger">Loading</a>
        ) : (
          <>
            <Link href="/cart" className="nav-link text-danger">
              <HiShoppingCart size={25} />
              <sup>{cartItems.length}</sup>
            </Link>
            <Link href="/login" className="nav-link">
              Login
            </Link>
            <Link href="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
