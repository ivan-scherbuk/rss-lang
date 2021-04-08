import React from 'react';
import classesCss from "./Button.module.scss"
import CloseIcon from '@material-ui/icons/Close';
import {Link} from "react-router-dom";

export default function CloseLink(){
    return (
        <Link
          to="/"
          className={classesCss.CloseLinkButton}>
          <CloseIcon className={classesCss.Icon}/>
        </Link>
    );
};

