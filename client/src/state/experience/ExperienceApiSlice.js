import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.accessToken;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const experienceApiSlice = createApi({
  reducerPath: "experienceApi",
  baseQuery,
  endpoints: (build) => ({
    exps: build.query({
      query: () => {
        return {
          url: "experiences",
        };
      },
      transformResponse: (response, meta, arg) => response.data,
    }),

    addExp: build.mutation({
      query: (body) => {
        return {
          url: "experiences",
          method: "POST",
          body,
        };
      },
    }),
    /*
        send:
        {
            "company": "Halo Haven",
            "title": "Front-end developer",
            "interval": "2019-2022"
        }
    */

    addExps: build.mutation({
      query: (body) => {
        return {
          url: "experiences",
          method: "POST",
          body,
        };
      },
    }),
    /*
        send:
        [
            {
                "company": "Halo Haven",
                "title": "Front-end developer",
                "interval": "2019-2022"
            },
            {
                "company": "Halo Have2n",
                "title": "Front-end developer2",
                "interval": "2019-20222"
            }
        ]
    */

    modifyExp: build.mutation({
      query: (body, id) => {
        return {
          url: `experiences/${id}`,
          method: "PATCH",
          body,
        };
      },
    }),

    deleteExp: build.mutation({
      query: (id) => {
        return {
          url: `experiences/${id}`,
          method: "DELETE",
        };
      },
    }),

    deleteExps: build.mutation({
      query: () => {
        return {
          url: "experiences",
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useAddExpMutation,
  useAddExpsMutation,
  useDeleteExpMutation,
  useDeleteExpsMutation,
  useModifyExpMutation,
  useExpsQuery
} = experienceApiSlice;
