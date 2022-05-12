import React from "react";
import style from "./HomePage.module.scss"

import src0 from "../../assets/jpeg/menu/characters.jpg";
import src1 from "../../assets/jpeg/menu/locations.jpg";
import src2 from "../../assets/jpeg/menu/episodes.jpg";
import src3 from "../../assets/jpeg/menu/products.jpg";
import { links } from "../A1_Header/Header";
import {Link} from "react-router-dom";

export const srcs = [src0, src1, src2, src3]

export const HomePage = () => {
    return (
        <div className={style.homePage}>
            {
                links.map((link, index) => (
                    <Link to={link.to} key={index} className={style.link}>
                        <img src={srcs[index]} alt=""/>
                        <p>{link.label}</p>
                    </Link>
                ))
            }
        </div>
    )
}