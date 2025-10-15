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
    <h2 className="text-3xl md:text-4xl mb-2 font-semibold dark:text-white pb-1">
      <span className="text-lime-500">{hightedTitle}</span> {title}
    </h2>
    <p className="text-md md:text-lg text-zinc-500 pb-6 max-w-xl">{message}</p>
    {buttonVisible && (
      <Link
        to="/"
        className="px-6 py-3 rounded-xl cursor-pointer text-md bg-zinc-800 hover:bg-zinc-600 dark:bg-zinc-800 text-white inline-block"
      >
        Return Home
      </Link>
    )}
  </div>
);

export default InfoMessage;
