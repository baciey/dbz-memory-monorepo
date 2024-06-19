import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const CONFIG = {
  apiUrl: "",
};

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: CONFIG.apiUrl,
    prepareHeaders: async (headers) => {
      const token = "";
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
