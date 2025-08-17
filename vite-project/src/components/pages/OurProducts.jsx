import React from "react";

const products = [
  {
    id: 1,
    title: "Chicken Drumstick - Pack Of 6",
    image: "/legpic.jpg",
  },
  {
    id: 2,
    title: "Chicken Breast - Boneless",
    image: "/boneless.jpg",
  },
  {
    id: 3,
    title: "Chicken Boneless - Cubes",
    image: "/bcc.jpg",
  },
];

const OurProducts = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 bg-red-100  ">
      {/* Section Title */}
      <div className="text-center mb-10 ">
        <h2 className="text-3xl font-bold text-red-600">Our Top Products</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Experience the finest selection of premium chicken cuts, sourced fresh
          daily and prepared with the highest standards of quality and hygiene
          for your culinary excellence.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white pt-4 rounded-lg shadow hover:shadow-lg transition text-center w-72"
          >
            {/* Circular Image */}
            <div className="w-56 h-56 rounded-full overflow-hidden shadow-sm mb-4 mx-auto ">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {product.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProducts;
