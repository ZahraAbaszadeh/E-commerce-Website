import React from "react";
import Styles from "./Navigation.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const Navigation = (props) => {
  return (
    <>
      {props.internal ? (
        props.active == true ? (
          <Link
            id={props.id}
            className={
              props.bordered
                ? `${Styles[`borderedLink`]} ${Styles[`active`]}`
                : `${Styles[`active`]}`
            }
            to={props.link}
            onClick={props.click}
          >
            {props.text}
          </Link>
        ) : (
          <Link
            id={props.id}
            className={props.bordered ? `${Styles[`borderedLink`]}` : ""}
            to={props.link}
            onClick={props.click}
          >
            {props.text}
          </Link>
        )
      ) : props.external ? (
        <a
          id={props.id}
          className={props.bordered ? `${Styles[`borderedLink`]}` : ""}
          href={props.link}
          target="_blank"
          onClick={props.click}
        >
          {props.text}
        </a>
      ) : (
        <Link
          id={props.id}
          className={props.bordered ? `${Styles[`borderedLink`]}` : ""}
          to={props.link}
          onClick={props.click}
        >
          {props.text}
        </Link>
      )}
    </>
  );
};

Navigation.propTypes = {
  id: PropTypes.string,
  link: PropTypes.string.isRequired,
  text: PropTypes.any.isRequired,
  click: PropTypes.func,
  active: PropTypes.bool,
  internal: (props, internal, Navigation) => {
    if (!props.internal && !props.external) {
      return new Error(
        `One of props 'internal' or 'external' is Required in '${Navigation}'.`
      );
    }
  },
  external: (props, external, Navigation) => {
    if (!props.internal && !props.external) {
      return new Error(
        `One of props 'internal' or 'external' is Required in '${Navigation}'.`
      );
    }
  },
};
