import { ESortByOptions } from "@/types/enums/sortOptions.enum";

export interface ISortState {
  field: ESortByOptions;
  ascOrder: boolean;
}
