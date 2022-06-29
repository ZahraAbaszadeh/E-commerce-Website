import React from "react";
import PropTypes from "prop-types";
import Styles from "./CardComponent.module.css";
import { GetProduct } from "api/getProducts";
import { BsFillCartCheckFill } from "assets/images/icons";
import { Navigation } from "../Navigation/NavigationComponent";
import { PATHS } from "configs/routesConfig";
import { ShowPrice } from "utils/function";
import { addToCart } from "redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

export const Card = (props) => {
  const Nav = useNavigate();
  const { addToast } = useToasts();

  const customDispatch = useDispatch();
  const ShoppingReducer = useSelector((state) => state.shoppingReducer);

  return (
    <div className={Styles.productContainer}>
      <Navigation
        text={
          <img
            src={process.env.REACT_APP_BASE_URL + "/files/" + props.image}
            alt={props.title}
          />
        }
        link={PATHS.PRODUCT + "/" + props.id}
        internal
      />

      <div className={Styles.productInfo}>
        <h3>
          <Navigation
            text={props.title}
            link={PATHS.PRODUCT + "/" + props.id}
            internal
          />
        </h3>
        <hr />
        <p>{ShowPrice(props.price, true)} تومان</p>
      </div>

      <div className={Styles.productButtons}>
        <BsFillCartCheckFill
          onClick={() => {
            GetProduct(props.id).then((res) => {
              if (res.status === 200) {
                if (res.data.count === 0) {
                  addToast("محصول مورد نطر موجود نیست", {
                    appearance: "warning",
                    autoDismiss: true,
                    autoDismissTimeout: 5000,
                  });
                  return;
                }

                const isItemInCart = ShoppingReducer.card.find(
                  (item) => item.productId === res.data.id
                );

                if (isItemInCart) {
                  if (isItemInCart.quantity < res.data.count) {
                    customDispatch(addToCart(res.data.id));
                    addToast("محصول به سبد خرید اضافه شد", {
                      appearance: "success",
                      autoDismiss: true,
                      autoDismissTimeout: 5000,
                    });
                  } else {
                    addToast("تمام موجودی محصول انتخاب شده است", {
                      appearance: "error",
                      autoDismiss: true,
                      autoDismissTimeout: 5000,
                    });
                  }
                } else {
                  customDispatch(addToCart(res.data.id));
                  addToast("محصول به سبد خرید اضافه شد", {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: 5000,
                  });
                }
              } else {
                addToast("محصول در دسترس نیست", {
                  appearance: "error",
                  autoDismiss: true,
                  autoDismissTimeout: 5000,
                });
              }
            });
          }}
        />
        <span className={Styles.MdAddShoppingCart}>افزودن به سبد خرید</span>
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};
