import React, {ChangeEvent} from "react";
import style from "./LocationsPage.module.scss"
import {Link, useNavigate, useParams} from "react-router-dom";
import {useGetAllCharactersQuery} from "../../api/characters.api";
import {skipToken} from "@reduxjs/toolkit/query";
import { useGetAllLocationsQuery } from "../../api/locations.api";
import {Preloader} from "../Z_Common/Preloader/Preloader";
import {Pagination} from "@mui/material";

export const LocationsPage = () => {
    const params = useParams<{id: string}>();
    const id = Number(params.id);

    const { data, isFetching} = useGetAllLocationsQuery(id ?? skipToken);

    const navigate = useNavigate();

    const onChangeHandler = (e: ChangeEvent<unknown>, value: number) => {
        navigate(`/locations/${value}`)

    };

    return (
        <div className={style.locationsPage}>
            <h1 className={style.title}>Locations</h1>

            {isFetching && <Preloader/>}

            {
                data && (
                    <>
                        <Pagination count={data.info.pages}
                                    page={id}
                                    variant="outlined"
                                    shape="rounded"
                                    size="small"
                                    className={style.pagination}
                                    sx={paginationSx}
                                    onChange={onChangeHandler}
                        />

                        <div className={style.list}>
                            <div className={style.listHeader}>
                                <p>Name</p>
                                <p>Type</p>
                                <p>Dimension</p>
                            </div>
                            {
                                data.results.map(item => (
                                    <Link className={style.item}
                                          key={item.id}
                                          to={`/location/${item.id}`}
                                    >
                                        <p>{item.name}</p>
                                        <p>{item.type}</p>
                                        <p>{item.dimension}</p>
                                    </Link>
                                ))
                            }
                        </div>
                    </>
                )
            }

        </div>
    )
}

//=================== STYLES ====================//
const paginationSx = {
    "& .MuiButtonBase-root": {
        backgroundColor: "#FFF",
        transition: "0.3s",
        "&:hover": {
            backgroundColor: "#CCC",
        }
    },
    "& .Mui-selected": {
        backgroundColor: "#AAA!important",
        "&:hover": {
            backgroundColor: "#AAA",
        }
    }
}