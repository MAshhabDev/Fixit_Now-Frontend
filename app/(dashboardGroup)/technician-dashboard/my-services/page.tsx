/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllServices } from "@/app/(publicGroup)/_actions/getAllPublicData";
import getMe from "@/service/getMe";
import TechnicianServicesListUI from "../_components/TechnicianServicesListUI";

export default async function MyServicesPage() {
  const userRes = await getMe();
  const user = userRes?.data?.result || userRes?.data || userRes;
  const userId = user?.id;
  const techId = user?.technician?.id;

  const servicesRes = await getAllServices();
  const allServices = servicesRes?.data || [];

  const myServices = allServices.filter(
    (s: any) =>
      s.technicianId === techId ||
      s.technician?.id === techId ||
      s.technician?.userId === userId ||
      s.technician?.user?.id === userId
  );

  return (
    <div className="min-h-screen bg-background py-6">
      <TechnicianServicesListUI services={myServices} />
    </div>
  );
}