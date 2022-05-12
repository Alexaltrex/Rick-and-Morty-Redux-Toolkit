import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {rickandmortyBaseUrl} from "../constants";
import {ICharacter, IGetCharacters, IInfo} from "../types/character.types";

export const charactersApi = createApi({
    reducerPath: "charactersApi",
    baseQuery: fetchBaseQuery({ baseUrl: rickandmortyBaseUrl }),
    endpoints: (builder) => ({
        getAllCharacters: builder.query<IGetCharacters, number>({
            query: (page) => `character/?page=${page}`
        }),
        getCharacterById: builder.query<ICharacter, string>({
            query: (id) => `character/${id}`
        }),
        getMultipleCharacters: builder.query<ICharacter[], number[]>({
            query: (array) => `character/${ array.reduce( (prev, curr) => prev + String(curr) + ",", "") }`
        }),
        getCharactersInfo: builder.query<IInfo, void>({
            query: () => "character",
            transformResponse: (response: IGetCharacters) => response.info
        })
    })
})
export const {
    useGetAllCharactersQuery,
    useGetCharacterByIdQuery,
    useGetCharactersInfoQuery,
    useGetMultipleCharactersQuery,
} = charactersApi;
