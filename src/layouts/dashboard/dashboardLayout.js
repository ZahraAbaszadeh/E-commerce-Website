import React from "react";
<<<<<<< HEAD
import { Navigation } from "../../components/Navigation/NavigationComponent";
import { PATHS } from "configs/routesConfig";
import Styles from "./dashboardLayout.module.css";
=======
import Styles from "./dashboardLayout.module.css";
import { PATHS } from "../../configs/routesConfig";
import { Navigation } from "../../components/Navigation/NavigationComponent";

>>>>>>> develope
export const DashboardLayout = (props) => {
  const userData = localStorage.hasOwnProperty("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {};
<<<<<<< HEAD
=======

>>>>>>> develope
  return (
    <div className={Styles.DashboardLayout}>
      <div className={Styles.row}>
        <div className={Styles.sideBar}>
          {userData.role == "admin" && (
            <>
              <Navigation
                link={PATHS.DASHBOARD_PRODUCT}
                text=" کالاها"
                internal
              />
              <Navigation
                link={PATHS.DASHBOARD_QUANTITY}
                text="موجودی و قیمت ها"
                internal
              />
              <Navigation
                link={PATHS.DASHBOARD_ADMIN_ORDERS}
                text="سفارشات "
                internal
              />
            </>
          )}

          <Navigation link={PATHS.DASHBOARD_EXIT} text="خروج" internal />
        </div>
        <div className={Styles.mainContent}>{props.children}</div>
      </div>
    </div>
  );
};
