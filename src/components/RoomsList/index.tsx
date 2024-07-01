import { IRoomItem } from "@/types/roomItem.interface";

interface IRoomsListProps {
  rooms: IRoomItem[];
}

export default function RoomsList({ rooms }: IRoomsListProps) {
  return (
    <>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            <span>{room.name}</span>
            <p>
              {room.price.value}
              <span>{room.price.currencyCode}</span>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
