import { useState } from "react";
import { Link } from "react-router-dom";
// import useFetch from "../../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductsLoader from "../loaders/ProductsLoader";
import LazyLoad from "react-lazy-load";

const ProductsFilter = ({ category, setCategory }) => {
  const categories = [
    { value: "smartphones", name: "Smartphones" },
    { value: "laptop", name: "Laptop" },
    { value: "gear", name: "PC Gear" },
    { value: "charge", name: "Charger" },
  ];

  // const [filter, setFilter] = useState(products);

  const handleFilter = (item) => {
    setCategory(item.target.value);
    // let a = item.target.value;
    // setFilter(products.filter((item) => item.category === a));
  };

  // if (filter === []) return setFilter(products);

  return (
    <div>
      <div className="mb-6">
        {/* Container */}
        <div className="max-w-screen-xl mx-auto px-4">
          {/* Layout */}
          <div className="">
            {/* Categories filter */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">CATEGORY</span>
              </label>

              <select
                className="select select-primary w-full max-w-xs"
                value={category}
                onChange={handleFilter}
              >
                <option value="all">ALL</option>
                {categories.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* <ProductsGrid products={filter} /> */}
    </div>
  );
};

const ProductsCard = ({ id, title, price, category, imageUrl }) => {
  return (
    <Link to={`/products/${id}`} className=" overflow-hidden group">
      <LazyLoad height={300} threshold={1}>
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105 "
        />
      </LazyLoad>
      <div className="relative pt-3 bg-white">
        <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4 max-w-xs truncate	">
          {title}
        </h3>
        <div className="mt-1.5 flex items-center justify-between text-gray-900">
          <p className="tracking-wide">${price}</p>
          <p className="text-xs tracking-wide uppercase">{category}</p>
        </div>
      </div>
    </Link>
  );
};

const ProductsGrid = ({ products, isLoading }) => {
  return (
    <div className="">
      {/* Container */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Content */}
          {isLoading ? (
            <ProductsLoader />
          ) : (
            products.map((item) => {
              return (
                <ProductsCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  category={item.category}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const [category, setCategory] = useState("all");

  // fetch products
  // const { data, isLoading } = useFetch(
  //   `/products`,
  //   category !== "all" && { category },
  //   [category]
  // );

  const { data, isLoading } = useQuery({
    queryKey: ["products", { category: category }],
    queryFn: () => {
      return axios.get("/products", {
        params: category !== "all" && { category },
      });
    },
    cacheTime: 10 * 1000, // set giờ xóa bộ nhớ để không bị nặng dữ liệu khi không dùng đến dữ liệu
  });

  // if (isLoading) return <ProductsLoader />;

  return (
    <div className="py-6">
      <ProductsFilter
        // products={data.data.products}
        category={category}
        setCategory={setCategory}
      />
      <ProductsGrid products={data?.data?.products} isLoading={isLoading} />
    </div>
  );
};

export default Products;
