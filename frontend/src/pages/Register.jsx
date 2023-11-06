import React, { useState } from "react";
import Layout from "../layout/Layout";
import styles from "../styles/register/page.module.scss";
import { Link } from "react-router-dom";
import useRegisterUser from "../hooks/useRegisterUser";
const Register = () => {
  const register = useRegisterUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const { name, email, password, password2 } = formData;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleError = (message) => {
    setError(message);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    register(name, email, password, password2, handleError);
  };
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Sign up to your account</h1>
        <form onSubmit={handleSubmit}>
          {error == "" ? (
            ""
          ) : (
            <div className={styles.errorTag}>
              <p>{error}</p>
            </div>
          )}
          <div className={styles.content}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="John mark"
              name="name"
              value={name}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="email@yourcompany.com"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="*******"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <label htmlFor="Cpassword">Confirm password</label>
            <input
              type="password"
              placeholder="*******"
              name="password2"
              value={password2}
              onChange={handleChange}
            />
            <button type="submit">Sign In</button>
          </div>
        </form>
        <p>
          Already Sign up ?{" "}
          <Link to="/register">
            <span>Sign In Now</span>
          </Link>{" "}
        </p>
      </div>
    </Layout>
  );
};

export default Register;
