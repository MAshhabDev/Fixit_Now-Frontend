import { getAllCategories } from "@/app/(publicGroup)/_actions/getAllPublicData";
import ProfileForm from "../_components/profileComponent";

export default async function TechnicianProfilePage() {
  const categoryRes = await getAllCategories();
  const categories = categoryRes?.data || [];

  return <ProfileForm categories={categories} />;
}
