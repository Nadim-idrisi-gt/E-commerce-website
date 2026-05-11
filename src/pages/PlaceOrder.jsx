import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const PlaceOrder = () => {

  const {
    currency,
    delivery_fee,
    cartItems,
    products,
    setPaymentMethod,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const [method, setMethod] = useState("COD");

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

  // Handle Input
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  // Cart Subtotal
  const getSubtotal = () => {

    let total = 0;

    for (const item in cartItems) {

      for (const size in cartItems[item]) {

        if (cartItems[item][size] > 0) {

          const productData = products.find(
            (product) => product._id === item
          );

          if (productData) {
            total +=
              productData.price * cartItems[item][size];
          }
        }
      }
    }

    return total;
  };

  // Submit
  const onSubmitHandler = (e) => {

    e.preventDefault();

    // Validation
    for (let key in formData) {

      if (formData[key] === "") {
        alert("Please fill all fields");
        return;
      }
    }

    // Dynamic Payment Method Save
    setPaymentMethod(method);

    console.log("Selected Payment:", method);

    // Redirect
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

          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            placeholder="First Name"
            className="border border-gray-300 rounded px-3 py-2 w-full outline-none"
          />

          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            placeholder="Last Name"
            className="border border-gray-300 rounded px-3 py-2 w-full outline-none"
          />

        </div>

        <input
          required
          name="email"
          onChange={onChangeHandler}
          placeholder="Email Address"
          className="border border-gray-300 rounded px-3 py-2 outline-none"
        />

        <input
          required
          name="street"
          onChange={onChangeHandler}
          placeholder="Street"
          className="border border-gray-300 rounded px-3 py-2 outline-none"
        />

        <div className="flex gap-3">

          <input
            required
            name="city"
            onChange={onChangeHandler}
            placeholder="City"
            className="border border-gray-300 rounded px-3 py-2 w-full outline-none"
          />

          <input
            required
            name="state"
            onChange={onChangeHandler}
            placeholder="State"
            className="border border-gray-300 rounded px-3 py-2 w-full outline-none"
          />

        </div>

        <div className="flex gap-3">

          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            placeholder="Zipcode"
            className="border border-gray-300 rounded px-3 py-2 w-full outline-none"
          />

          <input
            required
            name="country"
            onChange={onChangeHandler}
            placeholder="Country"
            className="border border-gray-300 rounded px-3 py-2 w-full outline-none"
          />

        </div>

        <input
          required
          name="phone"
          onChange={onChangeHandler}
          placeholder="Phone"
          className="border border-gray-300 rounded px-3 py-2 outline-none"
        />

      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:max-w-[450px] lg:w-[40%]">

        {/* CART TOTAL */}
        <div className="mb-8">

          <div className="text-xl mb-3">
            <Title text1={"CART"} text2={"TOTALS"} />
          </div>

          <div className="flex justify-between border-b pb-2">
            <p>Subtotal</p>
            <p>
              {currency}
              {getSubtotal()}
            </p>
          </div>

          <div className="flex justify-between border-b py-2">
            <p>Shipping Fee</p>
            <p>
              {currency}
              {delivery_fee}
            </p>
          </div>

          <div className="flex justify-between pt-2 font-bold text-lg">
            <p>Total</p>
            <p>
              {currency}
              {getSubtotal() + delivery_fee}
            </p>
          </div>

        </div>

        {/* PAYMENT METHOD */}
        <div>

          <div className="text-lg mb-3">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>

          <div className="flex flex-col gap-3">

            {/* Stripe */}
            <div
              onClick={() => setMethod("Stripe")}
              className={`flex items-center gap-3 border px-4 py-3 cursor-pointer rounded 
              ${method === "Stripe"
                  ? "bg-gray-200 border-black"
                  : ""
                }`}
            >

              <img
                src={assets?.stripe_logo}
                className="h-5"
                alt=""
              />

              <p>Stripe</p>

            </div>

            {/* Razorpay */}
            <div
              onClick={() => setMethod("Razorpay")}
              className={`flex items-center gap-3 border px-4 py-3 cursor-pointer rounded 
              ${method === "Razorpay"
                  ? "bg-gray-200 border-black"
                  : ""
                }`}
            >

              <img
                src={assets?.razorpay_logo}
                className="h-5"
                alt=""
              />

              <p>Razorpay</p>

            </div>

            {/* COD */}
            <div
              onClick={() => setMethod("COD")}
              className={`flex items-center gap-3 border px-4 py-3 cursor-pointer rounded 
              ${method === "COD"
                  ? "bg-gray-200 border-black"
                  : ""
                }`}
            >

              <p>Cash On Delivery</p>

            </div>

          </div>

        </div>

        {/* BUTTON */}
        <div className="mt-8">

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            PLACE ORDER
          </button>

        </div>

      </div>

    </form>
  );
};

export default PlaceOrder;