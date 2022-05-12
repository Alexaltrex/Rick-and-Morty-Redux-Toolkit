import React from 'react';
import style from "./App.module.scss";
import {useAppSelector} from "../../store/hooks";
import {selectBurgerMenu} from "../../store/appSlice";
import clsx from "clsx";
import {Header} from "../A1_Header/Header";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "../B0_HomePage/HomePage";
import {CharactersPage} from "../B1_CharactersPage/CharactersPage";
import {LocationsPage} from "../B3_LocationsPage/LocationsPage";
import {EpisodesPage} from "../B5_EpisodesPage/EpisodesPage";
import {CharacterItemPage} from "../B2_CharacterItemPage/CharacterItemPage";
import {ProductsPage} from "../B7_ProductsPage/ProductsPage";
import {ProductItemPage} from "../B8_ProductItemPage/ProductItemPage";
import {SnackbarCustom} from "../Z_Common/SnackbarCustom/SnackbarCustom";
import {LocationItemPage} from "../B4_LocationItemPage/LocationItemPage";
import { EpisodeItemPage } from '../B6_EpisodeItemPage/EpisodeItemPage';
import {BurgerMenu} from "../A2_BurgerMenu/BurgerMenu";

const routes = [
    {path: "/", element: <HomePage/>},
    {path: "/characters", element: <CharactersPage/>},
    {path: "/characters/:id", element: <CharactersPage/>},
    {path: "/character/:id", element: <CharacterItemPage/>},
    {path: "/locations/:id", element: <LocationsPage/>},
    {path: "/location/:id", element: <LocationItemPage/>},
    {path: "/episodes/:id", element: <EpisodesPage/>},
    {path: "/episode/:id", element: <EpisodeItemPage/>},
    {path: "/products", element: <ProductsPage/>},
    {path: "/product/:id", element: <ProductItemPage/>},
];

export const App = () => {
    const burgerMenu = useAppSelector(selectBurgerMenu);

    return (
        <div className={clsx({
            [style.app]: true,
            [style.app_fixed]: burgerMenu,
        })}>

            <SnackbarCustom/>

            <Header/>

            <BurgerMenu/>

            <main>
                {/*<div className={style.inner}>*/}
                    <Routes>
                        {
                            routes.map(({path, element}, index) => (
                                <Route key={index}
                                       path={path}
                                       element={element}
                                />
                            ))
                        }
                    </Routes>
                {/*</div>*/}

            </main>

        </div>
    )
}
