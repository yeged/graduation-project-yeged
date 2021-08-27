import React, { useEffect, useMemo, useState } from "react";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "../../../hooks/useYupvalidationResolver";
import Header from "../../../components/Header/Header";
import {
  CustomButton,
  CustomInput,
} from "../../../components/CustomFormElements/CustomFormElements";
import { useAuthContext } from "../../../context/AuthContext";
import styles from "./Login.module.css";

const Login = ({ history }) => {
  // Yup admin inputs required validations
  const validationSchema = useMemo(
    () =>
      yup.object({
        userId: yup.string().required("Kullanıcı adı giriniz"),
        userPassword: yup.string().required("Şifre giriniz"),
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

  const [err, setErr] = useState("");

  // Admin auth context
  const { isLoading, setIsLoading, login } = useAuthContext();

  // prevent go to prev page
  useEffect(() => {
    window.addEventListener("popstate", () => {
      history.go(1);
    });
    return () => {
      window.removeEventListener("popstate", () => {
        history.go(1);
      });
    };
  }, []);

  const onSubmit = async (data) => {
    try {
      await login(data.userId, data.userPassword);
      reset();
      history.push({
        pathname: "/admin/basvuru-listesi",
      });
    } catch (error) {
      console.log("error message", error.code);
      reset();
      setErr("Yanlış Kullanıcı adı veya şifre");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <h1>Admin Giriş</h1>
        <CustomInput
          register={register}
          name="userId"
          placeholder="Kullanıcı Adı"
          label="Kullanıcı Adı"
          errors={errors}
        />
        <CustomInput
          register={register}
          name="userPassword"
          type="password"
          placeholder="Şifre"
          label="Şifre"
          errors={errors}
        />
        {err && <span role="alert">{err}</span>}
        <CustomButton isLoading={isLoading}>
          {!isLoading && "Giriş Yap"}
        </CustomButton>
      </form>
    </div>
  );
};

export default withRouter(Login);
