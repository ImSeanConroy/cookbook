interface InfoMessageProps {
  title: string;
  message?: string;
}

export const InfoMessage: React.FC<InfoMessageProps> = ({ title, message }) => (
  <div className="p-10 bg-zinc-100 dark:bg-zinc-900 rounded-xl flex flex-col items-center justify-center">
    <p className="text-zinc-800 dark:text-zinc-300 mb-2 text-2xl font-semibold">
      {title}
    </p>
    {message && <p className="text-zinc-500 dark:text-zinc-400">{message}</p>}
  </div>
);
