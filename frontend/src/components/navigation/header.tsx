import { Link } from "react-router-dom";
import NavUser from "./nav-user";

const Header = () => {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-3">
        <img src="/favicon.svg" alt="Chef Hat" className="w-8 h-8" />
        <Link to="/" className="text-2xl font-semibold dark:text-white">
          Cook<span className="text-primary">book</span>
        </Link>
      </div>

      <NavUser />
    </div>
  );
};

export default Header;
