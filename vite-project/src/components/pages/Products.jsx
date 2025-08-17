import { useNavigate } from "react-router-dom";

const productList = [
  {
    id: 1,
    title: "Chicken Mince (Keema)",
    description: "For mouth-watering meatballs, kebabs, and more.",
    price: 320,
    image: "/keema.jpg",
  },

  {
    id: 2,
    title: "Chicken Drumsticks - Pack Of 6",
    description: "Juicy bone-in chicken drumsticks, cut from the leg",
    price: 280,
    image: "/legpic.jpg",
  },
  {
    id: 3,
    title: "Chicken Breast - Boneless",
    description: "Enjoy tender pieces of juicy chicken breast.",
    price: 220,
    image: "/boneless.jpg",
  },
  {
    id: 4,
    title: "Special Chicken Curry Cut ",
    description:
      "Tasty chicken pieces, perfect for curries, biryanis, and more.",
    price: 220,
    image: "/chkcursml.jpg",
  },
  {
    id: 5,
    title: "Chicken Boneless - Cubes",
    description: "Crispy and delicious cubes.",
    price: 220,
    image: "/bcc.jpg",
  },
  {
    id: 6,
    title: "Chicken Whole Leg - Pack of 3",
    description: "Juicy and tender chicken whole legs.",
    price: 260,
    image: "/chkwholeleg.jpg",
  },
  {
    id: 7,
    title: "Chicken Lollipop - Pack of 6",
    description: "Delicious and juicy chicken lollipops.",
    price: 280,
    image: "/chklolipop.jpg",
  },

  {
    id: 8,
    title: "Chicken Curry Cut - Small Pieces (Legs, Breast, Wings)",
    description: "Juicy bone-in & boneless chicken for delectable curries.",
    price: 220,
    image: "/chkcursml.jpg",
  },
  {
    id: 9,
    title: "Chicken Liver",
    description:
      "Rich in taste, smooth texture, high in nutrients, perfect for pâtés and spreads.",
    price: 220,
    image: "/chkliv.jpg",
  },
  {
    id: 10,
    title: "Premium Chicken Thigh Boneless",
    description: "Meaty, tender boneless chicken thighs, perfect for grilling.",
    price: 240,
    image: "/premchkthin.jpg",
  },
  {
    id: 11,
    title: "Chicken Curry Cut - Large Pieces",
    description: "Juicy bone-in & boneless chicken for delectable curries.",
    price: 220,
    image: "/chcurlg.jpg",
  },
  {
    id: 12,
    title: "Chicken Biryani Cut ",
    description:
      "Perfectly cut chicken pieces for biryani, flavorful and tender.",
    price: 220,
    image: "/chkbiry.jpg",
  },
];

const Products = () => {
  const navigate = useNavigate();

  const handleBuy = (id) => {
    const item = productList.find((p) => p.id === id);
    const qty = 1;
    navigate("/buy", {
      state: { item, quantity: qty },
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-red-100">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-red-600 mb-2 tracking-tight">
          Fresh Chicken Cuts
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Premium quality chicken delivered to your doorstep. Hygienic, juicy,
          and always fresh.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productList.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover rounded-t-2xl"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1 mb-3">
                {item.description}
              </p>

              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-bold text-green-700">
                  ₹{item.price}
                </span>

                <button
                  onClick={() => handleBuy(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg font-medium transition-all duration-200"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
