import RoomsList from "@/components/RoomsList";

import { EEnvKeys } from "@/types/enums/envKeys.enum";
import { IRoomItem } from "@/types/roomItem.interface";

// Moving the address to a separate variables or store them in .env file
// It may be too long, but
// if use it as a part for building a query to specific addresses
// that may change, depending on the environment,stand... -
// it makes a bit more sense.
const BASE_URL = EEnvKeys.BASE_URL;
const ENVIRONMENT_URL = EEnvKeys.ENVIRONMENT_URL;
const TEST_API_URL = EEnvKeys.TEST_API_URL;

const ROOMS_URL = new URL(`${ENVIRONMENT_URL}${TEST_API_URL}/rooms`, BASE_URL);
// And here you can probably add some parameters
// for search via new URLSearchParams(searchParams)

// Since the query parameters were not given,
// I decided to request the necessary data on the server,
// and sorting and pagination should be done on client

async function getData() {
  const response = await fetch(ROOMS_URL);
  // Here we can control the revalidation parameters
  // by passing different settings to the second parameter
  // fetch(ROOMS_URL, { next: { revalidate: 60 } });
  if (!response.ok) {
    // This implements a very simple logic with error throwing,
    // obviously it could be implemented more elegantly
    throw new Error("Unable to fetch the data");
  }
  return response.json();
}

export default async function RoomsManagement() {
  // To work with data that comes from the server,
  // I prefer to use a function-mapper,
  // in order to avoid possible errors due to incorrect data,
  // i.e., even if the server changed the format of the data, user is't likely see a white screen.
  // However, I will reject this approach here
  const rooms: IRoomItem[] = await getData();

  return <RoomsList rooms={rooms} />;
}
