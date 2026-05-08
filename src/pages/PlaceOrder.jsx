import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets"; // ✅ make sure this exists

const PlaceOrder = () => {
  const { currency, delivery_fee, cartItems, products } =
    useContext(ShopContext);

  const navigate = useNavigate();

  const [method, setMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // ✅ Handle input
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // ✅ Calculate subtotal (NO context dependency)
  const getSubtotal = () => {
    let total = 0;

    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          const product = products.find((p) => p._id === item);
          if (product) {
            total += product.price * cartItems[item][size];
          }
        }
      }
    }

    return total;
  };

  // ✅ Submit
  const onSubmitHandler = (e) => {
    e.preventDefault();

    // basic validation
    for (let key in formData) {
      if (formData[key] === "") {
        alert("Please fill all fields");
        return;
      }
    }

    // demo payment logic
    console.log("Payment Method:", method);

    // redirect
    navigate("/orders");
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col lg:flex-row justify-between gap-10 pt-10 border-t"
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 w-full lg:w-[55%]">

        <div className="text-xl mb-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input required name="firstName" onChange={onChangeHandler} placeholder="First name" className="border px-3 py-2 w-full" />
          <input required name="lastName" onChange={onChangeHandler} placeholder="Last name" className="border px-3 py-2 w-full" />
        </div>

        <input required name="email" onChange={onChangeHandler} placeholder="Email address" className="border px-3 py-2" />

        <input required name="street" onChange={onChangeHandler} placeholder="Street" className="border px-3 py-2" />

        <div className="flex gap-3">
          <input required name="city" onChange={onChangeHandler} placeholder="City" className="border px-3 py-2 w-full" />
          <input required name="state" onChange={onChangeHandler} placeholder="State" className="border px-3 py-2 w-full" />
        </div>

        <div className="flex gap-3">
          <input required name="zipcode" onChange={onChangeHandler} placeholder="Zipcode" className="border px-3 py-2 w-full" />
          <input required name="country" onChange={onChangeHandler} placeholder="Country" className="border px-3 py-2 w-full" />
        </div>

        <input required name="phone" onChange={onChangeHandler} placeholder="Phone" className="border px-3 py-2" />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:max-w-[450px] lg:w-[40%]">

        {/* TOTAL */}
        <div className="mb-8">
          <div className="text-xl mb-3">
            <Title text1={"CART"} text2={"TOTALS"} />
          </div>

          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{currency}{getSubtotal()}</p>
          </div>

          <div className="flex justify-between mt-2">
            <p>Shipping Fee</p>
            <p>{currency}{delivery_fee}</p>
          </div>

          <div className="flex justify-between mt-2 font-bold">
            <p>Total</p>
            <p>{currency}{getSubtotal() + delivery_fee}</p>
          </div>
        </div>

        {/* PAYMENT */}
        <div>
          <div className="text-lg mb-3">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>

          <div className="flex gap-3">

            {/* STRIPE */}
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-2 border px-4 py-2 cursor-pointer ${method === "stripe" ? "bg-gray-200" : ""}`}
            >
              <img src={assets?.stripe_logo} className="h-5" alt="" />
              <p>Stripe</p>
            </div>

            {/* RAZORPAY */}
            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center gap-2 border px-4 py-2 cursor-pointer ${method === "razorpay" ? "bg-gray-200" : ""}`}
            >
              <img src={assets?.razorpay_logo} className="h-5" alt="" />
              <p>Razorpay</p>
            </div>

            {/* COD */}
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-2 border px-4 py-2 cursor-pointer ${method === "cod" ? "bg-gray-200" : ""}`}
            >
              <p>COD</p>
            </div>

          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-8">
          <button type="submit" className="w-full bg-black text-white py-3">
            PLACE ORDER
          </button>
        </div>

      </div>
    </form>
  );
};

export default PlaceOrder;