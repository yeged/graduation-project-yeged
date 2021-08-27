import React, { useMemo } from "react";
import { withRouter } from "react-router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "../../../hooks/useYupvalidationResolver";
import {
  CustomButton,
  CustomInput,
} from "../../../components/CustomFormElements/CustomFormElements";
import styles from "./ApplicationInquiry.module.css";
import FormHeader from "../../../components/Header/FormHeader";

const ApplicationInquiry = ({ history }) => {
  // Inquiry input Validation Schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        applicationNo: yup
          .string()
          .test("len", "5 Digits İçermelidir.", (val) => val.length === 5)
          .matches(/^[0-9-aA-zZ-wığüşöçĞÜŞÖÇİ]+$/, "Geçersiz Kod."),
      }),
    []
  );

  const resolver = useYupValidationResolver(validationSchema);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver });

  const onSubmit = (data) => {
    history.push({
      pathname: `/basvuru/${data.applicationNo}`,
    });
  };

  return (
    <div>
      <FormHeader />
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          className={styles.input}
          label="Başvuru Numarası"
          register={register}
          name="applicationNo"
          errors={errors}
          maxLength={5}
          placeholder="Başvuru No"
        />
        <CustomButton>Sorgula</CustomButton>
      </form>
    </div>
  );
};

export default withRouter(ApplicationInquiry);
