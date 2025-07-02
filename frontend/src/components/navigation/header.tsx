import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-row gap-10 justify-between items-center">
      <Link to="/" className="font-semibold text-3xl">Cook<span className="text-lime-500">book</span></Link>
      <div className="bg-zinc-100 rounded-3xl w-[450px]">
        <p className="p-3 px-5">Search</p>
      </div>
    </div>
  );
};

export default Header;
