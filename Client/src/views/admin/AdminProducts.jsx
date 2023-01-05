import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import GlobalSpinner from "../../components/common/GlobalSpinner";
import { EditIcon, DeleteIcon } from "../../components/common/Icons/Index";
import Loader from "../../components/common/Loader";
import useSearchProducts from "../../hooks/products/useSearchProducts";
import { deleteProductById } from "../../services/productService";
// import useFetch from "../../hooks/useFetch";

// Modal
const DeleteProductModal = ({ id }) => {
  const queryClient = useQueryClient();
  const ref = useRef(); // ref= reference

  const mutation = useMutation({
    mutationFn: (productId) => deleteProductById(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "products" }); // invalidateQueries giúp render lại một query với key tùy chọn của phần muốn render lại
      ref.current.checked = false;
    },
  });

  return (
    <>
      <input type="checkbox" ref={ref} id={id} className="modal-toggle" />
      {/* "ref" để biến input checkbox từ checked (true)(mở Modal) thành unchecked (false)(đóng Modal) */}

      <label htmlFor={id} className="modal cursor-pointer">
        <label className="modal-box relative">
          <div className="text-center">
            {/* Warning icon */}
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            {/* Title */}
            <h3 className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>

            {/* Action buttons */}
            <div className="flex justify-center gap-4">
              <button
                className="btn btn-error text-white"
                onClick={() => {
                  mutation.mutate(id);
                }}
              >
                {mutation.isLoading && <Loader />}
                <span className="p-2"> Yes, I'm sure</span>
              </button>

              <label htmlFor={id} className="btn btn-outline">
                No, cancel
              </label>
            </div>
          </div>
        </label>
      </label>
    </>
  );
};

const AdminProductsAction = ({ searchString, setSearchString }) => {
  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="">
        <div className="flex justify-between items-center gap-4">
          {/* Search box */}
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-warning w-full max-w-xs"
            value={searchString}
            onChange={(event) => setSearchString(event.target.value)}
          />{" "}
          {/* Button: Add new */}
          <Link to="new" className="btn btn-warning">
            New
          </Link>
        </div>
      </div>
    </div>
  );
};

const AdminProductsTable = ({ data, isLoading }) => {
  const [id, setId] = useState(null);

  if (isLoading) return <GlobalSpinner />;

  const {
    data: { products },
  } = data;

  return (
    <div className="overflow-x-auto w-full">
      {/* Table */}
      <table className="table w-full capitalize">
        {/* Header */}
        <thead className="">
          <tr>
            <th>
              {/* <label>
                <input type="checkbox" className="checkbox" />
              </label> */}
            </th>
            <th>Products</th>
            <th>Description</th>
            <th>Price</th>
            <th>More</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="  overflow-scroll">
          {products.map((item) => (
            <tr className=" " key={item.id}>
              <th className="">
                <label>
                  <input type="checkbox" className="checkbox" name="" id="" />
                </label>
              </th>
              <td>
                <Link to={`${item.id}/edit`}>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.imageUrl} alt={item.title} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold truncate max-w-[15rem] flex-wrap	">
                        {item.title}
                      </div>
                      <div className="text-sm opacity-50">{item.category}</div>
                    </div>
                  </div>
                </Link>
              </td>
              <td>
                Merry Christmas
                <br />
                <span className="badge badge-ghost badge-sm truncate max-w-xs flex-wrap	whitespace-normal	">
                  {item.description}
                </span>
              </td>
              <td className="">${item.price}</td>
              <th>
                {/* Edit btn */}
                <div className="flex gap-2 items-center ">
                  <div className="tooltip" data-tip="Edit">
                    <Link
                      to={`${item.id}/edit`}
                      className="btn btn-circle btn-info btn-sm hover:opacity-50"
                    >
                      <EditIcon className="icon icon-lg" />
                    </Link>
                  </div>

                  {/* Delete btn */}
                  <div className="tooltip" data-tip="Delete">
                    <label
                      htmlFor={item.id}
                      className="btn btn-circle btn-error btn-sm hover:opacity-50"
                      onClick={() => setId(item.id)}
                    >
                      <DeleteIcon className="icon icon-lg" />
                    </label>
                  </div>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <DeleteProductModal id={id} />
    </div>
  );
};

const AdminProducts = () => {
  // const { data, isLoading } = useFetch(`/products`);

  const [searchString, setSearchString] = useState("");

  const { data, isLoading } = useSearchProducts(searchString);

  return (
    <div>
      {/* Container */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Layout */}
        <div className="py-6">
          {/* Filter */}
          <div className="mb-8">
            <AdminProductsAction
              searchString={searchString}
              setSearchString={setSearchString}
            />
          </div>

          {/* Products's List */}
          <div>
            <AdminProductsTable data={data} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
