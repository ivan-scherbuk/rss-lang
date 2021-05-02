import React from 'react';
import cx from "classnames";
import classesCss from "./Button.module.scss"
import CloseIcon from '@material-ui/icons/Close';
import {Link} from "react-router-dom";

export default function CloseLink({className}){
    return (
        <Link
          to="/"
          className={cx(classesCss.CloseLinkButton, className)}>
          <CloseIcon className={classesCss.Icon}/>
        </Link>
    );
};

