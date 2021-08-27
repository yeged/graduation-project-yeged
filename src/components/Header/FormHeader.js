import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const FormHeader = () => {
  return (
    <Header>
      <Link to="/basvuru-sorgula">Başvuru Sorgula</Link>
      <Link to="/basvuru-olustur">Başvuru Formu</Link>
    </Header>
  );
};

export default FormHeader;
