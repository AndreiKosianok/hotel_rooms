"use client";
import RoomItem from "./RoomItem";

import { IRoomItem } from "@/types/roomItem.interface";

interface IRoomsListProps {
  rooms: IRoomItem[];
}

export default function RoomsList({ rooms }: IRoomsListProps) {
  return (
    <>
      <div className="grid auto-rows-min grid-cols-[repeat(2,minmax(200px,500px))] place-content-center gap-4">
        {rooms.map(room => (
          <RoomItem key={room.id} room={room} />
        ))}
      </div>
    </>
  );
}
