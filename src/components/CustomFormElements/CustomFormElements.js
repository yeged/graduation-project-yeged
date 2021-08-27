import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import styles from "./CustomFormElement.module.css";

//Custom Input
export const CustomInput = ({
  label,
  type,
  register,
  name,
  placeholder,
  maxLength,
  errors,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        data-testid={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p role="alert">{message}</p>}
      />
      {/* {errors[name] && <span role="alert">{errors[name].message}</span>} */}
    </div>
  );
};

CustomInput.defaultProps = {
  type: "text",
};

//Custom Text Area
export const CustomTextarea = ({
  label,
  register,
  name,
  placeholder,
  errors,
}) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <textarea
        id={name}
        data-testid={name}
        {...register(name)}
        placeholder={placeholder}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p role="alert">{message}</p>}
      />
      {/* {errors[name] && <span role="alert">{errors[name].message}</span>} */}
    </div>
  );
};

//Custom Button
export const CustomButton = ({ type, onClick, isLoading, children }) => {
  return (
    <button
      isLoading={isLoading}
      onClick={onClick}
      className={`${styles.btn}  ${isLoading && styles.buttonLoader}`}
      type={type}
    >
      {children}
    </button>
  );
};

CustomButton.defaultProps = {
  type: "submit",
  isLoading: false,
};

// Custom Read Only input
export const ReadOnlyInput = ({ label, name, defaultValue }) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        data-testid={name}
        defaultValue={defaultValue}
        readOnly
      />
    </div>
  );
};

// Custom Read Only Textarea
export const ReadOnlyTextArea = ({ label, name, defaultValue }) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        data-testid={name}
        defaultValue={defaultValue}
        readOnly
      />
    </div>
  );
};
