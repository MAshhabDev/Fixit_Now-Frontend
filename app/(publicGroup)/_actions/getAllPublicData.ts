export const getAllServices = async (query?: {
  page?: number;
  limit?: number;
}) => {
  try {
    const page = query?.page || 1;
    const limit = query?.limit || 6;
    const res = await fetch(
      `https://fixit-now-backend-xjyr.onrender.com/api/services?page=${page}&limit=${limit}`,
      {
        headers: {
          "content-type": "application/json",
        },
        next: {
          revalidate: 60,
          tags: ["all-services"],
        },
      },
    );

    if (!res.ok) {
      return { success: false, data: [] };
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch services error:", error);
    return { success: false, data: [] };
  }
};

export const getAllCategories = async () => {
  try {
    const res = await fetch(
      "https://fixit-now-backend-xjyr.onrender.com/api/categories",
      {
        headers: {
          "content-type": "application/json",
        },
        next: {
          revalidate: 60,
          tags: ["all-categories"],
        },
      },
    );

    if (!res.ok) {
      return { success: false, data: [] };
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch categories error:", error);
    return { success: false, data: [] };
  }
};

export const getAllTechnician = async () => {
  try {
    const res = await fetch(
      "https://fixit-now-backend-xjyr.onrender.com/api/technician",
      {
        headers: {
          "content-type": "application/json",
        },
        next: {
          revalidate: 60,
          tags: ["all-technician"],
        },
      },
    );

    if (!res.ok) {
      return { success: false, data: [] };
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch technician error:", error);
    return { success: false, data: [] };
  }
};
