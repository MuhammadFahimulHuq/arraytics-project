const useTokenAndAxiosConfig = () => {
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return { token, axiosConfig };
};

export default useTokenAndAxiosConfig;
