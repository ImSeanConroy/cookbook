
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InfoState from "@/components/other/info-state";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <InfoState
      title="Page Not Found"
      description="The page you are looking for does not exist. You will be redirected to the homepage shortly."
      Icon={Home}
      showButton={false}
    />
  );
};

export default NotFoundPage;
