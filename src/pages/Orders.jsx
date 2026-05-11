import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { products, cartItems, currency, paymentMethod } =
    useContext(ShopContext);

  return (
    <div className="border-t pt-16 px-4 sm:px-10 min-h-[60vh]">
      {/* Heading */}
      <div className="text-2xl mb-8">
        <h1 className="font-medium">
          MY <span className="text-gray-500">ORDERS</span>
        </h1>
      </div>

      {/* Orders */}
      <div>
        {products.map((item) => {
          if (cartItems[item._id]) {
            return Object.entries(cartItems[item._id]).map(
              ([size, quantity]) => {
                if (quantity > 0) {
                  return (
                    <div
                      key={item._id + size}
                      className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                      {/* Left */}
                      <div className="flex items-start gap-6 text-sm">
                        <img
                          className="w-16 sm:w-20"
                          src={item.image[0]}
                          alt=""
                        />

                        <div>
                          <p className="sm:text-base font-medium">
                            {item.name}
                          </p>

                          <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                            <p className="text-lg">
                              {currency}
                              {item.price}
                            </p>

                            <p className="text-lg">Quantity: {quantity}</p>

                            <p className="text-lg">Size: {size}</p>
                          </div>

                          <p className="mt-2">
                            Date:{" "}
                            <span className="text-gray-400">
                              {new Date().toDateString()}
                            </span>
                          </p>

                          <p className="mt-2">
                            Payment:{" "}
                            <span className="text-gray-400">
                              {paymentMethod}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Right */}
                      <div className="md:w-1/2 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <p className="min-w-2 h-2 rounded-full bg-green-500"></p>

                          <p className="text-sm md:text-base">Ready to ship</p>
                        </div>

                        <button className="border px-4 py-2 text-sm font-medium rounded hover:bg-black hover:text-white transition">
                          Track Order
                        </button>
                      </div>
                    </div>
                  );
                }

                return null;
              },
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default Orders;
