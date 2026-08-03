import { getAllCategories } from "@/app/(publicGroup)/_actions/getAllPublicData";
import CategoryFormUI from "../_components/createCategory";

export default async function AdminCategoriesPage() {
  const categoryRes = await getAllCategories();
  const categories = categoryRes?.data || [];

  return <CategoryFormUI categories={categories} />;
}
