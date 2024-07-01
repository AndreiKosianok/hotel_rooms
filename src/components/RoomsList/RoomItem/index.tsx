import Button from "@/components/shared/Button";

import { IAvailabilityStatusResponce } from "@/types/availabilityStatusResponce.interface";
import { ERoomAvailabilityStatus } from "@/types/enums/roomAvailabilityStatus.enum";
import { IRoomItem } from "@/types/roomItem.interface";

interface IRoomItemProps {
  room: IRoomItem;
  isCheckingAvailability: boolean;
  status: IAvailabilityStatusResponce;
  checkAvailability: (id: number) => void;
}

export default function RoomItem({
  room,
  isCheckingAvailability,
  status,
  checkAvailability,
}: IRoomItemProps) {
  const isBookButtonDisabled =
    status?.availabilityStatus !== ERoomAvailabilityStatus.AVAILABLE;
  const handleBook = () => {
    const price = status?.price?.value || room.price.value;
    const currency = status?.price?.currencyCode || room.price.currencyCode;
    console.log(`current room ${room.name} available for ${price} ${currency}`);
  };
  const handleCheckAvailability = () => {
    checkAvailability(room.id);
  };
  return (
    <div className="w-100 flex flex-col rounded-2xl bg-white shadow-xl">
      <div className="flex h-full flex-col p-8">
        <div className="h-16 overflow-hidden text-ellipsis pb-6 text-2xl font-bold text-gray-700">
          {room.name}
        </div>
        <div className="flex-1 text-lg text-gray-700">
          {room.price.value}
          <span> - {room.price.currencyCode}</span>
          {status?.price && (
            <span>{` | current price - ${status?.price.value} - ${status?.price.currencyCode}`}</span>
          )}
          <p className="h-7">
            {status?.availabilityStatus && (
              // Here it is possible to use badges with different design styles to display the corresponding statuses
              // I didn't put them in a separate component and use the corresponding styling
              <span className="me-2 rounded border border-blue-400 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-700 dark:text-blue-400">
                {status?.availabilityStatus}
              </span>
            )}
          </p>
        </div>
        <div className="mt-auto flex justify-between pt-6">
          <Button
            className="btn-secondary"
            disabled={isBookButtonDisabled}
            onClick={handleBook}
            text="Book"
          />
          <Button
            className="btn-primary"
            disabled={isCheckingAvailability}
            onClick={handleCheckAvailability}
            text="Check avaiability"
          />
        </div>
      </div>
    </div>
  );
}
