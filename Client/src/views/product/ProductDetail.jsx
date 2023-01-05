import { useState } from "react";
import { useParams } from "react-router-dom";
import { TbShoppingCartPlus } from "react-icons/tb";
// import useFetch from "../../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import GlobalSpinner from "../../components/common/GlobalSpinner";
import { getProductsById } from "../../services/productService";

const ProductItem = ({ imgUrl, title, id, price, description, category }) => {
  const [count, setCount] = useState(0);

  const handleDecrease = () => {
    setCount(count - 1);
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleSubmit = () => {
    count <= 0
      ? alert("Please chose the right quantity")
      : alert(`Add ${count} ${title} to cart`);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-8 py-6">
      {/* Image */}
      <img
        src={imgUrl}
        alt={id}
        className="rounded mb-4 h-80 mx-auto sm:h-[25rem] lg:h-[30rem] aspect-square"
      />
      {/* Content */}
      <div className="flex flex-col leading-10">
        {/* Description */}
        <div className=" mb-4">
          <strong className="capitalize border border-sky-400 rounded-3xl px-4 py-2">
            {category}
          </strong>
        </div>
        <div className="items-center mb-8">
          <div className="flex justify-between items-center gap-10 my-4 max-w-screen-xl">
            <h2 className="mb-4 uppercase text-xl sm:text-3xl text-yellow-400 font-bold">
              {title}
            </h2>

            <p className="mb-4 italic text-sm sm:text-base  text-amber-300 font-bold">
              Price: ${price}
            </p>
          </div>

          <p className="mb-4 italic text-lg sm:text-xl text-center md:tet-left  text-rose-400 font-bold">
            {description}
          </p>
          <p className="text-justify mb-4 text-sm sm:text-base px-4 text-ellipsis">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
            laborum molestias, dolor voluptates hic doloribus quo possimus.
            <br />
            <br />
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut impedit
            sunt, illum veniam ipsam nostrum, voluptatibus suscipit ipsum harum
            quo omnis dicta quidem, distinctio repellendus dolorum optio quam
            explicabo! Obcaecati.{" "}
          </p>
        </div>
        {/* Add to cart */}
        <div className="flex justify-between ">
          <div className="flex gap-2">
            <button
              className="btn btn-success rounded-full aspect-square hover:shadow-lg	hover:shadow-teal-300"
              onClick={handleDecrease}
              disabled={count <= 0}
            >
              -
            </button>
            <span className="border-none rounded-lg py-1 px-3 bg-slate-400 text-teal-300">
              {count}
            </span>
            <button
              className="btn btn-success rounded-full aspect-square hover:shadow-lg	hover:shadow-teal-300"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>

          <button
            className="btn btn-success shadow-lg	shadow-teal-600 tracking-widest"
            onClick={handleSubmit}
          >
            <TbShoppingCartPlus /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const useProductDetail = (productId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductsById(productId),
  });
  return { data, isLoading };
};

const ProductDetail = () => {
  const { productId } = useParams();

  const {data, isLoading} = useProductDetail(productId)

  // const {data, isLoading} = useFetch(`/products/${productId}`);

  if (isLoading) return <GlobalSpinner />;

  const { data: product } = data; // = const product = data.data

  return (
    <div>
      {/* Container */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Layout */}
        <ProductItem
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
          imgUrl={product.imageUrl}
          category={product.category}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
