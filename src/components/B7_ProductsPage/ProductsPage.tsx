import React from "react";
import style from "./ProductsPage.module.scss"
import {useCreateProductMutation, useDeleteProductMutation, useGetAllProductsQuery} from "../../api/products.api";
import {Preloader} from "../Z_Common/Preloader/Preloader";
import {Link} from "react-router-dom";
import {ProductForm} from "../Z_Common/ProductForm/ProductForm";
import {ProductUpdateType} from "../../types/product.types";
import Button from "@mui/material/Button";
import {FormikHelpers} from "formik";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import {useAppDispatch} from "../../store/hooks";
import {setSnackbar} from "../../store/appSlice";

export const ProductsPage = () => {
    const dispatch = useAppDispatch();
    const {data, isFetching, refetch} = useGetAllProductsQuery();

    const [createProduct, {isLoading}] = useCreateProductMutation();

    const onSubmitHandler = async (
        values: ProductUpdateType,
        formikHelpers: FormikHelpers<ProductUpdateType>
    ) => {
        try {
            const response = await createProduct(values).unwrap();
            console.log(response);
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

    const [deleteProduct, {isLoading: isLoadingDelete}] = useDeleteProductMutation();

    return (
        <div className={style.productsPage}>

            {isFetching && <Preloader/>}

            <h1 className={style.title}>Products</h1>

            {
                data && (
                    <>
                        <div className={style.items}>
                            {
                                data.map(product => (
                                    <div key={product.id}
                                         className={style.item}
                                    >
                                        <Link
                                            className={style.link}
                                            to={`/product/${product.id}`}
                                        >
                                            {product.name}
                                        </Link>
                                        <IconButton className={style.deleteBtn}
                                                    onClick={async () => {
                                                        try {
                                                            console.log("onClick");
                                                            const response = await deleteProduct({id: product.id}).unwrap();
                                                            dispatch(setSnackbar({open: true, message: response, severity: "success"}))
                                                        } catch (e: any) {
                                                            if (process.env.NODE_ENV === 'development') {
                                                                console.log(e.data.message);
                                                            }
                                                        }

                                                    }}
                                        >
                                            <DeleteIcon sx={{color: "#FFF"}}/>
                                        </IconButton>
                                    </div>

                                ))
                            }
                        </div>

                        <ProductForm buttonLabel="Add product"
                                     initialValues={{
                                         name: "",
                                         size: 1,
                                         weight: 1,
                                         description: "",
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