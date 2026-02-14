import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-row gap-10 justify-between items-center">
      <Link to="/" className="font-semibold text-2xl dark:text-white">
        Cook<span className="text-primary">book</span>
        {/* Cook<span className="text-lime-500">book</span> */}
      </Link>
    </div>
  );
};

export default Header;
