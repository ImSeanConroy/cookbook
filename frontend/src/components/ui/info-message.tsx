import { Link } from "react-router-dom";

interface InfoMessageProps {
  hightedTitle: string;
  title: string;
  message?: string;
  buttonVisible?: boolean;
}

export const InfoMessage: React.FC<InfoMessageProps> = ({
  hightedTitle,
  title,
  message,
  buttonVisible = false,
}) => (
  <div className="h-[450px] px-10 py-24 bg-zinc-100 dark:bg-zinc-900 rounded-xl flex flex-col items-center justify-center text-center">
    <h2 className="text-2xl md:text-2xl font-semibold dark:text-white pb-1">
      <span className="text-lime-500">{hightedTitle}</span> {title}
    </h2>
    <p className="text-md text-zinc-500 pb-4 max-w-xl">{message}</p>
    {buttonVisible && (
      <Link
        to="/"
        className="px-4 py-2 rounded-lg cursor-pointer bg-zinc-800 hover:bg-zinc-600 dark:bg-zinc-800 text-white inline-block"
      >
        Return Home
      </Link>
    )}
  </div>
);

export default InfoMessage;
