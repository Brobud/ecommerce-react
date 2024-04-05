import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from '../cart/cartSlice';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleClickBuy = (product) => {
    dispatch(addItemToCart(product))
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const getSortedProducts = () => {
    switch (sortOption) {
      case "A-Z":
        return [...products].sort((a, b) => a.title.localeCompare(b.title));
      case "Z-A":
        return [...products].sort((a, b) => b.title.localeCompare(a.title));
      case "LowestPrice":
        return [...products].sort((a, b) => a.price - b.price);
      case "HighestPrice":
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };
  

  return (
    <>
    <section>

    <div className="">
          <h3 className="font-bold">Filters</h3>
          <div className="mb-4 p-4">
            <label htmlFor="sortDropdown" className="mr-2">
              Sort By:
            </label>
            <select
              id="sortDropdown"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="p-2 border rounded"
            >
              <option value="">-- Select --</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="LowestPrice">Lowest Price</option>
              <option value="HighestPrice">Highest Price</option>
            </select>
          </div>
        </div>
      </section>
       
    <section>
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            {getSortedProducts().map((product) => {
        return (
          <div
          key={product.id}
          className="group bg-white rounded-xl border shadow p-4 w-full "
          >
            <div className="relative w-[80%] h-[350px] mx-auto overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500 ease-in-out"
                />
            </div>
            <div className="flex flex-col gap-6 mt-8">
              <button
                type="button"
                className="bg-blue-700 hover:bg-blue-800 text-white text-sm rounded-lg py-3 px-8"
                onClick={() => handleClickBuy(product)}
                >
                BUY NOW
              </button>
              <h3 className="font-bold">{product.title}</h3>
              <h3>{product.price}</h3>
            </div>
          </div>
        );
      })}
    </div>
    </section>
    </>
  );
};

export default ProductList;
