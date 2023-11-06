import axios from "../api";
import { toast } from "react-toastify";
const useAddItem = () => {
  const addItem = async (
    name,
    token,
    axiosConfig,
    handleModal,
    handleError
  ) => {
    const formData = {
      name: name,
    };

    if (token) {
      try {
        await axios.post("/api/item", formData, axiosConfig);
        handleModal();
        handleError("");
        toast.success("Item added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (err) {
        handleError(err.response.data.message);
      }
    }
  };

  return addItem;
};

export default useAddItem;
