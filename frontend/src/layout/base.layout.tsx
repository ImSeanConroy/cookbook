import Footer from "@/components/navigation/footer";
import Header from "@/components/navigation/header";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div className="px-16">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default BaseLayout;
