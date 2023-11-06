import { useNavigate } from "react-router-dom";
import axios from "../api";

const useLoginUser = () => {
  const navigate = useNavigate();
  const login = async (email, password, handleError) => {
    const postformData = {
      email,
      password,
    };
    try {
      const res = await axios.post("/api/user/login", postformData);

      // console.log(data)
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        console.log(res.data.token);
        handleError("");
        navigate("/dashboard");
      }
    } catch (err) {
      handleError(err.response.data.message);
    }
  };
  return login;
};

export default useLoginUser;
