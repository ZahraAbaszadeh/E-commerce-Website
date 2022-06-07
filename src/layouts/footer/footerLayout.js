import React from "react";
import Styles from "./footer.module.css";
import { Navigation } from "../../components/Navigation/NavigationComponent";
import Logo from "assets/images/logos/logo.png";
import { BsGithub } from "assets/images/icons";

export const Footer = (props) => {
  return (
    <footer>
      <div className={Styles.footerContent}>
        <div className={Styles.aboutUs}>
          <div>
            <Navigation
              link="/"
              text={<img src={Logo} alt="Mobile Store logo" />}
              internal
            />
            <p>فروشگاه آنلاین موبایل استور عرضه کننده گوشی های هوشمند برند های معتبر</p>
          </div>
        </div>

        <div className={Styles.another}>
       
          <Navigation link="/products" text="محصولات" internal />
          <Navigation link="/products" text="دسته بندی" internal />
          <Navigation link="/" text="صفحه اصلی" internal />
        </div>

        <div className={Styles.services}>
          <Navigation link="/basket" text="سبد خرید" internal />
          <Navigation link="#" text="تخفیف ها" internal />
          <Navigation link="#" text="برگشت کالا" internal />
        </div>
        <div className={Styles.help}>
          <Navigation link="#" text="درباره ما" internal />
          <Navigation link="#" text="دفاتر نمایندگی" internal />
          <Navigation link="#" text="دفاتر فروش" internal />
        </div>

        <div className={Styles.contactUs}>
          <Navigation link="#" text="تماس با ما" internal />
          <Navigation link="#" text="+989121111111" external />
          <Navigation link="#" text="02111111111" external />
        </div>
      </div>

      <div className={Styles.findme}>
        <Navigation
          link="https://github.com/ZahraAbaszadeh"
          text={<BsGithub />}
          external
        />
      </div>
    </footer>
  );
};
