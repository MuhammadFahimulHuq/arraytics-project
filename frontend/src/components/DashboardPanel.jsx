import React from "react";
import { AiOutlineDownload, AiOutlinePlus } from "react-icons/ai";
import styles from "../styles/dashboard/page.module.scss";
const DashboardPanel = ({ handleSearch, search, handleModal }) => {
  return (
    <>
      <div className={styles.titleContainer}>
        <h1>Dashboard</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          value={search}
          name="search"
          className={styles.searchTools}
        />
      </div>
      <div className={styles.toolsContainer}>
        <button onClick={handleModal}>
          <AiOutlinePlus />
          Add Items
        </button>
        <button>
          <AiOutlineDownload />
          Download CSV
        </button>
      </div>
    </>
  );
};

export default DashboardPanel;
