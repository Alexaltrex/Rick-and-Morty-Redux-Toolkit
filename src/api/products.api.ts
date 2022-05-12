import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {rtkqueryBaseUrl} from "../constants";
import {IProduct, ProductUpdateType} from "../types/product.types";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({baseUrl: rtkqueryBaseUrl}),
    tagTypes: ["Product", "Products"],
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProduct[], void>({
            query: () => "/",
            providesTags: ["Products"],
        }),
        getProductById: builder.query<IProduct, string>({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{type: "Product", id}],
        }),
        createProduct: builder.mutation<string, ProductUpdateType>({
            query: (body) => ({
                url: "/",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["Products"],
        }),
        //============================ < Тип возвращаемого результата, Тип body - то что передается параметром в триггер мутации>
        updateProduct: builder.mutation<string, {updateProduct: ProductUpdateType, id: string}>({
            query: ({updateProduct, id}) => ({
                url: `/${id}`,
                method: "PUT",
                body: updateProduct,
            }),
            invalidatesTags: (result, error, arg) => [{type: "Product", id: arg.id}, "Products"],
        }),
        deleteProduct: builder.mutation<string, { id: string }>({
            query: (body) => ({
                url: `/${body.id}`,
                method: "DELETE",
                body: {},
            }),
            invalidatesTags: ["Products"],
        }),
    })
})

export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi
