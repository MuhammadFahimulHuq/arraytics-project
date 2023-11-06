import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/layout/layout.module.scss";
import axios from "../api";
import {
  AiFillCaretDown,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [Authname, setAuthName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const axiosConfig = {
        headers: {
          // It should be 'headers' instead of 'header'
          Authorization: `Bearer ${token}`,
        },
      };

      async function getUser() {
        try {
          const response = await axios.get("/api/user", axiosConfig);
          setAuthName(response.data.name); // You can access the response data using response.data
          setShowDropdown(true);
        } catch (error) {
          console.error(error);
        }
      }

      getUser();
    }
  }, [token]); // Empty dependency array means the effect runs once when the component mounts

  const handleDropDown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Perform the logout action, such as clearing the token from localStorage
    localStorage.removeItem("token");
    setAuthName("");
    setShowDropdown(false); // Hide the dropdown after logout
    navigate("/");
  };

  return (
    <div>
      <div className={styles.bg}>
        <div className={styles.container}>
          <header>
            <div>
              <img className={styles.logo} src="../images/logo.png" alt="" />
            </div>
            {Authname == "" ? (
              <div className={styles}>
                <Link to="/" className={styles.link}>
                  Login
                </Link>
                <Link to="/register" className={styles.link}>
                  Register
                </Link>
              </div>
            ) : (
              <div className={styles.nav} onClick={handleDropDown}>
                <AiOutlineUser />
                <span className={styles.dropButton}>{Authname}</span>
                <AiFillCaretDown />
                <div className={`${showDropdown ? styles.hide : styles.show}`}>
                  <div
                    className={`${styles.dropDownContainer} `}
                    onClick={handleLogout}
                  >
                    <AiOutlineLogout />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            )}
          </header>
        </div>
      </div>

      {children}

      <footer className={styles.footer}>
        <div>
          <p>
            An <span>arraytics</span> interview project @made by Muhammad
            Fahimul Huq
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
