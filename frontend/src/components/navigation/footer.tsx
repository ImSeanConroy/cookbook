import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col gap-10 pb-10">
      <div className="px-5 py-1 bg-zinc-900 rounded-2xl flex flex-col justify-center">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <Link
            to="/"
            className="font-semibold text-2xl py-3 sm:py-5 text-white"
          >
            Cook<span className="text-lime-500">book</span>
          </Link>

          <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row lg:divide-x lg:divide-white py-2">
            <p className="lg:px-3 text-sm text-white">Sean Conroy © 2025</p>
            <a
              href="mailto:cookbook@imseanconroy.co.uk?subject=Cookbook%20-%20Support%20Request"
              className="lg:px-3 text-sm text-white hover:underline"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
