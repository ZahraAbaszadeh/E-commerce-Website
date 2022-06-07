import React, { useEffect, useState } from "react";
import Styles from "./header.module.css";
import Logo from "assets/images/logos/logo.png";
import { BsFillCartCheckFill, RiUser2Fill } from "assets/images/icons";
import { Navigation } from "../../components/Navigation/NavigationComponent";
import { useSelector } from "react-redux";
import { GetCategories } from "api/getCategory";

export const Header = (props) => {
  const [headerMenu, setHeaderMenu] = useState([]);
  const shoppingReducer = useSelector((state) => state.shoppingReducer);
  useEffect(() => {
    GetCategories().then((res) => {
      setHeaderMenu(res.data);
    });
  }, []);

  return (
    <header className={Styles.header}>
      <div className={Styles.topHeader}>
        <div className={Styles.logoBox}>
          <Navigation
            link="/"
            text={<img src={Logo} alt="Mobile Store logo" />}
            internal
          />
        </div>
        <h1>فروشگاه آنلاین موبایل استور</h1>
        <div className={Styles.userBox}>
          <ul>
            <li className={Styles.basketBox}>
              <p id="basketCounter">{shoppingReducer.card.length}</p>
              <Navigation
                link="/basket"
                text={<BsFillCartCheckFill />}
                internal
              />
            </li>

            <li className={Styles.userIconBox}>
              <Navigation link="/login" text={<RiUser2Fill />} internal />
            </li>
          </ul>
        </div>
      </div>

      <div className={Styles.bottomHeader}>
        <ul>
          {headerMenu.map((item, index) => {
            return (
              <li key={index}>
                <Navigation
                  link={`/products/${item["name-en"]}`}
                  text={item["name-fa"]}
                  internal
                />
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};
