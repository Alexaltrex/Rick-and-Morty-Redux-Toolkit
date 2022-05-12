import React from "react";
import style from "./CharacterItemPage.module.scss";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Preloader} from "../Z_Common/Preloader/Preloader";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from "@mui/material/IconButton";
import {useGetCharacterByIdQuery, useGetCharactersInfoQuery} from "../../api/characters.api";
import clsx from "clsx";
import {skipToken} from "@reduxjs/toolkit/query";
import { useGetMultipleEpisodesQuery } from "../../api/episodes.api";

export const CharacterItemPage = () => {
    const { id } = useParams<{ id: string }>();

    const {data: dataInfo, isFetching: isFetchingInfo} = useGetCharactersInfoQuery();

    // загрузка по условию - задается через параметр skip - загрузка происходит при skip = false
    // т.е. когда будет проинициализирован параметр id
    // skipToken - аналог skip для typescript
    const {data, error, isFetching, isLoading, refetch} = useGetCharacterByIdQuery(id ?? skipToken, {
        // skip, // отмена запроса
        // pollingInterval: 1000, // повторные запросы через интервал в (мс)
        // refetchOnMountOrArgChange: true // повторный запрос при монтировании
        // refetchOnFocus: true,
    });

    // console.log(`isLoading = ${isLoading}`);
    // console.log(`isFetching = ${isFetching}`);
    // console.log("---------------------------");

    const navigate = useNavigate();

    const onBackClickHandler = () => {
        if (id) {
            navigate(`/character/${Number(id) - 1}`)
        }
    }
    const onForwardClickHandler = () => {
        if (id) {
            navigate(`/character/${Number(id) + 1}`)
        }
    }

    const { data: episodes, isFetching: isFetchingEpisodes} = useGetMultipleEpisodesQuery(
        data?.episode.map(episode => Number(episode.split('https://rickandmortyapi.com/api/episode/')[1])) ?? skipToken
    )

    return (
        <div className={style.characterItemPage}>
            {(isFetching || isFetchingInfo || isFetchingEpisodes) && <Preloader/>}

            {
                data && (
                    <h1 className={clsx({
                        [style.title]: true,
                        [style.title_isFetching]: isFetching,
                    })}>
                        {data.name}
                    </h1>
                )
            }

            {/*{(isFetching || isLoading) && <Skeleton variant="rectangular" className={style.titleSkeleton}/>}*/}

            <div className={style.imageBlock}>
                <IconButton className={style.btn}
                            onClick={onBackClickHandler}
                            disabled={!id || Number(id) === 1}
                >
                    <ArrowBackIcon/>
                </IconButton>

                <div className={style.imgWrapper}>
                    {data && <img src={data.image} alt=""/>}
                </div>

                <IconButton className={style.btn}
                            onClick={onForwardClickHandler}
                            disabled={Boolean(!id) || Boolean(!dataInfo) || Boolean(id && dataInfo && (Number(id) === dataInfo.count))}
                >
                    <ArrowForwardIcon/>
                </IconButton>
            </div>

            {
                data &&
                <div className={style.properties}>
                    <div className={style.row}>
                        <p>Gender</p>
                        <p>{data.gender}</p>
                    </div>

                    {data.species && <div className={style.row}>
                        <p>Species</p>
                        <p>{data.species}</p>
                    </div>}

                    {
                        data.status &&
                        <div className={style.row}>
                            <p>Status</p>
                            <p>{data.status}</p>
                        </div>
                    }

                    {
                        data.type &&
                        <div className={style.row}>
                            <p>Type</p>
                            <p>{data.type}</p>
                        </div>
                    }

                    {
                        data.origin &&
                        <div className={style.row}>
                            <p>origin</p>
                            {
                                data.origin.url
                                    ? (
                                        <button onClick={() => {
                                            const id = data.origin.url.split("https://rickandmortyapi.com/api/location/")[1]
                                            navigate(`/location/${id}`)
                                        }}
                                        >
                                            {data.origin.name}
                                        </button>
                                    )
                                    : <p>{data.origin.name}</p>
                            }
                        </div>
                    }

                    {
                        data.location &&
                        <div className={style.row}>
                            <p>Location</p>
                            {
                                data.location.url
                                    ? (
                                        <button onClick={() => {
                                            const id = data.location.url.split("https://rickandmortyapi.com/api/location/")[1];
                                            navigate(`/location/${id}`);
                                        }}>
                                            {data.location.name}
                                        </button>
                                    )
                                    : <p>{data.location.name}</p>
                            }
                        </div>
                    }
                </div>
            }

            {
                episodes &&
                <div className={style.episodesBlock}>
                    <div className={style.countBlock}>
                        <p>List of episodes in which this character appeared:</p>
                        <div>{episodes.length}</div>
                    </div>
                    <div className={style.list}>
                        {
                            episodes.map(episode => (
                                <Link key={episode.id}
                                      className={style.link}
                                      to={`/episodes/${episode.id}`}
                                >
                                    {`${episode.episode} - ${episode.name}`}
                                </Link>
                            ))
                        }
                    </div>
                </div>
            }

        </div>
    )
}