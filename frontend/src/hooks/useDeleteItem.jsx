import axios from "../api";
import { toast } from "react-toastify";
const useDeleteItem = () => {
  const deleteItem = async (
    token,
    axiosConfig,
    handleModal,
    handleError,
    itemId
  ) => {
    if (token) {
      try {
        const response = await axios.delete(`/api/item/${itemId}`, axiosConfig);
        if (response.status === 200) {
          handleError("");
          toast.success("Item deleted successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (err) {
        // Handle errors as needed
        handleError(err.response.data.message);
      }
    }
  };
  return deleteItem;
};

export default useDeleteItem;
