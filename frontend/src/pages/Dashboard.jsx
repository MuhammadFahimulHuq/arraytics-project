import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import styles from '../styles/dashboard/page.module.scss'
import axios from '../api';
import TableData from '../components/tableData';
import { AiOutlineDownload, AiOutlinePlus } from 'react-icons/ai';
import ItemModal from '../components/ItemModal';
import { ToastContainer, toast } from 'react-toastify';


const Dashboard = () => {
  const [tableData,SetTableData] = useState([])
  const [modalIsOpen, SetModalIsOpen] = useState(false);
  const [error,SetError] = useState('')
  const [deleteItemData, SetDeleteItemData] = useState(null)
  const [editItemData, setEditItemData] = useState(null);
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      const axiosConfig = {
        headers: {  // It should be 'headers' instead of 'header'
          Authorization: `Bearer ${token}`,
        },
      };
      const syncTableData = async () =>{
        const response = await axios.get('/api/item',axiosConfig)
        try{
          if(response.status == 200){
            SetTableData(response.data)
          }
        }catch(err){
          console.log(err)
        }
      }
      syncTableData()
    }
   
  },[])

const handleModal = () =>{
  SetModalIsOpen(!modalIsOpen);
}

const handleAddItem = async (itemName) => {

  const formData = {
    name: itemName
  }
  // console.log(formData);
  const token = localStorage.getItem('token');
  if(token){
    const axiosConfig = {
      headers: {  // It should be 'headers' instead of 'header'
        Authorization: `Bearer ${token}`,
      },
    };
  
  try{
    const response = await axios.post('/api/item',formData,axiosConfig)

    SetTableData([...tableData,response.data])
    SetModalIsOpen(false)
    SetError('')
    toast.success('Item added successfully', {
      position: "top-right", // You can customize the position
      autoClose: 3000, // Time in milliseconds that the toast will be shown
      hideProgressBar: false, // You can customize this option
      closeOnClick: true, // Close the toast when clicked
      pauseOnHover: true, // Pause the toast on hover
      draggable: true, // Make the toast draggable
    });
  }catch(err){
    
    SetError(err.response.data.message)
  }
};
}


const handleEditItem = (item) => {

  setEditItemData(item);
  handleModal(); // Open the modal
  };


  const updateItem = async (itemId, updatedName) => {
    const token = localStorage.getItem('token');
    if (token) {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.put(`/api/item/${itemId}`, { name: updatedName }, axiosConfig);
        if (response.status === 200) {
        
          const updatedTableData = [...tableData]; // Create a copy of the current table data
          const editedIndex = updatedTableData.findIndex((item) => item._id === itemId);

          if (editedIndex !== -1) {
            updatedTableData[editedIndex].name = updatedName;
            SetTableData(updatedTableData);
            SetModalIsOpen(false)
            SetError('')
            toast.success('Item edited successfully', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        }
      }
       catch (err) {
        // Handle errors as needed
        SetError(err.response.data.message)
      }
    }
  }

  const handleDeleteItem = (item) =>{
  
    SetDeleteItemData(item)
   
    deleteItem(deleteItemData._id)
  }


  const deleteItem = async(itemId) =>{
    const token = localStorage.getItem('token');
    if (token) {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.delete(`/api/item/${itemId}`, axiosConfig);
        if (response.status === 200) {
        
          const updatedTableData = [...tableData]; // Create a copy of the current table data
          const deletedIndex = updatedTableData.findIndex((item) => item._id === itemId);

          if (deletedIndex !== -1) {
            updatedTableData.splice(deletedIndex, 1); 
            SetTableData(updatedTableData);
            SetModalIsOpen(false)
            SetError('')
            toast.success('Item deleted successfully', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        }
      }
       catch (err) {
        // Handle errors as needed
        console.log(err)
        SetError(err.response.data.message)
      }
    }
  }
  return (
    <Layout>
        <div className={styles.container}>
          <div className={styles.titleContainer}>
          <h1>Dashboard</h1>
          <input type="text" placeholder='Search' className={styles.searchTools}/>
          <div className={styles.toolsContainer}>
              <button onClick={handleModal} ><AiOutlinePlus />Add Items</button>
              <button ><AiOutlineDownload />Download CSV</button>
            
          </div>
          </div>
          <table>
        <thead>
        <tr>
              <th>#</th>
              <th>Item</th>
              <th>Action</th>
            </tr>
        </thead>
          <tbody>
          <TableData data={tableData} onEditItem={handleEditItem} onDeleteItem={handleDeleteItem}/>
          </tbody>
         
          </table>
      </div>
      <ItemModal isOpen={modalIsOpen} onClose={handleModal} onAddItem={handleAddItem}  editItemData={editItemData}   updateItem={updateItem} error={error}/>
      <ToastContainer />
    </Layout>
   
  )
}

export default Dashboard