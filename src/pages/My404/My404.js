import React from "react";
import { Illustrations } from "../../assets";
import styles from "./My404.module.css";
import FormHeader from "../../components/Header/FormHeader";

const My404 = () => {
  return (
    <div>
      <FormHeader />
      <img
        data-testid="image404"
        className={styles.image}
        src={Illustrations.NotFound}
        alt="404 Not Found"
      />
    </div>
  );
};

export default My404;
