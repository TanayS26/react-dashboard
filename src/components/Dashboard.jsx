import Card from "./Card";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getUsers();
    getProducts();
  }, []);

  let getUsers = async () => {
    try {
      const users = await axios.get("http://localhost:8000/users");
      // console.log("users ", users.data.length);
      setUser(users.data);
      console.log(users.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  let getProducts = async () => {
    try {
      const products = await axios.get("http://localhost:8000/products");
      // console.log("users ", users.data.length);
      setProduct(products.data);
      console.log(products.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(()=>{
  //  if(!localStorage.getItem('userId')) navigate('/')
  // },[])
  return (
    <>
      <div className="container">
        <div className="row">
          <Card title="User Count" value={user.length} color="primary" />
          <Card title="Total Products" value={product.length} color="success" />
          <Card title="Tasks" value="50%" color="info" />
          <Card title="Pending Requests" value="18" color="warning" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
