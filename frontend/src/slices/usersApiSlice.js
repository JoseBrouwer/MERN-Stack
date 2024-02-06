import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
import authSlice from "./authSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: USERS_URL/auth,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});


export const { useLoginMutation } = usersApiSlice;
