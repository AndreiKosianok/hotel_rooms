import { ECurrencyCode } from "@/types/enums/currency.enum";

export interface IRoomPrice {
  value: number;
  currencyCode: ECurrencyCode;
}

export interface IRoomItem {
  id: number;
  name: string;
  price: IRoomPrice;
}
