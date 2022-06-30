import { Navigation } from "components";
import React from "react";
import Styles from "./footer.module.css";
import Logo from "assets/images/logos/logo.png";
import {BsGithub} from "assets/images/icons"

export const Footer = (props) => {
  return (
    <footer>
      <div className={Styles.footerContent}>
        <div className={Styles.aboutUs}>
          <div>
            <img src={Logo} alt="لوگو فروشگاه  موبایل استور" />
            <p>موبایل استور</p>
          </div>
        </div>

        <div className={Styles.another}>
          <strong>محصولات</strong>
        </div>

        <div className={Styles.services}>
          <strong>سبد خرید</strong>
        </div>
        <div className={Styles.help}>
          <strong>درباره ما</strong>
          
        </div>

        <div className={Styles.contactUs}>
          <strong>تماس با ما</strong>
        </div>
      </div>

      <div className={Styles.footerCopyRight}>
        <Navigation link="https://github.com/ZhrAbszd" text={<BsGithub/>} external/>
      </div>
    </footer>
  );
};
