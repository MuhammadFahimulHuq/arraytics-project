import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import styles from "../styles/dashboard/page.module.scss";
import TableData from "../components/tableData";
import ItemModal from "../components/ItemModal";
import { ToastContainer } from "react-toastify";
import useTokenAndAxiosConfig from "../hooks/useTokenAndAxiosConfig";
import useSyncTable from "../hooks/useSyncTable";
import useAddItem from "../hooks/useAddItem";
import useUpdateItem from "../hooks/useUpdateItem";
import useDeleteItem from "../hooks/useDeleteItem";
import { useSearch } from "../hooks/useSearch";
import DashboardPanel from "../components/DashboardPanel";

const Dashboard = () => {
  const [modalIsOpen, SetModalIsOpen] = useState(false);
  const [error, SetError] = useState("");
  const { token, axiosConfig } = useTokenAndAxiosConfig();
  const [editItemData, setEditItemData] = useState(null);
  const { tableData } = useSyncTable(token, axiosConfig);
  const updateItem = useUpdateItem();
  const addItem = useAddItem();
  const deleteItem = useDeleteItem();
  const { search, handleSearch } = useSearch("");
  useEffect(() => {}, [tableData]);

  const handleModal = () => {
    SetModalIsOpen(!modalIsOpen);
  };

  const handleError = (message) => {
    SetError(message);
  };

  const handleAddItem = (name) => {
    addItem(name, token, axiosConfig, handleModal, handleError);
  };
  const handleEditItem = (item) => {
    setEditItemData(item);
    handleModal();
  };

  const handleUpdateItem = (itemId, updatedName) => {
    updateItem(
      token,
      axiosConfig,
      handleModal,
      handleError,
      itemId,
      updatedName
    );
  };

  const handleDeleteItem = (item) => {
    deleteItem(token, axiosConfig, handleModal, handleError, item._id);
  };

  const filteredItems = tableData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Layout>
      <div className={styles.container}>
        <DashboardPanel
          handleSearch={handleSearch}
          search={search}
          handleModal={handleModal}
        />
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <TableData
              data={filteredItems == null ? tableData : filteredItems}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
            />
          </tbody>
        </table>
      </div>
      <ItemModal
        isOpen={modalIsOpen}
        onClose={handleModal}
        onAddItem={handleAddItem}
        editItemData={editItemData}
        updateItem={handleUpdateItem}
        error={error}
      />
      <ToastContainer />
    </Layout>
  );
};

export default Dashboard;
