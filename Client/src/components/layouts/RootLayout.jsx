import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <div>
      <Navbar />

      {/*children */}
      {/* Mặc định các trang có cấu trúc layout giống nhau là Navbar ở trên cùng và phần nội dung sẽ là phần <Outlet/> */}
      <main>
        <Outlet />
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
};

export default RootLayout;
