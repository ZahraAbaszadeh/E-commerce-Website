import React, { useEffect, useState } from "react";
import Styles from "./BasketPage.module.css";
import swal from "sweetalert";
import { Table } from "../../../components/Table/TableComponent";
import { Navigation } from "../../components/Navigation/NavigationComponent";
import { Input } from "../../components/Input/InputComponent";
import { Button } from "../../components/Button/ButtonComponent";
import { Footer } from "../../../layouts/footer/footerLayout";
import { Header } from "../../../layouts/header/headerLayout";
import { GET_PRODUCT } from "../../configs/urlConfig";
import { GetProduct } from "../../api/ProductApi";
import { Helmet } from "react-helmet";
import { ShowPrice } from "../../utils/function";
import { adjustQuantity, removeFromCart } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

export const BasketPage = (props) => {
  const Nav = useNavigate();
  const { addToast } = useToasts();
  const customDispatch = useDispatch();
  const basketProducts = useSelector((state) => state.shoppingReducer.card);
  const [tableData, setTableData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const basketTableHeader = [
    {
      Header: "کد ",
      accessor: "id",
    },
    {
      Header: "کالا",
      accessor: "productName",
      Cell: (value) => {
        return (
          <Navigation
            link={`${GET_PRODUCT}/${value.row.original.id}`}
            text={value.row.original.productName}
            internal
          />
        );
      },
    },
    {
      Header: "قیمت",
      accessor: "price",
    },

    {
      Header: "تعداد",
      accessor: "count",
      Cell: (value) => {
        return (
          <Input
            id="count"
            type="number"
            defaultValue={value.value}
            min={1}
            max={value.row.original.defaultCount}
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            onChange={(e) => {
              customDispatch(
                adjustQuantity(value.row.original.id, Number(e.target.value))
              );
            }}
          />
        );
      },
    },
    {
      Header: "حذف",
      accessor: "delete",
      Cell: (value) => {
        return (
          <Button
            type="danger"
            size="small"
            text="حذف"
            click={(e) => {
              e.preventDefault();
              removeProductFromBasket(value.row.original.id);
            }}
          />
        );
      },
    },
  ];

  useEffect(() => {
    if (basketProducts.length > 0) {
      let tempTableData = [];
      let tempProduct = {};

      basketProducts.map((product) => {
        GetProduct(product.productId)
          .then((res) => {
            tempProduct = {
              id: res.data.id,
              productName: res.data["product-name-fa"],
              price: ShowPrice(res.data.price.amount, true) + " تومان",
              defaultPrice: res.data.price.amount,
              count: product.quantity,
              defaultCount: res.data.count,
            };
          })
          .then(() => {
            tempTableData.push(tempProduct);
          })
          .then(() => {
            if (tempTableData.length === basketProducts.length) {
              setTotalPrice(
                tempTableData.reduce((total, product) => {
                  return total + product.count * product.defaultPrice;
                }, 0)
              );
              setTableData(tempTableData);
            }
          });
      });
    }
  }, [basketProducts]);

  const removeProductFromBasket = (id) => {
    swal({
      title: "آیا مطمئن هستید؟",
      icon: "warning",
      buttons: {
        cancel: "خیر",
        catch: "بله",
      },
      dangerMode: true,
      className: Styles.sweetAlertDeleteProduct,
    }).then((willDelete) => {
      if (willDelete) {
        customDispatch(removeFromCart(id));
        addToast("کالا از سبد خرید حذف شد", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      }
    });
  };

  return (
    <div className="contentWithHeaderAndFooter">
      <Header />

      <Helmet>
        <title>{`سبد خرید | تعداد محصولات ${basketProducts.length}`}</title>
        <meta
          name="description"
          content={`سبد خرید | تعداد محصولات ${basketProducts.length}`}
        />
      </Helmet>

      <div className={Styles.basketPage}>
        {basketProducts && basketProducts.length > 0 ? (
          <>
            <div className={Styles.basketTable}>
              <Table
                columns={basketTableHeader}
                data={tableData}
                className={Styles.ordersTable}
                sorting
                pagination
                filtering
              />
            </div>

            <div className={Styles.basketTotal}>
              <div className={Styles.basketTotalText}>
                <span>جمع کل : </span>
                <span>{ShowPrice(String(totalPrice), true)} تومان</span>
              </div>
              <Button
                type="success"
                size="large"
                text="تکمیل خرید"
                click={(e) => {
                  e.preventDefault();
                  Nav("/checkout");
                }}
              />
            </div>
          </>
        ) : (
          <div className={Styles.noProductMessage}>
            <h1>سبد خرید خالی است</h1>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
