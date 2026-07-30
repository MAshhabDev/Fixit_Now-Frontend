export const getAllServices = async () => {
  const res = await fetch(
    "https://fixit-now-backend-xjyr.onrender.com/api/services",
    {
      headers: {
        "content-type": "application/json",
      },

      cache: "no-store",
      next: {
        tags: ["all-services"],
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const result = await res.json();

  return result;
};

export const getAllCategories = async () => {
  const res = await fetch(
    "https://fixit-now-backend-xjyr.onrender.com/api/categories",
    {
      headers: {
        "content-type": "application/json",
      },

      cache: "no-store",
      next: {
        tags: ["all-categories"],
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const result = await res.json();

  return result;
};
export const getAllTechnician = async () => {
  const res = await fetch(
    "https://fixit-now-backend-xjyr.onrender.com/api/technician",
    {
      headers: {
        "content-type": "application/json",
      },

      cache: "no-store",
      next: {
        tags: ["all-categories"],
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const result = await res.json();

  return result;
};
