import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Styles from "./productCategory.module.css";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Navigation from "../../components/Navigation/NavigationComponent";
import Card from "../../components/Card/Card";
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
    }
  }, [categoryId, props.currentPage, sortStatus]);
};
