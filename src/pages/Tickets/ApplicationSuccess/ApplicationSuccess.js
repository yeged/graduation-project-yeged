import React from "react";
import { Redirect } from "react-router-dom";
import { Illustrations } from "../../../assets";
import styles from "./ApplicationSuccess.module.css";
import { withRouter } from "react-router";
import FormHeader from "../../../components/Header/FormHeader";

const ApplicationSuccess = ({ location }) => {
  // check if form applied and generated appNo
  if (!location.state) {
    return <Redirect to="/404" />;
  }

  return (
    <>
      <FormHeader />
      <div className={styles.container}>
        <div className={styles.row}>
          <img
            data-testid="imageSuccess"
            className={styles.image}
            src={Illustrations.Success}
            alt="Application Successfull"
          />
          <div className={styles.message}>
            <h1>Başvurunuz İçin Teşekkürler</h1>
            <div>
              <h2>Başvuru No</h2>
              <p className={styles.box}>{location.state.applicationNo}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ApplicationSuccess);
