import React from "react";
import style from "./Header.module.scss";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import logo from "../../assets/png/logo.png";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectBurgerMenu, setBurgerMenu} from "../../store/appSlice";
import {IconButton} from "@mui/material";
import clsx from "clsx";

export const links = [
    {label: "Characters", to: "/characters/1", slug: "characters"},
    {label: "Locations", to: "/locations/1", slug: "locations"},
    {label: "Episodes", to: "/episodes/1", slug: "episodes"},
    {label: "Products", to: "/products", slug: "products"},
];

export const Header = () => {
    const burgerMenu = useAppSelector(selectBurgerMenu);
    const dispatch = useAppDispatch()
    const onBurger = () => dispatch(setBurgerMenu(!burgerMenu));

    const location = useLocation();

    return (
        <header className={style.header}>
            <div className={style.inner}>
                <Link className={style.logo}
                      to="/"
                      onClick={() => dispatch(setBurgerMenu(false))}
                >
                    <img src={logo} alt=""/>
                </Link>

                <nav className={style.links}>
                    {
                        links.map(({label, to, slug}, index) => (
                            <Link key={index}
                                  to={to}
                                  className={clsx({
                                      [style.link]: true,
                                      [style.link_selected]: location.pathname.includes(slug),
                                  })}
                            >
                                <span>{label}</span>
                            </Link>
                        ))
                    }
                </nav>

                <IconButton  className={style.burger}
                             onClick={onBurger}
                >
                    {burgerMenu ? <MenuOpenIcon/> : <MenuIcon/>}
                </IconButton>
            </div>
        </header>
    )
}