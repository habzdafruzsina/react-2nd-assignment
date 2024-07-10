import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import qs from 'qs';

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

export const jobAdsApiSlice = createApi({
  reducerPath: "jobAdsApi",
  baseQuery,
  endpoints: (build) => ({
    allJobs: build.query({
      query: () => ({ url: "jobs" }),
      transformResponse: (response, meta, arg) => response.data,
    }),
    jobsFiltered: build.query({
      query: (filters) => 
        { 
          const queryString = qs.stringify(filters, { encode: false });
          return { url: `jobs?${queryString}` }
        }
      , //jobs?userId=${userid}&salaryFrom[$gt]=350000&company[$like]=%miff%  //jobs?$limit=2&$skip=3
      transformResponse: (response, meta, arg) => response.data,
    }),
    job: build.query({
      query: (id) => {
        return {
          url: `jobs/${id}`,
        };
      },
      transformResponse: (response, meta, arg) => response.data,
    }),
    jobWithAuth: build.query({
      //??
      query: (id) => {
        return {
          url: `jobs/${id}`,
        };
      },
      transformResponse: (response, meta, arg) => response.data,
    }),

    createJob: build.mutation({
      query: (body) => {
        return {
          url: "jobs",
          method: "POST",
          body,
        };
      },
    }),
    /*
        sent: {
            "company": "Dunder Mifflin",
            "position": "Front-end developer",
            "description": "Lorem ipsum...",
            "salaryFrom": 300000, 
            "salaryTo": 400000,
            "type": "full-time",
            "city": "Budapest",
            "homeOffice": false
        }
    */

    modifyJob: build.mutation({
      query: ({ id, body }) => {
        return {
          url: `jobs/${id}`,
          method: "PATCH",
          body,
        };
      },
    }),

    deleteJob: build.mutation({
      query: (id) => {
        return {
          url: `jobs/${id}`,
          method: "DELETE",
        };
      },
    }),
    deleteJobs: build.mutation({
      query: () => {
        return {
          url: "jobs",
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateJobMutation,
  useDeleteJobMutation,
  useDeleteJobsMutation,
  useModifyJobMutation,
  useAllJobsQuery,
  useJobQuery,
  useJobWithAuthQuery,
  useJobsFilteredQuery,
  useJobsLimitedQuery,
} = jobAdsApiSlice;
