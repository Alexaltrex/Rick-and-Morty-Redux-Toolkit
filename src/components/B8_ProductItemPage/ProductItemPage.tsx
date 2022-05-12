import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDeleteProductMutation, useGetProductByIdQuery, useUpdateProductMutation} from "../../api/products.api";
import style from "./ProductItemPage.module.scss";
import {Preloader} from "../Z_Common/Preloader/Preloader";
import {FormikHelpers} from "formik";
import {ProductUpdateType} from "../../types/product.types";
import {Button} from "@mui/material";
import {ProductForm} from "../Z_Common/ProductForm/ProductForm";
import {skipToken} from "@reduxjs/toolkit/query";
import {useAppDispatch} from "../../store/hooks";
import {setSnackbar} from "../../store/appSlice";


export const ProductItemPage = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();

    const {data, error, isFetching, isLoading, refetch} = useGetProductByIdQuery(id ?? skipToken);

    const [updateProduct, {isLoading: isLoadingUpdate}] = useUpdateProductMutation();

    const onSubmitHandler = async (
        values: ProductUpdateType,
        formikHelpers: FormikHelpers<ProductUpdateType>
    ) => {
        try {
            const response = await updateProduct({updateProduct: values, id: (id as string)}).unwrap();
            dispatch(setSnackbar({open: true, message: response, severity: "success"}))
        } catch (e: any) {
            if (process.env.NODE_ENV === 'development') {
                console.log(e.data.message);
            }
            dispatch(setSnackbar({open: true, message: e.data.message, severity: "error"}))
        } finally {
            formikHelpers.setSubmitting(false);
            formikHelpers.resetForm();
        }
    }

    return (
        <div className={style.productItemPage}>

            {(isLoading || isLoadingUpdate) && <Preloader/>}

            {
                data && (
                    <>
                        <h1 className={style.title}>
                            {data.name}
                        </h1>
                        <div className={style.properties}>
                            <div className={style.row}>
                                <p>Size</p>
                                <p>{data.size}</p>
                            </div>
                            <div className={style.row}>
                                <p>Weight</p>
                                <p>{data.weight}</p>
                            </div>
                            <div className={style.row}>
                                <p>Description</p>
                                <p>{data.description}</p>
                            </div>
                        </div>

                        <ProductForm buttonLabel="Edit product"
                                     initialValues={{
                                         name: data.name,
                                         size: data.size,
                                         weight: data.weight,
                                         description: data.description,
                                     }}
                                     onSubmitHandler={onSubmitHandler}
                                     className={style.form}
                        />

                        <Button variant="contained" color="error" sx={{marginTop: "24px"}}
                                onClick={() => refetch()}
                        >
                            Force re-fetch
                        </Button>

                    </>
                )
            }
        </div>
    )
}