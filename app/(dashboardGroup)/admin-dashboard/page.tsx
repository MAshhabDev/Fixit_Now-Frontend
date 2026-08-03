import React from "react";
import { getUsersAction } from "./_actions/getUserAction";
import AdminUserManagementUI from "./_components/adminComponent";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page || 1);

  const usersRes = await getUsersAction({ page, limit: 10 });
  
  const users = usersRes?.data || [];
  const meta = usersRes?.meta || { page: 1, totalPage: 1 };

  return <AdminUserManagementUI users={users} meta={meta} />;
}