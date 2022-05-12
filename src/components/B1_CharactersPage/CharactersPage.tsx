import React, {ChangeEvent, useState} from "react";
import style from "./CharactersPage.module.scss"
import {Pagination} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {Preloader} from "../Z_Common/Preloader/Preloader";
import {CharacterCard} from "./CharacterCard/CharacterCard";
import { useGetAllCharactersQuery } from "../../api/characters.api";
import {skipToken} from "@reduxjs/toolkit/query";

export const CharactersPage = () => {
    const params = useParams<{id: string}>();
    const id = Number(params.id)

    const navigate = useNavigate();

    const onChangeHandler = (e: ChangeEvent<unknown>, value: number) => {
        navigate(`/characters/${value}`)
        setLoadedImagesCount(0);
    };

    const { data, isFetching} = useGetAllCharactersQuery(id ?? skipToken);

    const [loadedImagesCount, setLoadedImagesCount] = useState(0);

    return (
        <div className={style.charactersPage}>
            <h1 className={style.title}>Characters</h1>

            {
                (isFetching || (data && data.results.length !== loadedImagesCount)) &&
                <Preloader/>
            }

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
                    <div className={style.cards}>
                        <div className={style.inner}>
                            {
                                data.results.map(character => (
                                        <CharacterCard key={character.id}
                                                       character={character}
                                                       onLoadHandler={() => setLoadedImagesCount(loadedImagesCount => loadedImagesCount + 1)}
                                        />
                                    )
                                )
                            }
                        </div>

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