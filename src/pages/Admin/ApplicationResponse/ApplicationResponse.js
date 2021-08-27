import React, { useEffect, useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  CustomButton,
  CustomTextarea,
} from "../../../components/CustomFormElements/CustomFormElements";
import Loading from "../../../components/Loading/Loading";
import UserForm from "../../../components/UserForm/UserForm";
import { useFormContext } from "../../../context/FormContext";
import { useAuthContext } from "../../../context/AuthContext";
import My404 from "../../My404/My404";
import AdminHeader from "../../../components/Header/AdminHeader";
import styles from "./ApplicationResponse.module.css";

const ApplicationResponse = ({ match, history }) => {
  //Dynamic Router
  const {
    params: { applicationNo },
  } = match;

  // Loading Data
  const [loader, setLoader] = useState(true);

  // Get data from context
  const { isLoading, getForm, formData, sendResponse } = useFormContext();

  // Admin Auth from context
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    async function fetch() {
      await getForm(applicationNo);
      setLoader(false);
    }
    fetch();
  }, [applicationNo]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await sendResponse(formData[0].id, data.response);
    reset();
    history.push({
      pathname: "/admin/basvuru-listesi",
    });
  };

  if (loader) {
    return <Loading />;
  }

  // If application No is not valid return 404 page.
  if (!formData.length) {
    return <My404 />;
  }
  // Check if there is current user logged in. Else return back admin panel.
  if (!isLoggedIn) {
    return <Redirect to="/admin" />;
  }

  return (
    <>
      <AdminHeader />
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <UserForm data={formData[0]}>
          <CustomTextarea
            register={register}
            name="response"
            placeholder="Başvuruyu Cevaplayınız"
            label="Başvuru Cevap"
            errors={errors}
          />
          <CustomButton isLoading={isLoading}>
            {!isLoading && "Cevapla"}
          </CustomButton>
        </UserForm>
      </form>
    </>
  );
};

export default withRouter(ApplicationResponse);
