import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import Home from "../views/Home";
import Products from "../views/product/Products";
import ProductDetail from "../views/product/ProductDetail";
import AdminProducts from "../views/admin/AdminProducts";
import AdminProductsNew from "../views/admin/AdminProductsNew";
import AdminProductsEdit from "../views/admin/AdminProductsEdit";
import NotFound from "../views/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // set layout mặc định cho các trang có layout giống nhau kèm theo các element đi theo sau là các children
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },

      {
        path: "products/:productId",
        element: <ProductDetail />,
      },
      {
        path: "products/category/:category",
        element: <Products />,
      },
      {
        path: "admin/products",
        element: <AdminProducts />,
      },
      {
        path: "admin/products/new",
        element: <AdminProductsNew />,
      },
      {
        path: "admin/products/:productId/edit",
        element: <AdminProductsEdit />,
      },
    ],
  },
]);

export default router;
