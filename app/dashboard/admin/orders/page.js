"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Pagination from "@/components/product/Pagination";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const fetchOrders = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.API}/admin/orders?page=${page}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.error("Fetch orders error:", data);
        toast.error(data?.error || data?.message || "Failed to fetch orders");
        return;
      }
      setOrders(data.orders);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.API}/admin/orders/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ delivery_status: newStatus }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error("Failed to update order");
      } else {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, delivery_status: newStatus }
              : order
          )
        );
        toast.success(data?.message || "Order status updated successfully");
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Order status update failed");
    } finally {
      fetchOrders();
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center text-danger vh-100 h1">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col">
          <h4 className="text-center">Recent Orders</h4>
          {orders?.map((order) => (
            <div key={order?._id} className="mb-4 p-4 alert alert-secondary">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th scope="row">Customer Name:</th>
                    <td>{order?.userId?.name}</td>
                  </tr>
                  <tr>
                    <th scope="row">Created:</th>
                    <td>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : new Date(
                            parseInt(order._id.toString().slice(0, 8), 16) *
                              1000
                          ).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Payment Intent:</th>
                    <td>{order?.payment_intent}</td>
                  </tr>

                  <tr>
                    <th scope="row">Receipt:</th>
                    <td>
                      <a href={order?.receipt_url} target="_blank">
                        View
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">Refunded:</th>
                    <td>{order?.refunded ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <th scope="row">Status:</th>
                    <td>{order?.status}</td>
                  </tr>
                  <tr>
                    <th scope="row">Total Charged:</th>
                    <td>
                      ${(order?.amount_captured / 100)?.toFixed(2)}{" "}
                      {order?.currency}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">Shipping Address:</th>
                    <td>
                      {order?.shipping?.address?.line1}
                      <br />
                      {order?.shipping?.address?.line2 &&
                        `${order?.shipping?.address?.line2}, `}
                      {order?.shipping?.address?.city},{" "}
                      {order?.shipping?.address?.state},{" "}
                      {order?.shipping?.address?.postal_code}
                      <br />
                      {order?.shipping?.address?.country}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row" className="w-25">
                      Ordered Products:
                    </th>
                    <td className="w-75">
                      {order?.cartItems?.map((product) => (
                        <div
                          className="pointer text-primary"
                          key={product._id}
                          onClick={() =>
                            router.push(`/product/${product?.slug}`)
                          }
                        >
                          {product?.quantity} x {product?.title} $
                          {product?.price?.toFixed(2)} {order?.currency}
                        </div>
                      ))}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">Delivery Status:</th>
                    <td>
                      <select
                        className="form-control"
                        value={order?.delivery_status}
                        onChange={(e) =>
                          handleStatusChange(order?._id, e.target.value)
                        }
                        disabled={order?.refunded}
                      >
                        <option value="Not Processed">Not Processed</option>
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        {order?.refunded && (
                          <option value="Cancelled">Cancelled</option>
                        )}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pathname={pathname}
      />
    </div>
  );
}
