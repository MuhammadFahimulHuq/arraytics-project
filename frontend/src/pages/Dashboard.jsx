import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import styles from '../styles/dashboard/page.module.scss'
import {AiFillDelete ,AiTwotoneEdit} from "react-icons/ai";
import axios from '../api';
const Dashboard = () => {
  const [tableData,SetTableData] = useState([])
  

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


  return (
    <Layout>
        <div className={styles.container}>
          <h1>Dashboard</h1>
        
          <table>
        <thead>
        <tr>
              <th>No</th>
              <th>Item</th>
              <th>Action</th>
            </tr>
        </thead>
          <tbody>
         
        {tableData.map((item,index) => (
 <tr key={item._id}>
 <td>{index+1}</td>
        <td>{item.name}</td>
        <td><AiFillDelete />
      <AiTwotoneEdit />  
      </td>
      </tr>
        )
        )}
       
     
          </tbody>
         
          </table>
      </div>
    </Layout>
   
  )
}

export default Dashboard