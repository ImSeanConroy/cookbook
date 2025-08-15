import { Link } from "react-router-dom";
import Searchbar from "../ui/searchbar";
import ThemeToggle from "../ui/theme-toggle";

const Header = () => {
  return (
    <div className="flex flex-row gap-10 justify-between items-center">
      <Link to="/" className="font-semibold text-3xl dark:text-white">
        Cook<span className="text-lime-500">book</span>
      </Link>
      <div className="flex flex-row gap-4">
        <Searchbar redirect="/" />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
