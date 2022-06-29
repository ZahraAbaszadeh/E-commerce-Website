import React, {useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Styles from "./ProductStyle.module.css";
import animationStyle from "./animationStyle.module.css";
import swal from "sweetalert";
import { Autoplay, Pagination, EffectCards } from "swiper";
import { Input } from "../../components/Input/InputComponent";
import { SwiperSlider } from "../../components/SwiperSlider/SwiperSliderComponent";
import { Button } from "../../components/Button/ButtonComponent";
import { Header } from "../../layouts/header/headerLayout";
import { Footer } from "../../layouts/footer/footerLayout";
import { GetProduct } from "../../api/getProducts";
import { addToCart } from "../../redux/actions";
import { ShowPrice } from "../../utils/function";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

export const ProductPage = (props) => {
  const params = useParams();
  const nav = useNavigate();
  const productId = params.productId;

  const [productInformation, setProductInformation] = useState({});
  const [productRawInformation, setProductRawInformation] = useState({});

  useEffect(() => {
    if (!productId) {
      swal("خطا", "محصول مورد نظر یافت نشد", "error");
      return;
    }
    GetProduct(productId)
      .then((response) => {
        if (response.status === 200) {
          setProductInformation(response.data);
          GetProduct(productId).then((response) => {
            if (response.status === 200) {
              setProductRawInformation(response.data);
            }
          });
        }
      })
      .catch((error) => {
        swal("خطا", "محصول مورد نظر یافت نشد", "error");
        return;
      });
  }, []);

  const [productSliderItems, setProductSliderItems] = useState([]);

  useEffect(() => {
    let tempImages = [];
    if (productInformation.images) {
      for (let i = 0; i < productInformation.images.length; i++) {
        tempImages.push({
          image:
            process.env.REACT_APP_BASE_URL +
            "/files/" +
            productInformation.images[i],
          title: "",
          description: "",
        });
      }
      setProductSliderItems(tempImages);
    }
  }, [productInformation]);

  const customDispatch = useDispatch();
  const cardShopping = useSelector((state) => state.shoppingReducer.card);

  const addToCard = (e) => {
    e.preventDefault();

    if (!e.target.productCounter.value) {
      swal("خطا", "لطفا تعداد مورد نظر خود را انتخاب کنید", "error");
      return;
    }

    swal("موفقیت", "محصول به سبد خرید اضافه شد", "success");
    const form = new FormData(e.target);
    form.append("productId", productId);
    const data = Object.fromEntries(form);

    const isExist = cardShopping.find((item) => item.productId == productId);

    if (isExist) {
      if (isExist.quantity < productInformation.count) {
        customDispatch(addToCart(+productId, +data.productCounter));
      } else {
        swal("خطا", "تمام موجودی انتخاب شده است", "error");
        return;
      }
    } else {
      customDispatch(addToCart(+productId, +data.productCounter));
    }
  };

  return (
    <div className="contentWithHeaderAndFooter">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${productInformation["product-name-fa"]} | ${process.env.REACT_APP_WEBSITE_NAME}`}</title>
        <meta
          name="description"
          content={`${productInformation["product-name-fa"]} %REACT_APP_WEBSITE_NAME%`}
        />
      </Helmet>

      <Header />

      {productId && productInformation.id ? (
        <>
          <div className={Styles.productContainer}>
            <div className={Styles.productHeader}>
              <div className={Styles.productImage}>
                <SwiperSlider
                  dir="ltr"
                  width={"100%"}
                  effect={"Navigation"}
                  height={"100%"}
                  borderRadius={"1rem"}
                  navigationIcon={false}
                  grabCursor={true}
                  items={productSliderItems}
                  modules={[Autoplay, Pagination, EffectCards]}
                />
              </div>

              <div className={Styles.productInfo}>
                <h1>{productInformation["product-name-fa"]}</h1>
                <h3>{productInformation["product-name-en"]}</h3>
                <hr />
                <p
                  className={Styles.productMiniDesc}
                  dangerouslySetInnerHTML={{
                    __html: productInformation.description.fa,
                  }}
                ></p>

                <p className={Styles.productPrice}>
                  <hr />
                  {productInformation.price["amount-discount"] > 0 ? (
                    <>
                      <div className={Styles.productPriceBox}>
                        <span>قیمت : </span>
                        <span
                          style={{
                            color: "red",
                            textDecoration: "line-through",
                          }}
                        >
                          <span style={{ color: "black" }}>
                            {ShowPrice(productInformation.price.amount, true)}
                          </span>
                        </span>
                        <span>
                          {ShowPrice(
                            String(
                              productInformation.price.amount -
                                productInformation.price["amount-discount"]
                            ),
                            true
                          )}{" "}
                          تومان
                        </span>
                      </div>
                    </>
                  ) : (
                    <span>
                      {ShowPrice(productInformation.price.amount, true)} تومان
                    </span>
                  )}{" "}
                </p>
              </div>

              <div className={Styles.productAdd}>
                <form onSubmit={addToCard}>
                  {productInformation.count > 0 ? (
                    <>
                      <Input
                        type="number"
                        name="productCounter"
                        id="productCounter"
                        min={1}
                        max={+productInformation.count}
                        placeholder="تعداد ..."
                        defaultValue={1}
                      />
                      <Button
                        text="افزودن به سبد خرید"
                        type="success"
                        size="small"
                        borderRadius
                      />
                    </>
                  ) : (
                    <p className={Styles.productNotAvailable}>موجود نمی باشد</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={animationStyle.area}>
            <ul className={animationStyle.circles}>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>

          <div className={Styles.notFoundBox}>
            <h1>محصول مورد نظر یافت نشد</h1>
            <Button
              click={() => nav("/")}
              text="بازگشت به صفحه اصلی"
              type="danger"
              borderRadius
              size="small"
            />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};
