import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-row gap-3 justify-start items-center">
      <img src="/favicon.svg" alt="Chef Hat" className="w-8 h-8" />
      <Link to="/" className="font-semibold text-2xl dark:text-white">
        Cook<span className="text-primary">book</span>
      </Link>
    </div>
  );
};

export default Header;
