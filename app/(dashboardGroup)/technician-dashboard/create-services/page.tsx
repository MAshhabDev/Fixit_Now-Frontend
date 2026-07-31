import { getAllCategories } from "@/app/(publicGroup)/_actions/getAllServices";
import CreateServiceForm from "../_components/serviceCreate";

export default async function CreateServicePage() {
  const categoryRes = await getAllCategories();
  const categories = categoryRes?.data || [];

  return <CreateServiceForm categories={categories} />;
}