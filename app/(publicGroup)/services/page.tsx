import { Wrench } from "lucide-react";
import ServicesPage from "../_components/Service";
import {
  getAllCategories,
  getAllServices,
  getAllTechnician,
} from "../_actions/getAllServices";

const servicePage = async () => {
  const servicesRes = await getAllServices();
  const categoriesRes = await getAllCategories();
  const technicianRes = await getAllTechnician();

  const allServices = servicesRes?.data || [];
  const allCategories = categoriesRes?.data || [];
  const allTechnician = technicianRes?.data || [];
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* ================= 1. HERO HEADER UI ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary tracking-wider uppercase bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            <Wrench className="w-3.5 h-3.5" />
            <span>Marketplace Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            Browse Services & Experts
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base">
            Find background-checked technicians and book qualified professionals
            at transparent prices.
          </p>
        </div>
        <ServicesPage
          allServices={allServices}
          allCategories={allCategories}
        ></ServicesPage>
      </div>
    </div>
  );
};

export default servicePage;
