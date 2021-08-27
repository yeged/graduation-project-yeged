import React, { useMemo } from "react";
import { withRouter } from "react-router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "../../../hooks/useYupvalidationResolver";
import {
  CustomButton,
  CustomInput,
  CustomTextarea,
} from "../../../components/CustomFormElements/CustomFormElements";
import FormHeader from "../../../components/Header/FormHeader";
import generateAppNo from "../../../utils/codeGenerator";
import { useFormContext } from "../../../context/FormContext";
import styles from "./ApplicationForm.module.css";

// File input validation constants
const FILE_SIZE = 5000000; // 5 MB
const SUPPORTED_FORMATS = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

function ApplicationForm({ login, history }) {
  // Yup Validation Schema
  const validationSchema = useMemo(
    () =>
      yup.object({
        firstName: yup
          .string()
          .min(2, "Adınız Çok Kısa.")
          .max(20, "Adınız Çok Uzun.")
          .matches(/^[aA-zZ-wığüşöçĞÜŞÖÇİ\s]+$/, "Geçersiz Ad.")
          .required("Lütfen Adınızı Giriniz."),
        lastName: yup
          .string()
          .min(2, "Soyadınız Çok Kısa.")
          .max(20, "Soyadınız Çok Uzun.")
          .matches(/^[aA-zZ-wığüşöçĞÜŞÖÇİ\s]+$/, "Geçersiz Soy Ad.")
          .required("Lütfen Soyadınızı Giriniz."),
        // Gerçek TC no girilmek zorunda kalınmasın diye Validation yapılmadı.(10 ve 11.rakam algoritması)
        tcNo: yup
          .string()
          .test("len", "Geçersiz Tc No - Çok Kısa", (val) => val.length === 11)
          .matches(/^[0-9]+$/, "Geçersiz Tc No - Rakam Giriniz")
          .test("len", "Geçersiz TC No", (val) => val.substr(0, 1) != 0)
          .required("Lütfen TC No Giriniz."),
        age: yup
          .date()
          .min("1930-12-31T00:00:00.000Z", "Geçerli Bir Doğum Tarihi Giriniz")
          .max(new Date(), "Geçerli Bir Doğum Tarihi Giriniz")
          .nullable()
          .transform((curr, orig) => (orig === "" ? null : curr))
          .required("Doğum Tarihi Giriniz."),
        address: yup
          .string()
          .min(5, "Adres Çok Kısa.")
          .max(150, "Adres Çok Uzun.")
          .required("Lütfen Adres Giriniz."),
        application: yup
          .string()
          .min(5, "Başvuru Nedeni Çok Kısa.")
          .max(200, "Başvuru Nedeni Çok Uzun.")
          .required("Lütfen Başvuru Nedeni Yazınız."),
        file: yup
          .mixed()
          .test(
            "fileSize",
            "File too large",
            (value) =>
              !value.length || (value.length && value[0].size <= FILE_SIZE)
          )
          .test(
            "fileFormat",
            "Unsupported file type",
            (value) =>
              !value.length ||
              (value.length && SUPPORTED_FORMATS.includes(value[0].type))
          ),
      }),
    []
  );

  const resolver = useYupValidationResolver(validationSchema);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ resolver });

  // Apply Form with context
  const { isLoading, sendTicket } = useFormContext();

  // Generate random application number
  const applicationNo = generateAppNo();

  const onSubmit = async (data) => {
    await sendTicket(
      data.firstName,
      data.lastName,
      data.age,
      data.tcNo,
      data.address,
      data.application,
      applicationNo,
      false,
      data.file[0]
    );
    // await login(
    //   data.firstName,
    //   data.lastName,
    //   data.tcNo,
    //   data.age.toString(),
    //   data.address,
    //   data.application
    // );
    reset();
    history.push({
      pathname: "/basvuru-basarili",
      state: { applicationNo },
    });
  };

  console.log(errors);

  return (
    <>
      <FormHeader />
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputRow}>
          <CustomInput
            register={register}
            name="firstName"
            placeholder="Ad"
            label="Ad"
            errors={errors}
          />
        </div>

        <div className={styles.inputRow}>
          <CustomInput
            register={register}
            name="lastName"
            placeholder="Soyad"
            label="Soyad"
            errors={errors}
          />
        </div>

        <div className={styles.textAreaRow}>
          <CustomTextarea
            register={register}
            name="address"
            placeholder="Adres"
            label="Adres"
            errors={errors}
          />
        </div>

        <div className={styles.inputRow}>
          {" "}
          <CustomInput
            register={register}
            type="date"
            name="age"
            placeholder="Doğum Tarihi"
            label="Doğum Tarihi"
            errors={errors}
          />
        </div>

        <div className={styles.inputRow}>
          <CustomInput
            register={register}
            name="tcNo"
            placeholder="TC No"
            label="TC No"
            maxLength={11}
            errors={errors}
          />
        </div>

        <div className={styles.textAreaRow}>
          <CustomTextarea
            register={register}
            name="application"
            placeholder="Başvuru Nedeni"
            label="Başvuru Nedeni"
            errors={errors}
          />
        </div>
        <div className={styles.textAreaRow}>
          <CustomInput
            register={register}
            name="file"
            label="Dosya"
            type="file"
            errors={errors}
          />
        </div>

        <CustomButton isLoading={isLoading}>
          {!isLoading && "Gönder"}
        </CustomButton>
      </form>
    </>
  );
}
export default withRouter(ApplicationForm);
