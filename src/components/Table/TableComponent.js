import React, { useEffect } from "react";
import Styles from "./Table.module.css";
import { useTable, useSortBy, usePagination, useFilters } from "react-table";
import { Button } from "../Button/ButtonComponent";
import PropTypes from "prop-types";

export const Table = (props) => {
  const columns = props.columns;
  const data = props.data;

  const tableInstanse = useTable(
    {
      columns,
      data,
      initialState: { pageSize: props.pageSize || 10 },
    },
    props.filtering && useFilters,
    props.sorting && useSortBy,
    props.pagination && usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = tableInstanse;

  const { pageIndex, pageSize } = state;

  useEffect(() => {
    changeInputPColor(props.editedData, props.tableData);
  });

  function changeInputPColor(editedData, tableData) {
    if (editedData) {
      if (editedData.length > 0) {
        for (let i = 0; i < editedData.length; i++) {
          if (document.getElementById(`input_price_${editedData[i].id}`)) {
            if (
              editedData[i].price !=
              tableData.filter((item) => item.id == editedData[i].id)[0].price
            ) {
              document.getElementById(
                `input_price_${editedData[i].id}`
              ).style.borderColor = "#ff0000";
              document.getElementById(`input_price_${editedData[i].id}`).value =
                editedData[i].price;
            } else {
              document.getElementById(
                `input_price_${editedData[i].id}`
              ).style.borderColor = "#ccc";
            }
            if (
              editedData[i].quantity !=
              tableData.filter((item) => item.id == editedData[i].id)[0]
                .quantity
            ) {
              document.getElementById(
                `input_quantity_${editedData[i].id}`
              ).style.borderColor = "#ff0000";
              document.getElementById(
                `input_quantity_${editedData[i].id}`
              ).value = editedData[i].quantity;
            } else {
              document.getElementById(
                `input_quantity_${editedData[i].id}`
              ).style.borderColor = "#ccc";
            }

            if (
              editedData[i].price ==
                tableData.filter((item) => item.id == editedData[i].id)[0]
                  .price &&
              editedData[i].quantity ==
                tableData.filter((item) => item.id == editedData[i].id)[0]
                  .quantity
            ) {
              document.getElementById(
                `input_price_${editedData[i].id}`
              ).style.borderColor = "#ccc";
              document.getElementById(
                `input_quantity_${editedData[i].id}`
              ).style.borderColor = "#ccc";
            }
          }
        }
      }
    }
  }

  return (
    <>
      <table
        {...getTableProps()}
        className={`${Styles.table} ${props.className}`}
      >
        <thead className={Styles.thead}>
          {headerGroups.map((headerGroup, i) => (
            <>
              <tr {...headerGroup.getHeaderGroupProps()} key={`header_row${i}`}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(
                      props.sorting && column.getSortByToggleProps
                    )}
                  >
                    {column.render("Header")}
                    <span className={Styles.sortIcon}>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
              <tr {...headerGroup.getHeaderGroupProps()}></tr>
            </>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={Styles.tbody}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {props.pagination && (
        <>
          <div className={Styles.pagination}>
            <Button
              click={() => gotoPage(0)}
              text="اول"
              size="small"
              type="info"
              disabled={!canPreviousPage}
            />
            <Button
              click={() => previousPage()}
              text="قبلی"
              size="small"
              type="info"
              disabled={!canPreviousPage}
            />

            <Button
              click={() => nextPage()}
              text="بعدی"
              size="small"
              type="info"
              disabled={!canNextPage}
            />
            <Button
              click={() => gotoPage(pageCount - 1)}
              text="آخر"
              size="small"
              type="info"
              disabled={!canNextPage}
            />

            <span className={Styles.pagination__select}>
              <span>تعداد در هر صفحه : </span>
              <select
                value={pageSize}
                onChange={(e) => {
                  const pageSize = e.target.value ? Number(e.target.value) : 10;
                  setPageSize(pageSize);
                }}
              >
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    نمایش {pageSize} محصول
                  </option>
                ))}
              </select>
            </span>
          </div>
        </>
      )}
    </>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  sorting: PropTypes.bool,
  filtering: PropTypes.bool,
  pagination: PropTypes.bool,
  pageSize: PropTypes.number,
};
