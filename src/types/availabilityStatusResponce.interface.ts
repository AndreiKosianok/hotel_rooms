import { ERoomAvailabilityStatus } from "./enums/roomAvailabilityStatus.enum";
import { IRoomPrice } from "./roomItem.interface";

export interface IAvailabilityStatusResponce {
  availabilityStatus: ERoomAvailabilityStatus;
  price?: IRoomPrice;
}
