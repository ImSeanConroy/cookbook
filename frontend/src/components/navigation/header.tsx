import { IoMoonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Searchbar from "../ui/searchbar";
import Button from "../ui/button";

const Header = () => {
  return (
    <div className="flex flex-row gap-10 justify-between items-center">
      <Link to="/" className="font-semibold text-3xl">
        Cook<span className="text-lime-500">book</span>
      </Link>
      <div className="flex flex-row gap-4">
        <Searchbar />
        <Button>
          <IoMoonOutline className="text-white text-2xl pb-0.5 pl-0.5" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
