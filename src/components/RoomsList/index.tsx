"use client";
import { useEffect, useState, useMemo, useCallback } from "react";

import RoomItem from "./RoomItem";
import SortFilter from "@/components/SortFilter";
import Pagination from "@/components/Pagination";
import Button from "@/components/shared/Button";

import { EEnvKeys } from "@/types/enums/envKeys.enum";

import { IRoomItem } from "@/types/roomItem.interface";
import { IAvailabilityStatusResponce } from "@/types/availabilityStatusResponce.interface";
import { ERoomAvailabilityStatus } from "@/types/enums/roomAvailabilityStatus.enum";
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

  const [availabilityStatus, setAvailabilityStatus] = useState<{
    [id: number | string]: IAvailabilityStatusResponce;
  }>({});
  // This state is necessary to temporarily disable buttons
  // or to check the status of possible ongoing requests
  const [isCheckingAvailability, setIsCheckingAvailability] = useState<
    Record<number, boolean>
  >({});

  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.floor(rooms.length / ITEMS_PER_PAGE);

  // For better component readability and further support,
  // sorting and availability logic should have been put into separate custom hooks
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

  const handleSortChange = useCallback(
    (field: ESortByOptions, ascOrder: boolean) => {
      setSortBy({ field, ascOrder });
      setCurrentPage(1);
    },
    [],
  );

  const checkAvailability = async (roomId: number) => {
    setIsCheckingAvailability(rooms => ({ ...rooms, [roomId]: true }));
    try {
      const BASE_URL = EEnvKeys.BASE_URL;
      const ENVIRONMENT_URL = EEnvKeys.ENVIRONMENT_URL;
      const TEST_API_URL = EEnvKeys.TEST_API_URL;

      const response = await fetch(
        new URL(`${ENVIRONMENT_URL}${TEST_API_URL}/room/${roomId}`, BASE_URL),
      );
      const data = await response.json();
      setAvailabilityStatus(items => ({
        ...items,
        [roomId]: { ...data },
      }));
    } catch (error) {
      setAvailabilityStatus(items => ({
        ...items,
        [roomId]: { availabilityStatus: ERoomAvailabilityStatus.ERROR },
      }));
    } finally {
      setIsCheckingAvailability(rooms => ({ ...rooms, [roomId]: false }));
    }
  };

  const handleCheckAvailability = useCallback((roomId: number): void => {
    // Here we can add some additional logic
    checkAvailability(roomId);
  }, []);

  const checkAvailabilityForAll = async () => {
    const roomsToCheck: number[] = [];

    for (const room of preparedRoomsList) {
      if (isCheckingAvailability[room.id]) continue;

      isCheckingAvailability[room.id] = true;
      roomsToCheck.push(room.id);
    }

    if (!roomsToCheck.length) return;
    Promise.allSettled(roomsToCheck.map(roomId => checkAvailability(roomId)));
  };

  return (
    <>
      {/* I decided not to use third-party UI elements, relying on their small required number and Tailwind's styling capabilities */}
      <div className="mx-auto flex max-w-screen-lg justify-evenly py-4">
        {/* Perhaps this button should have been placed in a separate component,
            because it completely duplicates the button inside the room card with its appearance */}
        <Button
          className="btn-primary"
          onClick={checkAvailabilityForAll}
          text="Check availability"
        />
        <SortFilter sortBy={sortBy} orderChange={handleSortChange} />
      </div>
      <div className="grid auto-rows-min grid-cols-[repeat(2,minmax(200px,500px))] place-content-center gap-4">
        {preparedRoomsList.map(room => (
          <RoomItem
            key={room.id}
            room={room}
            isCheckingAvailability={!!isCheckingAvailability[room.id]}
            status={availabilityStatus[room.id]}
            checkAvailability={handleCheckAvailability}
          />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
