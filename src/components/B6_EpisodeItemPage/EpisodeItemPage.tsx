import React from "react";
import style from "./EpisodeItemPage.module.scss"
import {useNavigate, useParams} from "react-router-dom";
import {useGetEpisodeByIdQuery, useGetEpisodesInfoQuery, usePrefetch} from "../../api/episodes.api";
import {skipToken} from "@reduxjs/toolkit/query";
import {Preloader} from "../Z_Common/Preloader/Preloader";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from "@mui/material/IconButton";
import {useGetMultipleCharactersQuery} from "../../api/characters.api";
import {ListOfCharacters} from "../Z_Common/ListOfCharacters/ListOfCharacters";

export const EpisodeItemPage = () => {
    const params = useParams<{ id: string }>();
    const id = params.id;

    const navigate = useNavigate();

    const {data: dataInfo, isFetching: isFetchingInfo} = useGetEpisodesInfoQuery();

    const {data, error, isFetching} = useGetEpisodeByIdQuery(id ?? skipToken);

    const onBackClickHandler = () => navigate(`/episode/${Number(id) - 1}`)
    const onForwardClickHandler = () => navigate(`/episode/${Number(id) + 1}`)

    const {data: residents, isFetching: isFetchingResidents} = useGetMultipleCharactersQuery(
        data?.characters.map( resident => Number(resident.split('https://rickandmortyapi.com/api/character/')[1]) ) ?? skipToken
    );

    const prefetch = usePrefetch("getEpisodeById");

    console.log(data)

    return (
        <div className={style.episodeItemPage}>

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

                            <div className={style.titleWrapper}>
                                <h1 className={style.title}>
                                    <span>{data.episode}</span><span> - </span><span>{data.name}</span>
                                </h1>
                                <p className={style.air}>{`Air date: ${data.air_date}`}</p>
                            </div>


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

                    </>
                )
            }

            {
                residents && (
                    <ListOfCharacters title="List of characters who have been seen in the episode:"
                                      characters={residents}
                                      className={style.residents}
                    />
                )
            }


        </div>
    )
}