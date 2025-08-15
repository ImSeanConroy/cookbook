import Button from "./button";

interface PageNumbersProps {
  currentPage: number;
  totalPages: number;
  onClick: (page: number) => void;
}

const PageNumbers = ({ currentPage, totalPages, onClick }: PageNumbersProps) => {
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex gap-2">
      {pages.map((page) => {
        const isCurrent = page === currentPage;
        return (
          <Button
            key={page}
            onClick={() => onClick(page)}
            disabled={isCurrent}
            className={`bg-zinc-800 ${
              isCurrent ? "opacity-50 cursor-not-allowed" : "hover:bg-zinc-500"
            }`}
          >
            {page}
          </Button>
        );
      })}
    </div>
  );
};

export default PageNumbers;
