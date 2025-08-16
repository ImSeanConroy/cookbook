import { InfoMessage } from "@/components/ui/info-message";

const NotFoundPage = () => {
  return (
    <InfoMessage
      title="404: Page Not Found"
      message="The page you are looking for does not exist. Please check the URL or return to the homepage."
    />
  );
};

export default NotFoundPage;
