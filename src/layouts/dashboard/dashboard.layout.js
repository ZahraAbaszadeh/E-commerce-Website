import { Navigation } from "components";
import { PATHS } from "configs/routes.config";
import React, { Fragment, useState } from "react";
import Styles from './dashboardLayout.module.css';

export const DashboardLayout = (props) => {

  const userData = localStorage.hasOwnProperty('userData') ? JSON.parse(localStorage.getItem('userData')) : {};
  
  return (
      <div className={Styles.DashboardLayout}>
        <div className={Styles.row}>
            
            <div className={Styles.sideBar}>
                {
                    userData.role == 'admin' &&
                    <>
                        <Navigation link={PATHS.DASHBOARD_PRODUCT} text=" کالاها" internal />
                        <Navigation link={PATHS.DASHBOARD_QUANTITY} text="موجودی و قیمت ها" internal />
                        <Navigation link={PATHS.DASHBOARD_ADMIN_ORDERS} text="سفارشات " internal />
                     
                    </>
                }
                
                <Navigation link={PATHS.DASHBOARD_EXIT} text="خروج" internal />
            </div>
            <div className={Styles.mainContent}>
                {props.children}
            </div>

        </div>
    </div>
  );
}