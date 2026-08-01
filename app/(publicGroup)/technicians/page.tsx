import { getAllTechniciansAction } from "../_actions/allTechnician";
import AllTechniciansUI from "../_components/alltechnicianComponent";

export default async function AllTechniciansPage() {
  const res = await getAllTechniciansAction();
  const technicians = res?.data || [];

  return <AllTechniciansUI technicians={technicians} />;
}