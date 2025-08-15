import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex flex-col gap-10 pt-6 pb-12">
      <div className="px-8 py-4 bg-zinc-900 rounded-2xl h-[100px] flex flex-col justify-center">
        <div className="flex flex-row gap-10 justify-between items-center">
          <Link to="/" className="font-semibold text-3xl text-white">
            Cook<span className="text-lime-500">book</span>
          </Link>
          <div className="flex flex-row gap-4 text-white">
            <a href="https://www.github.com/imseanconroy/cookbook"><FaGithub className="text-3xl" /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
