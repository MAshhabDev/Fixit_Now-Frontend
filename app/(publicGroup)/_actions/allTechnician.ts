export const getAllTechnician = async (query?: {
  searchTerm?: string;
  location?: string;
  maxPrice?: string;
  page?: number;
  limit?: number;
}) => {
  const searchTerm = query?.searchTerm || "";
  const location = query?.location || "";
  const maxPrice = query?.maxPrice || "";
  const page = query?.page || 1;
  const limit = query?.limit || 6;

  try {
    const res = await fetch(
      `https://fixit-now-backend-xjyr.onrender.com/api/technician?searchTerm=${searchTerm}&location=${location}&maxPrice=${maxPrice}&page=${page}&limit=${limit}`,
      {
        headers: {
          "content-type": "application/json",
        },
        next: {
          revalidate: 60,
          tags: ["all-technician"],
        },
      }
    );

    if (!res.ok) {
      return { success: false, data: [], meta: { page: 1, totalPage: 1 } };
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch technician error:", error);
    return { success: false, data: [], meta: { page: 1, totalPage: 1 } };
  }
};