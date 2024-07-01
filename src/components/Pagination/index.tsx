import Button from "../shared/Button";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function qqqqPagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  // Here you could probably use more complex logic of displaying available pages,
  // as well as add additional buttons to quickly go to the first or last page
  return (
    <div className="mt-8 flex justify-center">
      <Button
        className="btn-navigation w-24 rounded-l"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        text="Previous"
      />

      {Array.from({ length: totalPages }).map((_, i) => (
        <Button
          key={i + 1}
          className={`btn-navigation__page mx-1 px-4 py-2 ${currentPage === i + 1 && "active"}`}
          onClick={() => onPageChange(i + 1)}
          text={i + 1}
        />
      ))}

      <Button
        className="btn-navigation w-24 rounded-r"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        text="Next"
      />
    </div>
  );
}
