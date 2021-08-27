import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const AdminHeader = ({ children }) => {
  return (
    <Header>
      {children}
      <Link to="/admin/basvuru-listesi">Başvuru Listesi</Link>
    </Header>
  );
};

export default AdminHeader;
