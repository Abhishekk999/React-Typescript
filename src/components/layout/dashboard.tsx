import React from "react";
import { Outlet } from "react-router-dom";
import "./layout.css";
import Header from "../section/header";

type TProps = {
  children?: React.ReactNode;
};
const DashboardLayout = (props: TProps) => {
  return (
    <>
      <Header />
      <div className="dashboard">
        <Outlet />
      </div>
    </>
  );
};
export default DashboardLayout;
