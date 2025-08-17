import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login", { state: { message: "Please login first" } });
      return;
    }

    fetch(`http://localhost:5000/api/orders/${user.phone_number}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-red-100">
      {/* Header Section */}
      <div className="bg-red-200 shadow-xl">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 text-black">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2 lg:p-3">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">
                Your Orders
              </h1>
              <p className="text-black mt-0.5 sm:mt-1 text-xs sm:text-sm lg:text-base xl:text-lg">
                Fresh chicken delivered to your doorstep
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-2 sm:p-3 lg:p-6">
        <div className="bg-white/70 backdrop-blur-lg shadow-2xl rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/30 overflow-hidden">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-b border-orange-200/50 px-3 sm:px-4 lg:px-8 py-3 sm:py-4 lg:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full p-1.5 sm:p-2 text-sm sm:text-base">
                  📦
                </div>
                <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-black">
                  Order History
                </h2>
              </div>
              {orders.length > 0 && (
                <div className="bg-gradient-to-r from-orange-100 to-red-100 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full self-start sm:self-auto">
                  <span className="text-xs sm:text-sm font-semibold text-orange-800">
                    {orders.length} Total Orders
                  </span>
                </div>
              )}
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-8 sm:py-12 lg:py-16 px-3 sm:px-4 lg:px-8">
              <div className="bg-gradient-to-r from-orange-100 to-red-100 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6">
                <svg
                  className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-2 sm:mb-3">
                No Orders Found
              </h3>
              <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-md mx-auto mb-4 sm:mb-6 lg:mb-8 px-2">
                You haven't placed any orders yet. Start exploring our fresh
                chicken selection!
              </p>
              <button className="bg-red-200 text-black px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
                Order Now
              </button>
            </div>
          ) : (
            <>
              {/* Mobile Card View (hidden on desktop) */}
              <div className="block lg:hidden">
                <div className="divide-y divide-orange-100">
                  {orders.map((order, index) => (
                    <div
                      key={order.id}
                      className="p-3 sm:p-4 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-red-50/50 transition-all duration-300"
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${
                          index * 0.1
                        }s both`,
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="bg-gradient-to-r from-orange-400 to-red-400 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg flex-shrink-0">
                          {order.username
                            ? order.username.charAt(0).toUpperCase()
                            : "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 min-w-0 mr-2">
                              <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                {order.username}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600 truncate">
                                {order.product_name}
                              </p>
                            </div>
                            <div className="text-base sm:text-lg font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg whitespace-nowrap">
                              ₹{order.total_amount}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs">
                            <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-full">
                              <svg
                                className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20,8H4V6C4,4.89 4.89,4 6,4H18A2,2 0 0,1 20,6V8M20,8V19A2,2 0 0,1 18,19H6C4.89,19 4,18.1 4,17V8H20M16,11V13H8V11H16Z" />
                              </svg>
                              <span className="text-blue-700 font-medium">
                                {order.payment_method}
                              </span>
                            </div>
                            <div className="bg-gray-100 px-2 py-1 rounded-full">
                              <span className="text-gray-700 font-medium">
                                {new Date(order.ordered_at).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                            <div className="bg-gray-100 px-2 py-1 rounded-full">
                              <span className="text-gray-600">
                                {new Date(order.ordered_at).toLocaleTimeString(
                                  "en-IN",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Table View (hidden on mobile) */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-orange-200">
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4 text-orange-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                          <span>Customer</span>
                        </div>
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4 text-orange-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <span>Product</span>
                        </div>
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">₹</span>
                          <span>Amount</span>
                        </div>
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4 text-orange-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M2,17H22V19H2V17M1.15,12.65L4,9.8L5.4,11.2L4.6,12H7.1L12,7.1L17.9,13H20.4L19.6,11.2L21,9.8L23.85,12.65C24.05,12.85 24.05,13.16 23.85,13.36L21,16.2L19.6,14.8L20.4,14H17.9L12,8.1L6.1,14H3.6L4.4,14.8L3,16.2L0.15,13.36C-0.05,13.15 -0.05,12.85 0.15,12.65L1.15,12.65Z" />
                          </svg>
                          <span>Payment</span>
                        </div>
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4 text-orange-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                          </svg>
                          <span>Order Time</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100">
                    {orders.map((order, index) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-red-50/50 transition-all duration-300 group"
                        style={{
                          animation: `fadeInUp 0.5s ease-out ${
                            index * 0.1
                          }s both`,
                        }}
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-4">
                            <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                              {order.username
                                ? order.username.charAt(0).toUpperCase()
                                : "U"}
                            </div>
                            <div className="font-semibold text-gray-900 text-lg">
                              {order.username}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="font-medium text-gray-900 text-base">
                            {order.product_name}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-xl font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg inline-block">
                            ₹{order.total_amount}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-2">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <svg
                                className="w-4 h-4 text-black"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20,8H4V6C4,4.89 4.89,4 6,4H18A2,2 0 0,1 20,6V8M20,8V19A2,2 0 0,1 18,19H6C4.89,19 4,18.1 4,17V8H20M16,11V13H8V11H16Z" />
                              </svg>
                            </div>
                            <span className="font-medium text-black">
                              {order.payment_method}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="bg-gray-50 px-3 py-2 rounded-lg">
                            <div className="text-sm font-medium text-gray-900">
                              {new Date(order.ordered_at).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(order.ordered_at).toLocaleTimeString(
                                "en-IN",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Call to Action Footer */}
              <div className="bg-red-200 px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
                <div className="text-center text-black">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">
                    Craving more fresh chicken?
                  </h3>
                  <p className="mb-3 sm:mb-4 lg:mb-6 text-black text-sm sm:text-base lg:text-lg px-2">
                    Order again and enjoy our premium quality meat delivered
                    fresh!
                  </p>
                  <button
                    className="bg-red-100 text-black px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                    onClick={() => navigate("/")}
                  >
                    Order Again
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
