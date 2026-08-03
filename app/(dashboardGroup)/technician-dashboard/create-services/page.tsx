import { getAllCategories, getAllServices } from "@/app/(publicGroup)/_actions/getAllPublicData";
import CreateServiceForm from "../_components/serviceCreate";

export default async function CreateServicePage() {
  const categoryRes = await getAllCategories();

  const categories = categoryRes?.data || [];

  return (
    <div className="space-y-6">
      <CreateServiceForm categories={categories} />
    </div>
  );
}