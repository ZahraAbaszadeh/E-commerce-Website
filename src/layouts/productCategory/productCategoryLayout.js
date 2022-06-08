import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Styles from "./productCategory.module.css";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Navigation from "../../components/Navigation/NavigationComponent";
import Card from "../../components/Card/CardComponent";
import {
  FilterProductByCategories,
  GetProducts,
  ProductsPagination,
} from "../../api/getProducts";
import { GetCategories } from "../../api/getCategory";
import { PATHS } from "configs/routesConfig";
import { sortByAsc, sortByDesc } from "redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProductCategory = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState([1]);
  const [currentPage, setCurrentPage] = useState(props.currentPage);
  const Nav = useNavigate();
  const sortStatus = useSelector((state) => state.productSort);
  const customDispatch = useDispatch();

  useEffect(() => {
    GetCategories().then((res) => {
      res.data.push({
        createdAt: new Date().getTime(),
        id: res.data.length + 1,
        "name-en": "all",
        "name-fa": "همه",
      });
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    if (categories.length != 0) {
      const category = categories.find((c) => c["name-en"] == props.category);
      if (category) {
        setCategoryId(category.id);
      } else {
        setCategoryId(null);
      }
    }
  }, [props.category, categories]);

  useEffect(() => {
    if (categoryId) {
      if (props.category == "all") {
        GetProducts().then((res) => {
          setAllProducts(res.data);
        });
      } else {
        FilterProductByCategories(categoryId).then((res) => {
          setAllProducts(res.data);
        });
      }

      if (props.category == "all") {
        ProductsPagination(
          "all",
          props.currentPage,
          props.perPage,
          sortStatus
        ).then(() => {
          setProducts(res.data);
        });
      } else {
        ProductsPagination(
          categoryId,
          props.currentPage,
          props.perPage,
          sortStatus
        ).then((res) => {
          setProducts(res.data);
        });
      }
    }
  }, [categoryId, props.currentPage, sortStatus]);

  useEffect(() => {
    if (products.length != 0) {
      const pagination = [];
      for (let i = 1; i <= Math.ceil(allProducts.length / props.perPage); i++) {
        pagination.push(i);
      }
      setPagination(pagination);
    }
  }, [products, allProducts]);

  useEffect(() => {
    if (currentPage != props.currentPage) {
      setCurrentPage(props.currentPage);
    }
  }, [props.currentPage]);

  const changeProductSort = (event) => {
    if (event.target.value == "desc") {
      customDispatch(sortByDesc());
    } else {
      customDispatch(sortByAsc());
    }
  };

  return (
    <>
      <div className={Styles.productCategory}>
        <div className={Styles.productCategory__sideBar}>
          <div className={Styles.productCategory__sideBar__title}>
            <h2>دسته بندی کالاها</h2>
          </div>

          <div className={Styles.productCategory__sideBar__list}>
            <ul>
              {categories.map((category) => {
                return (
                  <li
                    key={category.id}
                    className={
                      props.category === category["name-en"]
                        ? Styles.productCategory__sideBar__list__item__selected
                        : ""
                    }
                  >
                    <Navigation
                      link={PATHS.PRODUCTS + "/" + category["name-en"]}
                      text={category["name-fa"]}
                      internal
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className={Styles.productContent}>
          {products.length > 0 ? (
            <div className={Styles.productContent__sort}>
              <div>
                <p>مرتب سازی : </p>
              </div>

              <div>
                <div
                  className={Styles.productContent__sort__form}
                  onChange={changeProductSort}
                >
                  <Input
                    type="radio"
                    value="asc"
                    name="sortDate"
                    id="sordAsc"
                  />{" "}
                  صعودی
                  <Input
                    type="radio"
                    value="desc"
                    name="sortDate"
                    id="sordDesc"
                    defaultChecked={true}
                  />{" "}
                  نزولی
                </div>
              </div>
            </div>
          ) : null}
          <div className={Styles.productCategory__products}>
            {categoryId ? (
              <>
                {products.length > 0 ? (
                  <>
                    {products.map((product, index) => {
                      return (
                        <Card
                          key={index}
                          id={product.id}
                          image={product.thumbnail}
                          title={product["product-name-fa"]}
                          price={product.price.amount}
                        />
                      );
                    })}
                  </>
                ) : (
                  <div className={Styles.productCategory__products__empty}>
                    <h2>محصولی وجود ندارد</h2>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className={Styles.productCategory__products__notFound}>
                  <h2>دسته بندی مورد نظر یافت نشد</h2>
                  <Button
                    text="بازگشت به صفحه اصلی"
                    size="small"
                    type="danger"
                    borderRadius
                    click={() => {
                      Nav(PATHS.PRODUCTS);
                    }}
                  />
                </div>
              </>
            )}
          </div>

          {products.length > 0 && (categoryId || props.category == "all") ? (
            <div className={Styles.productCategory__pagination}>
              <ul>
                {pagination.map((pageNumber) => {
                  return (
                    <li
                      key={pageNumber}
                      className={
                        props.currentPage == pageNumber
                          ? Styles.productCategory__pagination__item__selected
                          : ""
                      }
                    >
                      <Navigation
                        link={
                          PATHS.PRODUCTS +
                          "/" +
                          props.category +
                          "/" +
                          pageNumber
                        }
                        text={pageNumber}
                        internal
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
ProductCategory.defaultProps = {
  category: "all",
};

ProductCategory.propTypes = {
  category: PropTypes.string,
};
