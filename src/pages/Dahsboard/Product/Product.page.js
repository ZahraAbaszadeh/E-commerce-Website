import JoditEditor from "jodit-react";
import Modal from "react-modal";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Styles from "./Product.page.module.css";
import swal from "sweetalert";

import {
  AddProduct,
  DeleteProducts,
  GetProduct,
  GetProducts,
  UpdateProduct,
} from "api/Product.api";

import { Button, Input, Table } from "components";
import { DashboardLayout, Footer, Header } from "layouts";
import { GetCategories, GetCategory } from "api/getCategory.api";
import { Helmet } from "react-helmet";
import { ShowPrice } from "utils/functions.util";
import { UploadImage } from "api/UploadImage.api";

export const UserProductPage = (props) => {
  const [showModal, setShowModal] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [getModalEditData, setGetModalEditData] = useState({});
  const [editPrice, setEditPrice] = useState(0);
  const [editDiscountPrice, setEditDiscountPrice] = useState(0);
  const [editCount, setEditCount] = useState(1);
  const [productEditId, setProductEditId] = useState(0);

  const [tableData, setTableData] = useState({});

  const tableColumns = [
    {
      Header: "کد",
      accessor: "id",
    },
    {
      Header: "تصویر",
      accessor: "image",
      Cell: ({ cell: { value } }) => (
        <div className={Styles.productImage}>
          <img
            src={value}
            alt="Product Image"
            className={Styles.roundedCircleItem}
          />
        </div>
      ),
    },
    {
      Header: "نام کالا",
      accessor: "title",
    },
    {
      Header: "قیمت",
      accessor: "price",
      Cell: ({ cell: { value } }) => (
        <span>{ShowPrice(value, true)} تومان</span>
      ),
    },
    {
      Header: "دسته بندی",
      accessor: "category",
    },
    {
      Header: "عملیات",
      accessor: "ActionButtons",
      Cell: (value) => (
        <div className={Styles.productActions}>
          <Button
            className={Styles.btnEdit}
            text="ویرایش"
            type="success"
            size="small"
            borderRadius
            click={(e) => {
              e.preventDefault();
              setEditMode(true);
              setShowModal(true);

              setProductEditId(value.row.original.id);

              GetProduct(value.row.original.id).then((res) => {
                setEditPrice(res.data.price.amount);
                setEditDiscountPrice(res.data.price["amount-discount"]);
                setEditCount(res.data.count);

                setContentFa(res.data.description.fa);
                setContentEn(res.data.description.en);

                const dataTransfer = new DataTransfer();
                res.data.images.map((image, index) => {
                  dataTransfer.items.add(
                    new File([image.image], image.image, { type: "image/jpeg" })
                  );
                });

                setFileArray(
                  res.data.images.map((item) => {
                    return item;
                  })
                );

                setGetModalEditData(res.data);
              });
            }}
          />
          <Button
            className={Styles.btnDelete}
            text="حذف"
            type="danger"
            size="small"
            borderRadius
            click={(e) => {
              e.preventDefault();

              swal({
                title: `آیا از حذف محصول ${value.row.original.title} با آی دی ${value.row.original.id} اطمینان دارید؟`,
                icon: "warning",
                buttons: {
                  cancel: "خیر",
                  catch: "بله",
                },
                dangerMode: true,
                className: Styles.sweetAlertDeleteProduct,
              }).then((willDelete) => {
                if (willDelete) {
                  const productId = value.row.original.id;
                  DeleteProducts(productId).then(async (res) => {
                    if (res.status === 200) {
                      swal({
                        title: "محصول با موفقیت حذف شد",
                        text: `محصول شماره ${productId} با موفقیت حذف شد`,
                        icon: "success",
                      });
                      const newTableData = tableData.filter(
                        (item) => item.id !== productId
                      );
                      setTableData(newTableData);
                    } else {
                      swal({
                        title: "محصول حذف نشد",
                        text: `محصول شماره ${productId} حذف نشد`,
                        icon: "error",
                      });
                    }
                  });

                  swal("محصول مورد نظر با موفقیت حذف شد", {
                    icon: "success",
                  });
                } else {
                  swal("محصول مورد نظر حذف نشد");
                }
              });
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllData();
  }, []);

  function getAllData() {
    GetProducts().then(async (res) => {
      let newData = [];
      for (let i = 0; i < res.data.length; i++) {
        let tempObject = {};

        await GetCategory(res.data[i]["category-id"]).then((catRes) => {
          tempObject.category = catRes.data["name-fa"];
        });

        tempObject.id = res.data[i].id;
        tempObject.title = res.data[i]["product-name-fa"];
        tempObject.price = res.data[i].price["amount"];
        tempObject.image =
          process.env.REACT_APP_BASE_URL + "/files/" + res.data[i].thumbnail;
        newData.push(tempObject);
      }
      setTableData(newData);
    });
  }

  function updateTableData(newData) {
    setTableData(newData);
  }

  // Jodit Editor
  const editorFa = useRef(null);
  const [contentFa, setContentFa] = useState("");
  const configFa = {
    readonly: false,
    direction: "rtl",
    minHeight: "300px",
  };

  const editorEn = useRef(null);
  const [contentEn, setContentEn] = useState("");
  const configEn = {
    readonly: false,
    direction: "ltr",
    minHeight: "300px",
  };

  //Get Categories
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    GetCategories().then((res) => {
      let newCategories = [];
      for (let i = 0; i < res.data.length; i++) {
        newCategories.push({
          id: res.data[i].id,
          label: res.data[i]["name-fa"],
        });
      }
      setCategories(newCategories);
    });
  }, []);

  // Select Multiple Images
  const [fileObj, setFileObj] = useState(null);
  const [fileArray, setFileArray] = useState([]);

  const uploadMultipleFiles = (e) => {
    setFileObj(e.target.files);
  };

  useEffect(() => {
    if (fileObj) {
      let tempArray = [];
      for (let i = 0; i < fileObj.length; i++) {
        tempArray.push(URL.createObjectURL(fileObj[i]));
      }
      setFileArray(tempArray);
    }
  }, [fileObj]);

  const [inputColorList, setInputColorList] = useState([{ id: 0 }]);

  const [inputGuaranteeList, setInputGuaranteeList] = useState([{ id: 0 }]);

  const [inputPropertyList, setInputPropertyList] = useState([{ id: 0 }]);

  // Submit Form And Save To DB
  const submitProductForm = async (e) => {
    e.preventDefault();

    if (editMode == true) {
      const allFormData = {
        id: productEditId,
        "product-name-en": e.target["product-name-en"].value,
        "product-name-fa": e.target["product-name-fa"].value,
        images: fileArray,
        thumbnail: fileArray[0],
        colors: inputColorList,
        price: {
          currency: "IRR",
          amount: e.target.price.value,
          "amount-discount": e.target.discount.value,
        },
        guarantees: inputGuaranteeList,
        properties: inputPropertyList,
        description: {
          en: contentEn,
          fa: contentFa,
        },
        count: e.target.quantity.value,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        "category-id": e.target.category.value,
        comments: [],
      };

      console.log(allFormData);

      UpdateProduct(productEditId, allFormData).then((res) => {
        console.log(res);
      });
    } else {
      const reqConfig = {
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.getItem("ACCESS_TOKEN"),
        },
      };

      let uploadedPhotos = [];
      for (let i = 0; i < fileArray.length; i++) {
        let formData = new FormData();
        formData.append("image", fileObj[i]);

        await UploadImage(formData, reqConfig).then((res) => {
          uploadedPhotos.push(res.data.filename);
        });
      }

      Promise.all(uploadedPhotos).then((arrOfResults) => {
        const allFormData = {
          "product-name-en": e.target["product-name-en"].value,
          "product-name-fa": e.target["product-name-fa"].value,
          images: arrOfResults,
          thumbnail: arrOfResults[0],

          price: {
            currency: "IRR",
            amount: e.target.price.value,
            "amount-discount": e.target.discount.value,
          },

          description: {
            en: contentEn,
            fa: contentFa,
          },
          count: e.target.quantity.value,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
          "category-id": e.target.category.value,
        };

        AddProduct(allFormData).then(async (res) => {
          if (res.status === 201) {
            swal({
              title: "محصول اضافه شد",
              text: `محصول شماره ${res.data.id}  اضافه شد`,
              icon: "success",
            });
            setFileObj(null);
            setFileArray([]);
            setContentFa("");
            setContentEn("");
            setInputColorList([{ id: 0 }]);
            setInputGuaranteeList([{ id: 0 }]);
            setInputPropertyList([{ id: 0 }]);
            setShowModal(false);

            await GetProducts().then(async (res) => {
              let newProducts = [];
              for (let i = 0; i < res.data.length; i++) {
                await GetCategory(res.data[i]["category-id"]).then((catRes) => {
                  newProducts.push({
                    id: res.data[i].id,
                    title: res.data[i]["product-name-fa"],
                    price: res.data[i].price.amount,
                    category: catRes.data["name-fa"],
                    image:
                      process.env.REACT_APP_BASE_URL +
                      "/files/" +
                      res.data[i].thumbnail,
                  });
                });
              }
              setTableData(newProducts);
            });
          } else {
            swal({
              title: "خطایی رخ داده است",
              text: res.data.message,
              icon: "error",
            });
          }
        });
      });
    }
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>لیست کالا ها | {process.env.REACT_APP_WEBSITE_NAME}</title>
        <meta
          name="description"
          content="لیست کالاهای %REACT_APP_WEBSITE_NAME%"
        />
      </Helmet>

      <Header />

      <DashboardLayout>
        <div className={Styles.productPageHeader}>
          <div className={Styles.productPageHeaderTitle}>
            <h1>لیست کالا ها</h1>
          </div>
          <div className={Styles.productPageHeaderAdd}>
            <Button
              text="افزودن +"
              type="success"
              size="small"
              borderRadius
              click={(event) => {
                event.preventDefault();
                setShowModal(true);
              }}
            />
          </div>
        </div>

        {tableData && tableData.length > 0 ? (
          <Table
            columns={tableColumns}
            data={tableData}
            className={Styles.productTable}
            sorting
            pagination
            filtering
          />
        ) : (
          <div className={Styles.noProduct}>
            <h1>محصولی برای نمایش وجود ندارد</h1>
          </div>
        )}
      </DashboardLayout>

      <Modal
        isOpen={showModal}
        ariaHideApp={false}
        contentLabel="Add Product Modal"
        onRequestClose={() => {
          setShowModal(false);
        }}
        className={Styles.Modal}
        overlayClassName={Styles.Overlay}
      >
        <div className={Styles.ModalHeader}>
          {editMode ? <h1>ویرایش محصول</h1> : <h1>افزودن محصول</h1>}
          <Button
            text="x"
            type="danger"
            size="small"
            borderRadius
            click={() => {
              setShowModal(false);
              setEditMode(false);
              setFileObj(null);
              setFileArray([]);
              setContentFa("");
              setContentEn("");
              setInputColorList([{ id: 0 }]);
              setInputGuaranteeList([{ id: 0 }]);
              setInputPropertyList([{ id: 0 }]);
            }}
          />
        </div>

        <div className={Styles.ModalContent}>
          <form
            onSubmit={(e) => {
              submitProductForm(e);
            }}
          >
            <div className={Styles.ModalForm}>
              <div className={Styles.ModalFormRow}>
                <div className={Styles.inputBox}>
                  <label htmlFor="product-name-fa">نام محصول (فارسی) : </label>
                  {editMode ? (
                    <Input
                      type="text"
                      name="product-name-fa"
                      id="product-name-fa"
                      required
                      onChange={(e) => {
                        setGetModalEditData((prevState) => ({
                          ...prevState,
                          "product-name-fa": e.target.value,
                        }));
                      }}
                      value={getModalEditData["product-name-fa"]}
                    />
                  ) : (
                    <Input
                      type="text"
                      name="product-name-fa"
                      id="product-name-fa"
                      required
                    />
                  )}
                </div>
                <div className={Styles.inputBox}>
                  <label htmlFor="product-name-en">
                    نام محصول (انگلیسی) :{" "}
                  </label>
                  {editMode ? (
                    <Input
                      type="text"
                      name="product-name-en"
                      id="product-name-en"
                      required
                      onChange={(e) => {
                        setGetModalEditData((prevState) => ({
                          ...prevState,
                          "product-name-en": e.target.value,
                        }));
                      }}
                      value={getModalEditData["product-name-en"]}
                    />
                  ) : (
                    <Input
                      type="text"
                      name="product-name-en"
                      id="product-name-en"
                      required
                    />
                  )}
                </div>
              </div>

              <div className={Styles.ModalFormRow}>
                <div className={Styles.inputBox}>
                  <label>توضیحات محصول (فارسی) : </label>
                  <JoditEditor
                    ref={editorFa}
                    value={contentFa}
                    config={configFa}
                    tabIndex={1}
                    onBlur={(newContent) => setContentFa(newContent)}
                    onChange={(newContent) => {}}
                  />
                </div>

                <div className={Styles.inputBox}>
                  <label>توضیحات محصول (انگلیسی) : </label>
                  <JoditEditor
                    ref={editorEn}
                    value={contentEn}
                    config={configEn}
                    tabIndex={1}
                    onBlur={(newContent) => setContentEn(newContent)}
                    onChange={(newContent) => {}}
                  />
                </div>
              </div>

              <div className={`${Styles.ModalFormRow} ${Styles.imageInputBox}`}>
                <div className={Styles.inputBox}>
                  {!editMode ? (
                    <Fragment>
                      <p>
                        {" "}
                        ( توجه : تصویر اول به عنوان thumbnail انتخاب می شود)
                      </p>
                      <Button
                        text="انتخاب تصاویر"
                        type="info"
                        size="small"
                        borderRadius
                        click={(event) => {
                          event.preventDefault();
                          document.getElementById("product-image").click();
                        }}
                      />
                      <Input
                        accept="image/jpeg"
                        type="file"
                        name="product-image"
                        id="product-image"
                        onChange={(e) => {
                          uploadMultipleFiles(e);
                        }}
                        multiple
                        required
                      />
                      <p className={Styles.selectedFileCounter}>
                        {" "}
                        تعداد تصویر : {fileArray.length || 0}{" "}
                      </p>
                    </Fragment>
                  ) : null}
                </div>
                <div className={Styles.multiPreview}>
                  {(fileArray || []).map((url) => (
                    <div className={Styles.newProductImageBox}>
                      <p
                        className={Styles.removeImage}
                        onClick={() => {
                          const newFileArray = fileArray.filter(
                            (file) => file !== url
                          );
                          setFileArray(newFileArray);
                        }}
                      >
                        &times;
                      </p>

                      {editMode ? (
                        <img
                          src={process.env.REACT_APP_BASE_URL + "/files/" + url}
                        />
                      ) : (
                        <img src={url} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className={Styles.ModalFormRow}>
                {editMode ? (
                  <Fragment>
                    <div className={Styles.inputBox}>
                      <label htmlFor="price"> قیمت : </label>
                      <Input
                        type="number"
                        name="price"
                        id="price"
                        onChange={(e) => {
                          setGetModalEditData((prevState) => ({
                            ...prevState,
                            price: e.target.value,
                          }));
                          setEditPrice(e.target.value);
                        }}
                        value={editPrice}
                      />
                    </div>
                    <div className={Styles.inputBox}>
                      <label htmlFor="discount">تخفیف : </label>
                      <Input
                        type="number"
                        name="discount"
                        id="discount"
                        required
                        onChange={(e) => {
                          setGetModalEditData((prevState) => ({
                            ...prevState,
                            discount: e.target.value,
                          }));
                          setEditDiscountPrice(e.target.value);
                        }}
                        value={editDiscountPrice}
                      />
                    </div>
                    <div className={Styles.inputBox}>
                      <label htmlFor="quantity">موجودی : </label>
                      <Input
                        type="number"
                        name="quantity"
                        id="quantity"
                        required
                        onChange={(e) => {
                          setGetModalEditData((prevState) => ({
                            ...prevState,
                            quantity: e.target.value,
                          }));
                          setEditCount(e.target.value);
                        }}
                        value={editCount}
                      />
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className={Styles.inputBox}>
                      <label htmlFor="price"> قیمت : </label>
                      <Input type="number" name="price" id="price" required />
                    </div>
                    <div className={Styles.inputBox}>
                      <label htmlFor="discount">تخفیف : </label>
                      <Input
                        type="number"
                        name="discount"
                        id="discount"
                        required
                      />
                    </div>
                    <div className={Styles.inputBox}>
                      <label htmlFor="quantity">موجودی : </label>
                      <Input
                        type="number"
                        name="quantity"
                        id="quantity"
                        required
                      />
                    </div>
                  </Fragment>
                )}
              </div>

              <div className={Styles.ModalFormRow}>
                <div className={Styles.inputBox}>
                  <label htmlFor="category">دسته بندی : </label>

                  <select name="category" id="category" required>
                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        selected={
                          getModalEditData["category-id"] == category.id
                        }
                      >
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={Styles.ModalFormRow}>
                {editMode ? (
                  <Button
                    text="ویرایش "
                    type="warning"
                    size="small"
                    borderRadius
                  />
                ) : (
                  <Button text="ثبت" type="success" size="small" borderRadius />
                )}
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};
