import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => {
        return {
          url: "users",
          method: "POST",
          body,
        };
      },
    }),
    /*
        sent: {
            "email": "user3@jobhunter.hu",
            "password": "user3",
            "fullname": "Jake Peralta3",
            "role": "company" / "jobseeker"
        }
        received: {
            "id": 2,
            "email": "user3@jobhunter.hu",
            "fullname": "Jake Peralta3",
            "role": "company"
        }
    */

    login: build.mutation({
      query: (body) => {
        return {
          url: "authentication",
          method: "POST",
          body,
        };
      },
    }),
    /*
        sent: {
            "email": "user1@jobhunter.hu",
            "password": "user1",
            "strategy": "local"
        }
        recieved: {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE3MTcxMDQwNzYsImV4cCI6MTcxNzE5MDQ3NiwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsInN1YiI6IjEiLCJqdGkiOiI5YTA2OWFjNy04NDNmLTQ2ODQtYjljYi00ZWNiYTU1ODk4YjIifQ.G2huz00kPJNjwkKJCsI4NnaP7smSZJITpNqRqcNNe5M",
            "authentication": {
                "strategy": "local",
                "payload": {
                    "iat": 1717104076,
                    "exp": 1717190476,
                    "aud": "https://yourdomain.com",
                    "sub": "1",
                    "jti": "9a069ac7-843f-4684-b9cb-4ecba55898b2"
                }
            },
            "user": {
                "id": 1,
                "email": "user1@jobhunter.hu",
                "fullname": "Jake Peralta",
                "role": "company"
            }
        }
    */

    userInfo: build.query({
      query: (id) => {
        return {
          url: `users/${id}`,
        };
      },
    }),
    /*
        sent: 1
        received: {
            "id": 1,
            "email": "user1@jobhunter.hu",
            "fullname": "Jake Peralta",
            "role": "company"
        }
    */
  }),
});

export const { useRegisterMutation, useLoginMutation, useUserInfoQuery } =
  authApiSlice;
