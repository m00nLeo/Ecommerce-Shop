import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="shadow-lg h-navbar">
      {/* Container */}
      <div className="mx-auto max-w-screen-xl px-4">
        {/* Layout */}
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link to="/">
            <img src={Logo} className="h-12 w-20" alt="" />
          </Link>

          {/* Admin button */}
          <div className="flex gap-4">
            <Link to="/admin/products" className="btn btn-primary">
              Admin
            </Link>
            <Link to="/products" className="btn btn-primary">
              Guest Sign-in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
