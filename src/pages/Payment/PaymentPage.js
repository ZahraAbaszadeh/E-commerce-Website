import React, { useEffect } from "react";
import Styles from "./PaymentStyle.module.css";
import { Button } from "../../components/Button/ButtonComponent";
import { Header } from "../../layouts/header/headerLayout";
import { Footer } from "../../layouts/footer/footerLayout";
import { GetProduct, UpdateProduct } from "../../api/ProductApi";
import { Helmet } from "react-helmet";
import { addOrder } from "../../api/updateOrder";
import { clearCart, deleteOrder } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

export const PaymentPage = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const Nav = useNavigate();
  const customDispatch = useDispatch();
  const orderInformation = useSelector((state) => state.orderReducer);

  useEffect(() => {
    orderInformation.products.map((item) => {
      GetProduct(item.productId).then((response) => {
        if (response.status == 200) {
          const data = response.data;
          data.count -= item.quantity;
          UpdateProduct(item.productId, data).then((response) => {
            if (response.status == 200) {
              addOrder(orderInformation).then((response) => {
                if (response.status == 201) {
                  customDispatch(deleteOrder());
                  customDispatch(clearCart());
                }
              });
            }
          });
        }
      });
    });
  }, [searchParams]);

  return (
    <div className="contentWithHeaderAndFooter">
      <Helmet>
        <title> وضعیت پرداخت</title>
      </Helmet>

      <Header />

      <div className="content">
        <div className={Styles.paymentSuccess}>
          <h1>پرداخت با موفقیت انجام شد</h1>

          <Button
            borderRadius
            text="بازگشت به صفحه اصلی"
            type="success"
            size="small"
            click={() => Nav("/")}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};
