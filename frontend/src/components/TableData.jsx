import React from "react";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import styles from "../styles/dashboard/page.module.scss";
const TableData = ({ data, onEditItem, onDeleteItem }) => {
  return (
    <>
      {data.map((item, index) => (
        <tr key={item._id}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td className={styles.actionContent}>
            <button
              className={styles.actionButton + " " + styles.editButton}
              onClick={() => onEditItem(item)}
            >
              {" "}
              <AiTwotoneEdit />
            </button>
            <button
              className={styles.actionButton + " " + styles.deleteButton}
              onClick={() => onDeleteItem(item)}
            >
              {" "}
              <AiFillDelete />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableData;
