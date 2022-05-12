import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {rickandmortyBaseUrl} from "../constants";
import {IEpisode, IGetEpisodes} from "../types/episodes.types";
import {IInfo} from "../types/character.types";

export const episodesApi = createApi({
    reducerPath: "episodesApi",
    baseQuery: fetchBaseQuery({ baseUrl: rickandmortyBaseUrl }),
    endpoints: (builder) => ({
        getAllEpisodes: builder.query<IGetEpisodes, number>({
            query: (page) => `episode/?page=${page}`
        }),
        getEpisodeById: builder.query<IEpisode, string>({
            query: (id) => `episode/${id}`
        }),
        getMultipleEpisodes: builder.query<IEpisode[], number[]>({
            query: (array) => `episode/${ array.reduce( (prev, curr) => prev + String(curr) + ",", "") }`
        }),
        getEpisodesInfo: builder.query<IInfo, void>({
            query: () => "episode",
            transformResponse: (response: IGetEpisodes) => response.info
        })
    })
});

export const {
    useGetAllEpisodesQuery,
    useGetEpisodeByIdQuery,
    useGetEpisodesInfoQuery,
    useGetMultipleEpisodesQuery,
    usePrefetch,
} = episodesApi;