import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Header } from "../../layouts/header/headerLayout";
import { Footer } from "../../layouts/footer/footerLayout";
import { ProductCategory } from "../../layouts/productCategory/productCategoryLayout";

export const ProductsPage = (props) => {
  const params = useParams();

  const [categoryName, setCategoryName] = useState(
    params.categoryName || "all"
  );
  const [pageNumber, setPageNumber] = useState(
    params.pageNumber != 0 && params.pageNumber != null ? params.pageNumber : 1
  );

  useEffect(() => {
    window.history.replaceState(
      null,
      `دسته بندی محصولات ${categoryName}`,
      `/products/${categoryName}/${pageNumber}`
    );

  }, []);

  useEffect(() => {
    setCategoryName(params.categoryName || "all");
    setPageNumber(
      params.pageNumber != 0 && params.pageNumber != null
        ? params.pageNumber
        : 1
    );
  }, [params.categoryName, params.pageNumber]);

  const [currentCategory, setCurrentCategory] = useState(categoryName);
  useEffect(() => {
    setCurrentCategory(categoryName);
  });

  return (
    <div className="contentWithHeaderAndFooter">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {currentCategory} | {process.env.REACT_APP_WEBSITE_NAME}
        </title>
        <meta
          name="description"
          content={`${currentCategory} %REACT_APP_WEBSITE_NAME%`}
        />
      </Helmet>

      <Header />

      <ProductCategory
        category={currentCategory}
        perPage={6}
        currentPage={pageNumber}
      />

      <Footer />
    </div>
  );
};
