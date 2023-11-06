import axios from "../api";
import { toast } from "react-toastify";
const useUpdateItem = () => {
  const updateItem = async (
    token,
    axiosConfig,
    handleModal,
    handleError,
    itemId,
    updatedName
  ) => {
    if (token) {
      try {
        await axios.put(
          `/api/item/${itemId}`,
          { name: updatedName },
          axiosConfig
        );
        if (response.status === 200) {
          handleModal();
          handleError("");
          toast.success("Item edited successfully", {
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
  return updateItem;
};

export default useUpdateItem;
