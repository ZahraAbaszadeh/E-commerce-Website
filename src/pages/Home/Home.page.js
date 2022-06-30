import { GetCategories } from "api/getCategory.api";
import { SwiperSlider } from "components/SwiperSlider/SwiperSlider.component";
import { Footer, Header } from "layouts";
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Styles from "./Home.page.module.css";
import { Button, Navigation as CatNavigation, ProductCard } from "components";

import { Autoplay, Pagination, Navigation } from "swiper";
import { PATHS } from "configs/routes.config";
import { GetProducts } from "api/Product.api";

import Marquee from "react-easy-marquee";
import { useNavigate } from "react-router-dom";

import sliderBanner_1 from "assets/images/home-slider/4.jpg";
import sliderBanner_2 from "assets/images/home-slider/1.jpg";
import sliderBanner_3 from "assets/images/home-slider/7.jpg";

import { useToasts } from "react-toast-notifications";

import ReactLoading from "react-loading";

export const HomePage = (props) => {
  const Nav = useNavigate();
  const { addToast } = useToasts();

  const sliderItems = [
    {
      image: sliderBanner_1,
      title: "",
      description: "",
    },
    {
      image: sliderBanner_2,
      title: "",
      description: "",
    },
    {
      image: sliderBanner_3,
      title: "",
      description: "",
    },
  ];

  const [categories, setCategories] = React.useState([]);
  useEffect(() => {
    GetCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  const categoryArray = categories.map((category, index) => {
    return {
      image: process.env.REACT_APP_BASE_URL + "/files/" + category.icon,
      title: (
        <CatNavigation
          link={PATHS.PRODUCTS + "/" + category["name-en"]}
          text={category["name-fa"]}
          internal
        />
      ),
      description: "",
    };
  });

  const [products, setProducts] = useState([]);
  useEffect(() => {
    GetProducts().then((res) => {
      setProducts(res.data);
    });
  }, []);

  const [TheMostFrequentCategories, setTheMostFrequentCategories] = useState(
    []
  );
  useEffect(() => {
    if (products.length > 0) {
      setTheMostFrequentCategories(findMostFrequentCategories(products));
    }
  }, [products]);

  function findMostFrequentCategories(arr) {
    let test = arr.reduce((x, y) => {
      if (x[y["category-id"]]) {
        x[y["category-id"]]++;
        return x;
      } else {
        let z = {};
        z[y["category-id"]] = 1;
        return Object.assign(x, z);
      }
    }, {});
    return test;
  }

  const [firstCategoryProducts, setFirstCategoryProducts] = useState([]);
  const [firstCategoryName, setFirstCategoryName] = useState("");
  const [secondCategoryProducts, setSecondCategoryProducts] = useState([]);
  const [secondCategoryName, setSecondCategoryName] = useState("");
  const [thirdCategoryProducts, setThirdCategoryProducts] = useState([]);
  const [thirdCategoryName, setThirdCategoryName] = useState("");

  useEffect(() => {
    if (Object.keys(TheMostFrequentCategories).length > 0) {
      let counter1 = 0;
      setFirstCategoryProducts(
        products.filter((product) => {
          if (
            counter1 < 10 &&
            String(product["category-id"]) ==
              String(Object.keys(TheMostFrequentCategories)[0])
          ) {
            counter1++;
            return (
              String(product["category-id"]) ==
              String(Object.keys(TheMostFrequentCategories)[0])
            );
          }
        })
      );

      let counter2 = 0;
      setSecondCategoryProducts(
        products.filter((product) => {
          if (
            counter2 < 10 &&
            String(product["category-id"]) ==
              String(Object.keys(TheMostFrequentCategories)[1])
          ) {
            counter2++;
            return (
              String(product["category-id"]) ==
              String(Object.keys(TheMostFrequentCategories)[1])
            );
          }
        })
      );

      let counter3 = 0;
      setThirdCategoryProducts(
        products.filter((product) => {
          if (
            counter3 < 10 &&
            String(product["category-id"]) ==
              String(Object.keys(TheMostFrequentCategories)[2])
          ) {
            counter3++;
            return (
              String(product["category-id"]) ==
              String(Object.keys(TheMostFrequentCategories)[2])
            );
          }
        })
      );
    }
  }, [TheMostFrequentCategories]);

  useEffect(() => {
    if (categories.length > 0) {
      categories.map((category) => {
        if (
          String(category["id"]) ==
          String(Object.keys(TheMostFrequentCategories)[0])
        ) {
          const tempCatNames = {
            fa: category["name-fa"],
            en: category["name-en"],
          };
          setFirstCategoryName(tempCatNames);
        }
      });

      categories.map((category) => {
        if (
          String(category["id"]) ==
          String(Object.keys(TheMostFrequentCategories)[1])
        ) {
          const tempCatNames = {
            fa: category["name-fa"],
            en: category["name-en"],
          };
          setSecondCategoryName(tempCatNames);
        }
      });

      categories.map((category) => {
        if (
          String(category["id"]) ==
          String(Object.keys(TheMostFrequentCategories)[2])
        ) {
          const tempCatNames = {
            fa: category["name-fa"],
            en: category["name-en"],
          };
          setThirdCategoryName(tempCatNames);
        }
      });
    }
  }, [
    firstCategoryProducts,
    secondCategoryProducts,
    thirdCategoryProducts,
    categories,
  ]);

  return (
    <div className="contentWithHeaderAndFooter">
      <ReactLoading
        type={"spinningBubbles"}
        color={"#1e3c58"}
        className="loadingSpinner"
        height={50}
        width={50}
      />

      <Helmet>
        <meta charSet="utf-8" />
        <title>{process.env.REACT_APP_WEBSITE_NAME}</title>
        <meta
          name="description"
          content="%REACT_APP_WEBSITE_NAME% - REACT_APP_WEBSITE_DESCRIPTION"
        />
      </Helmet>

      <Header />

      <div>
        <div className={Styles.caroselContainer}>
          <SwiperSlider
            width={"100%"}
            height={"100%"}
            items={sliderItems}
            modules={[Autoplay, Pagination, Navigation]}
          />
        </div>

        {firstCategoryProducts.length > 0 ? (
          <div className={Styles.firstCatProduct}>
            <div className={Styles.catProductsBox}>
              <div className={Styles.firstCatProductHeader}>
                {firstCategoryProducts.length > 0 ? (
                  <>
                    <h3>محصولات {firstCategoryName["fa"]}</h3>
                    <Button
                      text="مشاهده همه >"
                      type="info"
                      size="small"
                      click={() => {
                        Nav(PATHS.PRODUCTS + "/" + firstCategoryName["en"]);
                      }}
                    />
                  </>
                ) : null}
              </div>
              <Marquee
                duration={30000}
                height="40rem"
                width="100%"
                axis="X"
                align="center"
                pauseOnHover={true}
                reverse={false}
              >
                {firstCategoryProducts.length > 0
                  ? firstCategoryProducts.map((product, index) => {
                      return (
                        <ProductCard
                          key={index}
                          id={product.id}
                          image={product.thumbnail}
                          title={product["product-name-fa"]}
                          price={product.price.amount}
                        />
                      );
                    })
                  : null}
              </Marquee>
            </div>
          </div>
        ) : null}

        {secondCategoryProducts.length > 0 ? (
          <div className={Styles.secondCatProduct}>
            <div className={Styles.catProductsBox}>
              <div className={Styles.secondCatProductHeader}>
                {secondCategoryProducts.length > 0 ? (
                  <>
                    <h3> محصولات {secondCategoryName["fa"]}</h3>
                    <Button
                      text="مشاهده همه >"
                      type="info"
                      size="small"
                      click={() => {
                        Nav(PATHS.PRODUCTS + "/" + secondCategoryName["en"]);
                      }}
                    />
                  </>
                ) : null}
              </div>
              <Marquee
                duration={30000}
                height="40rem"
                width="100%"
                axis="X"
                align="center"
                pauseOnHover={true}
                reverse={false}
              >
                {secondCategoryProducts.length > 0
                  ? secondCategoryProducts.map((product, index) => {
                      return (
                        <ProductCard
                          key={index}
                          id={product.id}
                          image={product.thumbnail}
                          title={product["product-name-fa"]}
                          price={product.price.amount}
                        />
                      );
                    })
                  : null}
              </Marquee>
            </div>
          </div>
        ) : null}

        {thirdCategoryProducts.length > 0 ? (
          <div className={Styles.thirdCatProduct}>
            <div className={Styles.catProductsBox}>
              <div className={Styles.thirdCatProductHeader}>
                {thirdCategoryProducts.length > 0 ? (
                  <>
                    <h3> محصولات {thirdCategoryName["fa"]}</h3>
                    <Button
                      text=" مشاهده همه >"
                      type="info"
                      size="small"
                      click={() => {
                        Nav(PATHS.PRODUCTS + "/" + thirdCategoryName["en"]);
                      }}
                    />
                  </>
                ) : null}
              </div>
              <Marquee
                duration={30000}
                height="40rem"
                width="100%"
                axis="X"
                align="center"
                pauseOnHover={true}
                reverse={false}
              >
                {thirdCategoryProducts.length > 0
                  ? thirdCategoryProducts.map((product, index) => {
                      return (
                        <ProductCard
                          key={index}
                          id={product.id}
                          image={product.thumbnail}
                          title={product["product-name-fa"]}
                          price={product.price.amount}
                        />
                      );
                    })
                  : null}
              </Marquee>
            </div>
          </div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
};
