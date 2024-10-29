import React from "react";
import { Link } from "react-router-dom";
import SidebarCSS from "./Sidebar.module.css";
import { FaHome, FaUser, FaUserPlus, FaFileInvoice, FaCalendarAlt, FaChartLine, FaSignOutAlt } from "react-icons/fa";

export const Sidebar = () => {
  return (
    <div className={SidebarCSS.sidebar}>
      <div className={SidebarCSS.leftSide}>
      <div className={SidebarCSS.logo}>
        <div className={SidebarCSS.logoSquare}></div>
        <span className={SidebarCSS.boldText}>SalarySync</span>
      </div>
      <ul className={SidebarCSS.menu}>
        <li>
          <Link to="/home">
            <FaHome className={SidebarCSS.icon} /> Home
          </Link>
        </li>
        <li>
          <Link to="/add-employee">
            <FaUserPlus className={SidebarCSS.icon} /> Add Employee
          </Link>
        </li>
        <li>
          <Link to="/payslip">
            <FaFileInvoice className={SidebarCSS.icon} /> Payslip
          </Link>
        </li>
        <li>
          <Link to="/leave">
            <FaCalendarAlt className={SidebarCSS.icon} /> Leave
          </Link>
        </li>
        <li>
          <Link to="/performance">
            <FaChartLine className={SidebarCSS.icon} /> Performance
          </Link>
        </li>
      </ul>
      <div className={SidebarCSS.logout}>
          <Link to="/logout">
            <FaSignOutAlt className={SidebarCSS.logoutIcon} /> Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;