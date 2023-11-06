import { useNavigate } from "react-router-dom";
import axios from "../api";

const useRegisterUser = () => {
  const navigate = useNavigate();
  const register = async (name, email, password, password2, handleError) => {
    if (password != password2) {
      handleError("Password do not matches");
      return;
    }
    const postformData = {
      name,
      email,
      password,
    };
    try {
      const res = await axios.post("/api/user", postformData);

      // console.log(data)
      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        handleError("");
        navigate("/dashboard");
      }
    } catch (err) {
      // setError(err)
      console.log(err.response.data.message);
      handleError(err.response.data.message);
    }
  };
  return register;
};

export default useRegisterUser;
