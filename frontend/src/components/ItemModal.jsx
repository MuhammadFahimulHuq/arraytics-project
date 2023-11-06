import React, { useState, useEffect } from "react";
import styles from "../styles/components/itemModal.module.scss";
const ItemModal = ({
  isOpen,
  onClose,
  onAddItem,
  editItemData,
  error,
  updateItem,
}) => {
  const [itemName, setItemName] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    if (editItemData) {
      setItemName(editItemData.name);
      setIsEditMode(true);
    } else {
      setItemName("");
      setIsEditMode(false);
    }
  }, [editItemData]);

  const handleAddItem = () => {
    if (isEditMode) {
      // Handle edit item logic here
      updateItem(editItemData._id, itemName);
    } else {
      // Handle add item logic here
      onAddItem(itemName);
    }
    setItemName("");
  };
  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ""}`}>
      <div className={styles.modalContent}>
        <h2>{isEditMode ? "Update Item" : "Add Item"}</h2>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <p className={styles.errorText}>{error}</p>
        <button onClick={handleAddItem} className={styles.addButton}>
          {isEditMode ? "Update" : "Add"}
        </button>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
