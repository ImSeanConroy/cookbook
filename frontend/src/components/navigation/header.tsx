import { Link } from "react-router-dom";
import { CiDark } from "react-icons/ci";

const Header = () => {
  return (
    <div className="flex flex-row gap-10 justify-between items-center">
      <Link to="/" className="font-semibold text-3xl">
        Cook<span className="text-lime-500">book</span>
      </Link>
      <div className="flex flex-row gap-4">
        <input
          placeholder="Search..."
          className="bg-zinc-100 rounded-xl w-[450px] text-md px-4 py-3"
        />
        <div className="bg-zinc-900 rounded-xl p-3 flex items-center justify-center cursor-pointer">
          <CiDark className="text-white text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Header;
