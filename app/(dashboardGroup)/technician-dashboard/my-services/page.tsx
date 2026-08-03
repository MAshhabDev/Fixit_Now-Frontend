import { getAllServices } from "@/app/(publicGroup)/_actions/getAllPublicData";
import TechnicianServicesListUI from "../_components/TechnicianServicesListUI";

export default async function MyServicesPage() {
  const servicesRes = await getAllServices();
  const services = servicesRes?.data || [];

  return (
    <div className="min-h-screen bg-background py-6">
      <TechnicianServicesListUI services={services} />
    </div>
  );
}