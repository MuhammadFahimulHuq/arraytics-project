import { useState, useEffect } from "react";
import axios from "../api";

function useSyncTable(token, axiosConfig) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function syncTableData() {
      if (token) {
        try {
          const response = await axios.get("/api/item", axiosConfig);
          if (response.status === 200) {
            setTableData(response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }

    syncTableData();
  }, [token, axiosConfig]);

  return { tableData };
}

export default useSyncTable;
