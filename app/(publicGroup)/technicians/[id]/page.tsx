import { getSingleTechnicianAction } from "../../_actions/getTechnicianAction";
import SingleTechnicianUI from "../../_components/getSingleTechnician";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SingleTechnicianPage({ params }: PageProps) {
  const { id } = await params;
  const res = await getSingleTechnicianAction(id);
  const tech = res?.data || null;

  return <SingleTechnicianUI tech={tech} />;
}
