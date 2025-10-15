import { InfoMessage } from "@/components/ui/info-message";

const NotFoundPage = () => {
  return (
    <InfoMessage
      hightedTitle="404"
      title="- Page Not Found"
      message="Looks like this recipe got lost in the kitchen! The page you’re looking for might have been moved, deleted, or never existed."
      buttonVisible={true}
    />
  );
};

export default NotFoundPage;
