import React, {ChangeEvent, useState} from "react";
import style from "./EpisodesPage.module.scss"
import {Link, useNavigate, useParams} from "react-router-dom";
import {skipToken} from "@reduxjs/toolkit/query";
import {useGetAllEpisodesQuery} from "../../api/episodes.api";
import {Preloader} from "../Z_Common/Preloader/Preloader";
import {Pagination} from "@mui/material";
import {CharacterCard} from "../B1_CharactersPage/CharacterCard/CharacterCard";

export const EpisodesPage = () => {
    const params = useParams<{ id: string }>();
    const id = Number(params.id)

    const navigate = useNavigate();

    const onChangeHandler = (e: ChangeEvent<unknown>, value: number) => {
        navigate(`/episodes/${value}`)
    };

    const {data, isFetching} = useGetAllEpisodesQuery(id ?? skipToken);

    return (
        <div className={style.episodesPage}>

            {isFetching && <Preloader/>}

            <h1 className={style.title}>Episodes</h1>

            {
                data &&
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
                        {
                            data.results.map(episode => (
                                    <Link className={style.link}
                                          key={episode.id}
                                          to={`/episode/${episode.id}`}
                                    >
                                        {`${episode.episode} - ${episode.name}`}
                                    </Link>
                                )
                            )
                        }
                    </div>
                </>
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