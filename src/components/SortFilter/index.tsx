import Button from "../shared/Button";

import { ESortByOptions } from "@/types/enums/sortOptions.enum";
import { ISortState } from "@/types/sotrState.interface";

interface SortFilterProps {
  sortBy: ISortState;
  orderChange: (field: ESortByOptions, ascOrder: boolean) => void;
}

export default function SortFilter({ sortBy, orderChange }: SortFilterProps) {
  const { NAME, PRICE } = ESortByOptions;
  return (
    <div className="mx-2 flex items-center justify-between">
      <div className="flex items-center">
        <label htmlFor="sortBy">Sort by &nbsp;</label>
        <div className="relative">
          <select
            id="sortBy"
            className="select"
            value={sortBy.field}
            onChange={e =>
              orderChange(e.target.value as ESortByOptions, sortBy.ascOrder)
            }
          >
            <option value={NAME}>{NAME}</option>
            <option value={PRICE}>{PRICE}</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <Button
          className="ml-2 rounded border border-gray-400 bg-gray-200 px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-400"
          onClick={() => orderChange(sortBy.field, !sortBy.ascOrder)}
          text={sortBy.ascOrder ? "▲" : "▼"}
        />
      </div>
    </div>
  );
}
