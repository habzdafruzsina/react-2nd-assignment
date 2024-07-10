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

export const applicantsApiSlice = createApi({
  reducerPath: "applicantsApi",
  baseQuery,
  endpoints: (build) => ({
    applicantsPerJob: build.query({ //gyanúm szerint ez az első két végpont a szerveren hibás
      query: (params) => ({
        url: `applicants`,
        params: params,
      }),
      transformResponse: (response, meta, arg) => response.data,
    }),

    jobsPerApplicant: build.query({
      query: (params) => ({
        url: `applicants`,
        params: params,
      }),
      transformResponse: (response, meta, arg) => response.data,
    }),

    applyForJob: build.mutation({
      query: (body) => {
        return {
          url: `applicants`,
          method: "POST",
          body,
          /*{
            // "userId": 3,
            "jobId": 18
          }*/
        };
      },
    }),

    deleteApplicantsFromJob: build.mutation({
      query: (jobId) => {
        return {
          url: `applicants?jobId=${jobId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useApplyForJobMutation,
  useDeleteApplicantsFromJobMutation,
  useJobsPerApplicantQuery,
  useApplicantsPerJobQuery,
} = applicantsApiSlice;
