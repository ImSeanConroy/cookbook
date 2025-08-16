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

          <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row lg:divide-x lg:divide-white">
            <p className="md:px-3 text-md text-white">Sean Conroy © 2025</p>
            <a
              href="/privacy"
              className="lg:px-3 text-md text-white hover:underline"
            >
              Privacy & Legal
            </a>
            <a
              href="/terms"
              className="lg:px-3 text-md text-white hover:underline"
            >
              Terms of Use
            </a>
            <a
              href="/cookies"
              className="lg:px-3 text-md text-white hover:underline"
            >
              Cookies
            </a>
            <a
              href="/contact"
              className="lg:px-3 text-md text-white hover:underline"
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
