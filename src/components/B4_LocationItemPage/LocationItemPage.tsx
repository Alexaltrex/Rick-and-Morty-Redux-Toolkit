import React from "react";
import style from "./LocationItemPage.module.scss";
import {useNavigate, useParams} from "react-router-dom";
import {skipToken} from "@reduxjs/toolkit/query";
import {useGetLocationByIdQuery, useGetLocationsInfoQuery, usePrefetch} from "../../api/locations.api";
import {Preloader} from "../Z_Common/Preloader/Preloader";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from "@mui/material/IconButton";
import {useGetMultipleCharactersQuery} from "../../api/characters.api";
import {ListOfCharacters} from "../Z_Common/ListOfCharacters/ListOfCharacters";


export const LocationItemPage = () => {
    const params = useParams<{ id: string }>();
    const id = params.id;

    const {data: dataInfo, isFetching: isFetchingInfo} = useGetLocationsInfoQuery();

    const { data, error, isFetching } = useGetLocationByIdQuery(id ?? skipToken);

    const navigate = useNavigate();

    const onBackClickHandler = () => navigate(`/location/${Number(id) - 1}`)
    const onForwardClickHandler = () => navigate(`/location/${Number(id) + 1}`)

    const prefetch = usePrefetch("getLocationById");

    const {data: residents, isFetching: isFetchingResidents} = useGetMultipleCharactersQuery(
        data?.residents.map( resident => Number(resident.split('https://rickandmortyapi.com/api/character/')[1]) ) ?? skipToken
    )

    return (
        <div className={style.locationItemPage}>

            {(isFetching || isFetchingInfo || isFetchingResidents) && <Preloader/>}

            {
                data && (
                    <>
                        <div className={style.titleBlock}>

                            <IconButton className={style.btn}
                                        onClick={onBackClickHandler}
                                        disabled={Number(id) === 1}
                                        onMouseEnter={() => {
                                            if (Number(id) > 1) {
                                                prefetch(String(Number(id) - 1))
                                            }
                                        }}
                            >
                                <ArrowBackIcon/>
                            </IconButton>

                            <h1 className={style.title}>
                                {data.name}
                            </h1>

                            <IconButton className={style.btn}
                                        onClick={onForwardClickHandler}
                                        disabled={Boolean(!dataInfo) || Boolean(dataInfo && (Number(id) === dataInfo.count))}
                                        onMouseEnter={() => {
                                            if (dataInfo && Number(id) < dataInfo.count) {
                                                prefetch(String(Number(id) + 1))
                                            }
                                        }}
                            >
                                <ArrowForwardIcon/>
                            </IconButton>

                        </div>

                        <div className={style.infoBlock}>
                            <div className={style.row}>
                                <p>Dimension</p>
                                <p>{data.dimension}</p>
                            </div>
                            {
                                data.type && <div className={style.row}>
                                    <p>Type</p>
                                    <p>{data.type}</p>
                                </div>
                            }
                        </div>
                    </>
                )
            }

            {
                residents && (
                    <ListOfCharacters title="List of characters who have been seen in the location:"
                                      characters={residents}
                                      className={style.residents}
                    />
                )
            }

        </div>
    )
}