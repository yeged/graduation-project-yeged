import React, { useEffect } from "react";
import { withRouter } from "react-router";
import FormHeader from "../../../components/Header/FormHeader";
import Loading from "../../../components/Loading/Loading";
import UserForm from "../../../components/UserForm/UserForm";
import { useFormContext } from "../../../context/FormContext";
import My404 from "../../My404/My404";

const ApplicationInfo = ({ match }) => {
  // Dynamic Router
  const {
    params: { applicationNo },
  } = match;

  // Get users form from Context
  const { isLoading, getForm, formData } = useFormContext();

  useEffect(() => {
    async function fetch() {
      await getForm(applicationNo);
    }
    fetch();
  }, [applicationNo]);

  if (isLoading) {
    return <Loading />;
  }
  // If application No is not valid return 404 page.
  if (!formData.length) {
    return <My404 />;
  }

  return (
    <>
      <FormHeader />
      <UserForm data={formData[0]}></UserForm>
    </>
  );
};

export default withRouter(ApplicationInfo);
