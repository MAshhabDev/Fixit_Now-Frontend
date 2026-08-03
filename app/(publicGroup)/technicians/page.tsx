import { getAllTechnician } from "../_actions/allTechnician";
import AllTechniciansUI from "../_components/alltechnicianComponent";

export default async function AllTechniciansPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search = await searchParams;

  const searchTerm =
    typeof search?.searchTerm === "string" ? search.searchTerm : "";
  const location = typeof search?.location === "string" ? search.location : "";
  const maxPrice = typeof search?.maxPrice === "string" ? search.maxPrice : "";
  const page = Number(search?.page || 1);

  const res = await getAllTechnician({
    searchTerm,
    location,
    maxPrice,
    page,
    limit: 6,
  });
  const techList = res?.data || [];

  return <AllTechniciansUI techList={techList} />;
}
