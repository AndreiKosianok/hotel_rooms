import Button from "@/components/shared/Button";

import { IRoomItem } from "@/types/roomItem.interface";

interface IRoomItemProps {
  room: IRoomItem;
}

export default function RoomItem({ room }: IRoomItemProps) {
  return (
    <div className="w-100 flex flex-col rounded-2xl bg-white shadow-xl">
      <div className="flex h-full flex-col p-8">
        <div className="h-16 overflow-hidden text-ellipsis pb-6 text-2xl font-bold text-gray-700">
          {room.name}
        </div>
        <div className="flex-1 text-lg text-gray-700">
          {room.price.value}
          <span> - {room.price.currencyCode}</span>
        </div>
        <div className="mt-auto flex justify-between pt-6">
          <Button className="btn-secondary" onClick={() => {}} text="Book" />
          <Button
            className="btn-primary"
            onClick={() => {}}
            text="Check avaiability"
          />
        </div>
      </div>
    </div>
  );
}
