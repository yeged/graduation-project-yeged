import React, { useEffect, useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { CustomButton } from "../../../components/CustomFormElements/CustomFormElements";
import Loading from "../../../components/Loading/Loading";
import FormsList from "../../../components/FormsList/FormsList";
import { useFormContext } from "../../../context/FormContext";
import { useAuthContext } from "../../../context/AuthContext";
import AdminHeader from "../../../components/Header/AdminHeader";
import styles from "./ApplicationList.module.css";

const ApplicationList = ({ history }) => {
  // Loading Data
  const [loader, setLoader] = useState(true);

  // Admin auth from context
  const { isLoading, logout, isLoggedIn } = useAuthContext();

  // Get data from context
  const {
    getOpenAndClosedForms,
    openFormsData,
    closedFormsData,
  } = useFormContext();

  useEffect(() => {
    async function fetch() {
      await getOpenAndClosedForms();
      setLoader(false);
    }
    fetch();
  }, []);

  const signout = async () => {
    try {
      await logout();
      history.push({
        pathname: "/admin",
      });
    } catch (error) {
      console.log("sign out error", error);
    }
  };

  if (loader) {
    return <Loading />;
  }
  // Check if there is current user logged in. Else return back admin panel.
  if (!isLoggedIn) {
    return <Redirect to="/admin" />;
  }

  return (
    <>
      <AdminHeader>
        <div className={styles.headerButton}>
          <CustomButton onClick={signout} isLoading={isLoading}>
            {!isLoading && "Çıkış"}
          </CustomButton>
        </div>
      </AdminHeader>
      <div className={styles.container}>
        <div className={styles.row}>
          <h1 className={styles.header}>Bekleyen Başvurular</h1>
          <FormsList data={openFormsData} />
        </div>
        <div className={styles.row}>
          <h1 className={styles.header}>Çözülen Başvurular</h1>
          <FormsList data={closedFormsData} />
        </div>
      </div>
    </>
  );
};

export default withRouter(ApplicationList);
