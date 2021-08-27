import React from "react";
import {
  ReadOnlyInput,
  ReadOnlyTextArea,
} from "../CustomFormElements/CustomFormElements";
import styles from "./UserForm.module.css";

const UserForm = ({ data, children }) => {
  return (
    <div className={styles.container}>
      <h1>Başvuru Numarası : {data.applicationNo}</h1>
      <h2>
        <span className={data.isClosed ? styles.open : styles.closed}>
          {" "}
          Başvuru Durumu :{" "}
          {data.isClosed
            ? `Başvuru Çözüldü - ${data.respondAt
                .toDate()
                .toLocaleDateString()}`
            : "Başvuru Çözülmedi"}
        </span>
      </h2>
      <ReadOnlyInput
        name="firstName"
        label="Ad"
        defaultValue={data.firstName}
      />
      <ReadOnlyInput
        name="lastName"
        label="Soyad"
        defaultValue={data.lastName}
      />
      <ReadOnlyTextArea
        name="address"
        label="Adres"
        defaultValue={data.address}
      />
      <ReadOnlyInput
        name="age"
        label="Doğum Tarihi"
        defaultValue={data.age && data.age.toDate().toLocaleDateString()}
      />
      <ReadOnlyInput name="tcNo" label="TC NO" defaultValue={data.tcNo} />
      <ReadOnlyTextArea
        name="application"
        label="Başvuru Nedeni"
        defaultValue={data.application}
      />
      {data.file && (
        <div className={styles.fileContainer}>
          <a href={data.file} rel="noreferrer" target="_blank">
            Dosya
          </a>
        </div>
      )}
      {data.isClosed && (
        <ReadOnlyTextArea
          name="response"
          label="Başvuru Cevap"
          defaultValue={data.response}
        />
      )}

      {children}
    </div>
  );
};

export default UserForm;
