import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PATHS } from "../configs/routesConfig";
import {
  BasketPage,
  CheckoutPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  PaymentPage,
  ProductPage,
  ProductsPage,
} from "../pages";

import {
  ProtectedOrdersPage,
  ExitPage,
  ProductListPage,
  QuantityPage,
} from "../pages/Dahsboard";
import { PublicRoutes } from "./PublicRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { PrivateRoutes } from "./PrivateRoutes";

export function AppRouting() {
  <BrowserRouter>
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path={PATHS.HOME} element={<HomePage />} />
        <Route path={PATHS.PRODUCTS} element={<ProductsPage />} />
        <Route path={PATHS.PRODUCTS_CAT} element={<ProductsPage />} />
        <Route
          path={PATHS.PRODUCTS_CAT_PAGINATION}
          element={<ProductsPage />}
        />
        <Route path={PATHS.PRODUCT} element={<ProductPage />} />
        <Route path={PATHS.PRODUCT_ID} element={<ProductPage />} />
        <Route path={PATHS.BASKET} element={<BasketPage />} />
        <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
        <Route path={PATHS.PAYMENT} element={<PaymentPage />} />
        <Route path={PATHS.PAGE404} element={<NotFoundPage />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path={PATHS.DASHBOARD} element={<ProductListPage />} />
        <Route path={PATHS.DASHBOARD_PRODUCT} element={<ProductListPage />} />
        <Route
          path={PATHS.DASHBOARD_ADMIN_ORDERS}
          element={<ProtectedOrdersPage />}
        />

        <Route path={PATHS.DASHBOARD_QUANTITY} element={<QuantityPage />} />
        <Route path={PATHS.DASHBOARD_EXIT} element={<ExitPage />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path={PATHS.LOGIN} element={<LoginPage />} />
      </Route>
    </Routes>
  </BrowserRouter>;
}
