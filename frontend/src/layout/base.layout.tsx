import Footer from "@/components/navigation/footer";
import Header from "@/components/navigation/header";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div className="flex flex-col px-5 md:px-10 lg:px-16 py-5 md:py-6 gap-5 md:gap-6">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default BaseLayout;
