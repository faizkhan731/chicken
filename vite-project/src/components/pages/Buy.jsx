import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Clock,
  Truck,
  BadgeCheck,
  CheckCircle,
  Package,
  MapPin,
  Phone,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../auth/AuthContext";

const Buy = () => {
  const { user } = useAuth();
  const { state } = useLocation();
  const item = state?.item;
  const [quantity, setQuantity] = useState(state?.quantity || 1);
  const [countdown, setCountdown] = useState(0);
  const [orderStatus, setOrderStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Area selection state
  const [selectedArea, setSelectedArea] = useState("");

  const navigate = useNavigate();

  // Manual area selection
  const DELIVERY_AREAS = [
    "Nadi",
    "Nidhaura",
    "Nadi East",
    "Nadi Purwa",
    "Nadi South",
    "Nidhaura South",
    "Nadi West",
  ];

  // Helper to format countdown seconds into mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const increment = () => setQuantity((q) => +(q + 0.5).toFixed(2));
  const decrement = () =>
    setQuantity((q) => Math.max(0.5, +(q - 0.5).toFixed(2)));

  const totalPrice = item ? item.price * quantity : 0;

  // Existing order status fetch logic
  useEffect(() => {
    if (!user) {
      setLoadingStatus(false);
      return;
    }

    axios
      .get("https://chicken-1-hee6.onrender.com/api/order/status", {
        withCredentials: true,
      })
      .then((res) => {
        const order = res.data.order;
        if (order && order.status === "processing") {
          const orderTime = new Date(order.orderTime).getTime();
          const now = Date.now();
          const diffSeconds = Math.floor(
            (1 * 60 * 1000 - (now - orderTime)) / 1000,
          );
          if (diffSeconds > 0) {
            setCountdown(diffSeconds);
            setOrderStatus("processing");
          } else {
            setOrderStatus("delivered");
          }
        } else if (order && order.status === "delivered") {
          setOrderStatus("delivered");
        } else {
          setOrderStatus(null);
        }
        setLoadingStatus(false);
      })
      .catch(() => {
        setOrderStatus(null);
        setLoadingStatus(false);
      });
  }, [user]);

  // Countdown timer for order processing
  useEffect(() => {
    if (orderStatus !== "processing" || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setOrderStatus("delivered");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orderStatus, countdown]);

  const handleConfirm = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Check if area is selected
    if (!selectedArea) {
      alert("Please select your delivery area from the dropdown.");
      return;
    }

    if (selectedArea === "other") {
      alert(
        "Sorry! We currently deliver only to the listed areas. Please call us for special delivery arrangements.",
      );
      return;
    }

    const orderData = {
      username: user.username,
      phone_number: user.phone_number,
      productName: item.title,
      quantity,
      price: item.price,
      totalAmount: quantity * item.price,
      payment_method: "Cash on Delivery",
      deliveryLocation: selectedArea,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/order",
        orderData,
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        setOrderDetails({
          orderId: res.data.orderId,
          ...orderData,
          orderTime: new Date(),
        });
        setShowConfirmation(true);
        setOrderStatus("processing");
        setCountdown(1 * 60);
      } else {
        alert("Failed to place order");
      }
    } catch {
      alert("Failed to place order");
    }
  };

  const handleBackToShopping = () => {
    navigate("/");
  };

  if (!item) {
    return (
      <p className="text-center text-red-600 mt-10 text-xl font-medium">
        No item selected.
      </p>
    );
  }

  if (loadingStatus) {
    return <p className="text-center mt-10">Loading order status...</p>;
  }

  // Show confirmation page after order is placed - FIXED RESPONSIVE VERSION
  if (showConfirmation && orderDetails) {
    return (
      <div className="min-h-screen bg-red-100 px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10 font-sans">
        <div className="max-w-5xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="bg-green-100 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounce">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4">
              Thank you for your purchase. Your order has been successfully
              placed.
            </p>
          </div>

          {/* Order Summary Card */}
          <div className="bg-red-100 shadow-xl lg:shadow-2xl rounded-xl lg:rounded-2xl overflow-hidden border border-gray-100 mb-6 sm:mb-8">
            <div className="bg-white text-black p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Order Summary
                  </h2>
                  <p className="opacity-90 text-sm sm:text-base">
                    Order ID: {orderDetails.orderId}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs sm:text-sm opacity-90">Order Date</p>
                  <p className="font-semibold text-sm sm:text-base">
                    {orderDetails.orderTime.toLocaleDateString()}
                  </p>
                  <p className="text-xs sm:text-sm">
                    {orderDetails.orderTime.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Product Details */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Package className="mr-2 text-blue-600" size={18} />
                    Product Details
                  </h3>
                  <div className="bg-white rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full sm:w-20 h-32 sm:h-20 object-cover rounded-lg border"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-base sm:text-lg text-gray-800 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-xs sm:text-sm mb-3">
                          {item.description}
                        </p>
                        <div className="space-y-1 text-xs sm:text-sm">
                          <p>
                            <span className="font-medium">Quantity:</span>{" "}
                            {quantity} kg
                          </p>
                          <p>
                            <span className="font-medium">Unit Price:</span> ₹
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Details */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <MapPin className="mr-2 text-blue-600" size={18} />
                    Customer Details
                  </h3>
                  <div className="bg-white rounded-xl p-4 sm:p-6 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                      <span className="font-medium text-gray-700 sm:w-20 text-sm">
                        Name:
                      </span>
                      <span className="text-gray-800 text-sm">
                        {orderDetails.username}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                      <div className="flex items-center sm:w-20">
                        {/* <Phone className="mr-2 text-gray-600" size={14} /> */}
                        <span className="font-medium text-gray-700 text-sm">
                          Phone:
                        </span>
                      </div>
                      <span className="text-gray-800 text-sm ml-6 sm:ml-0">
                        {orderDetails.phone_number}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                      <span className="font-medium text-gray-700 sm:w-20 text-sm">
                        Payment:
                      </span>
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium w-fit">
                        {orderDetails.payment_method}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                      <span className="font-medium text-gray-700 sm:w-20 text-sm">
                        Area:
                      </span>
                      <span className="text-gray-800 text-sm">
                        {orderDetails.deliveryLocation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="mt-6 lg:mt-8 bg-white rounded-xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                  Price Breakdown
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>
                      Subtotal ({quantity} kg × ₹{item.price})
                    </span>
                    <span>₹{(quantity * item.price).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Delivery Fee</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg sm:text-xl font-bold text-green-600">
                      <span>Total Amount</span>
                      <span>₹{orderDetails.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Status */}
          {orderStatus === "processing" && (
            <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-red-200">
              <h3 className="text-lg sm:text-xl font-semibold text-black mb-4 flex items-center">
                <Clock className="mr-2" size={18} />
                Delivery Status
              </h3>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
                  <span className="text-black font-medium text-sm sm:text-base">
                    Estimated Delivery Time
                  </span>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-black">
                    {formatTime(countdown)}
                  </span>
                </div>
                <p className="text-grey-600 text-xs sm:text-sm mb-3">
                  Your fresh chicken is being prepared for delivery
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs bg-yellow-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <Truck size={12} /> Fast Delivery
                  </span>
                  <span className="text-xs bg-yellow-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <BadgeCheck size={12} /> Quality Assured
                  </span>
                </div>
              </div>
            </div>
          )}

          {orderStatus === "delivered" && (
            <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-green-200">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <CheckCircle
                  className="text-green-600 mx-auto mb-2"
                  size={28}
                />
                <h3 className="text-lg sm:text-xl font-semibold text-green-700 mb-1">
                  Order Delivered!
                </h3>
                <p className="text-green-600 text-sm sm:text-base">
                  Your fresh chicken has been successfully delivered. Enjoy your
                  meal!
                </p>
              </div>
            </div>
          )}

          {/* Action Button and Contact */}
          <div className="text-center space-y-4">
            <button
              onClick={handleBackToShopping}
              className="bg-red-200 hover:bg-white text-black font-semibold px-6 sm:px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              Continue Shopping
            </button>
            <p className="text-gray-500 text-xs sm:text-sm px-4">
              Need help? Contact us at kfaiz3361@gmail.com or call
              +91-9125529669
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Original checkout page with area dropdown only
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-gray-100 px-4 py-10 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-xl p-8 border">
        <h2 className="text-4xl font-bold text-red-600 text-center mb-8">
          <ShoppingCart className="inline-block mb-1 mr-2" size={30} />
          Checkout Summary
        </h2>

        {/* Area Selection Section */}
        <div className="mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
              <MapPin className="mr-2" size={20} />
              Select Your Delivery Area
            </h3>

            <p className="text-blue-700 text-sm mb-4">
              Please select your area to confirm delivery availability:
            </p>

            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose your area...</option>
              {DELIVERY_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
              <option value="other">My area is not listed</option>
            </select>

            {selectedArea && selectedArea !== "other" && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium flex items-center">
                  <CheckCircle className="mr-2" size={16} />✅ We deliver to{" "}
                  {selectedArea}!
                </p>
              </div>
            )}

            {selectedArea === "other" && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">
                  ❌ Sorry! We currently deliver only to the listed areas.
                </p>
                <p className="text-red-600 text-sm mt-1">
                  📞 Call us to check if we can make a special delivery:
                  +91-9125529669
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={item.image}
            alt={item.title}
            className="w-full md:w-1/2 h-64 object-cover rounded-xl border"
          />

          <div className="flex-1 space-y-4 text-gray-700">
            <h3 className="text-2xl font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>

            <div className="flex gap-3 items-center">
              <span className="text-sm text-gray-600 font-medium">
                Quantity:
              </span>
              <button
                onClick={decrement}
                className="bg-gray-200 px-3 py-1 rounded text-xl"
                disabled={orderStatus === "processing"}
              >
                −
              </button>
              <span className="text-lg font-semibold">{quantity} kg</span>
              <button
                onClick={increment}
                className="bg-gray-200 px-3 py-1 rounded text-xl"
                disabled={orderStatus === "processing"}
              >
                +
              </button>
            </div>

            <div className="space-y-1 text-[17px]">
              <p>
                <span className="font-semibold">Unit Price:</span> ₹{item.price}
              </p>
              <p>
                <span className="font-semibold">Total Quantity:</span>{" "}
                {quantity} kg
              </p>
              <p>
                <span className="font-semibold">Delivery Fee:</span>{" "}
                <span className="text-green-600 font-semibold">₹0 (Free)</span>
              </p>
              <p className="text-lg font-bold text-red-600 pt-1">
                Total Amount: ₹{totalPrice.toFixed(2)}
              </p>
            </div>

            <div className="pt-4">
              <p className="font-semibold mb-1">Payment Method</p>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  checked
                  readOnly
                  className="accent-red-500"
                />
                <label className="font-medium">
                  Cash on Delivery (Auto-selected)
                </label>
              </div>
            </div>

            {orderStatus !== "processing" && (
              <button
                onClick={handleConfirm}
                disabled={!selectedArea || selectedArea === "other"}
                className={`mt-6 w-full font-semibold py-3 rounded-xl transition-all duration-300 ${
                  !selectedArea || selectedArea === "other"
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white transform hover:scale-105"
                }`}
              >
                Confirm Purchase
              </button>
            )}
          </div>
        </div>

        {orderStatus === "processing" && (
          <div className="mt-10 bg-green-50 p-5 rounded-xl border border-green-200 text-center shadow-sm">
            <h4 className="text-xl font-semibold text-green-800 flex justify-center items-center gap-2">
              <Clock size={20} /> Estimated Delivery Time
            </h4>
            <p className="text-3xl font-mono text-green-700 mt-2">
              {formatTime(countdown)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Your order is being processed. Countdown from 30 minute.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <span className="text-sm bg-green-100 px-3 py-1 rounded-full flex items-center gap-1">
                <Truck size={14} /> Fast Delivery
              </span>
              <span className="text-sm bg-green-100 px-3 py-1 rounded-full flex items-center gap-1">
                <BadgeCheck size={14} /> Secure Order
              </span>
            </div>
          </div>
        )}

        {orderStatus === "delivered" && (
          <div className="mt-10 bg-blue-50 p-5 rounded-xl border border-blue-200 text-center shadow-sm text-blue-700 font-semibold">
            🎉 Your order has been delivered! You can place a new order now.
          </div>
        )}
      </div>
    </div>
  );
};

export default Buy;
