import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/AuthSlice";
import { authApiSlice } from "./auth/AuthApiSlice";
import { jobAdsApiSlice } from "./jobAds/JobAdsApiSlice";
import { experienceApiSlice } from "./experience/ExperienceApiSlice";
import { applicantsApiSlice } from "./jobAds/ApplicantsApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [jobAdsApiSlice.reducerPath]: jobAdsApiSlice.reducer,
    [experienceApiSlice.reducerPath]: experienceApiSlice.reducer,
    [applicantsApiSlice.reducerPath]: applicantsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(jobAdsApiSlice.middleware)
      .concat(experienceApiSlice.middleware)
      .concat(applicantsApiSlice.middleware),
});
