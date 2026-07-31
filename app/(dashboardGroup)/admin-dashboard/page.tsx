import { getUsersAction } from "./_actions/getUserAction";
import AdminUserManagementUI from "./_components/adminComponent";

export default async function AdminUsersPage() {
  const usersRes = await getUsersAction();
  const users = usersRes?.data || [];

  return <AdminUserManagementUI users={users} />;
}
