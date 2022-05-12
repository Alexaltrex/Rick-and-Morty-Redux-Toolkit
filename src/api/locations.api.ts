import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {rickandmortyBaseUrl} from "../constants";
import {IGetLocations, ILocation} from "../types/location.types";
import {IInfo} from "../types/character.types";

export const locationsApi = createApi({
    reducerPath: "locationsApi",
    baseQuery: fetchBaseQuery({ baseUrl: rickandmortyBaseUrl }),
    endpoints: (builder) => ({
        getAllLocations: builder.query<IGetLocations, number>({
            query: (page) => `location/?page=${page}`
        }),
        getLocationById: builder.query<ILocation, string>({
            query: (id) => `location/${id}`
        }),
        getLocationsInfo: builder.query<IInfo, void>({
            query: () => "location",
            transformResponse: (response: IGetLocations) => response.info
        }),
    })
})
export const {
    useGetAllLocationsQuery,
    useGetLocationByIdQuery,
    useGetLocationsInfoQuery,
    usePrefetch,
} = locationsApi