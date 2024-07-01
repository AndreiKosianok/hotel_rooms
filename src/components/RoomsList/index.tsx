"use client";
import { useEffect, useState, useMemo, useCallback } from "react";

import RoomItem from "./RoomItem";

import { IRoomItem } from "@/types/roomItem.interface";
import { ISortState } from "@/types/sotrState.interface";
import { ESortByOptions } from "@/types/enums/sortOptions.enum";

const ITEMS_PER_PAGE = 4;

interface IRoomsListProps {
  rooms: IRoomItem[];
}

export default function RoomsList({ rooms }: IRoomsListProps) {
  // Sorted and sliced by ITEMS_PER_PAGE data to be displayed
  const [preparedRoomsList, setPreparedRoomsList] = useState<IRoomItem[]>([]);

  // Options for sorting,
  // ascOrder is a boolean variable, because it is easier to interact with it
  // in comparison by dealing with value, e.g. "asc" or "desc".
  const [sortBy, setSortBy] = useState<ISortState>({
    field: ESortByOptions.NAME,
    ascOrder: true,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.floor(rooms.length / ITEMS_PER_PAGE);

  const sortFunction = useCallback(
    (a: IRoomItem, b: IRoomItem) => {
      const { field, ascOrder } = sortBy;
      switch (field) {
        // By default, string comparison in JavaScript is not language-sensitive
        // (meaning it doesn’t take into account language-specific rules or special characters like accents),
        // which results in the sorted list not being in the correct order.
        // The solution is to leverage Intl.Collator which enables language-sensitive string comparison.
        case ESortByOptions.NAME: {
          const collator = new Intl.Collator(["en", "cs", "de", "pl"], {
            sensitivity: "base",
          });
          const comparison = collator.compare(a.name, b.name);
          return ascOrder ? comparison : -comparison;
        }
        case ESortByOptions.PRICE:
          return ascOrder
            ? b.price.value - a.price.value
            : a.price.value - b.price.value;
        default:
          return 0;
      }
    },
    [sortBy],
  );

  const sortedData = useMemo(
    () => [...rooms].sort(sortFunction),
    [rooms, sortFunction],
  );

  useEffect(() => {
    const paginatedData = sortedData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE,
    );
    setPreparedRoomsList(paginatedData);
  }, [currentPage, sortedData]);

  return (
    <>
      <div className="grid auto-rows-min grid-cols-[repeat(2,minmax(200px,500px))] place-content-center gap-4">
        {preparedRoomsList.map(room => (
          <RoomItem key={room.id} room={room} />
        ))}
      </div>
    </>
  );
}
