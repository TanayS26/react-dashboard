import Card from "./Card";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getUsers();
    getProducts();
  }, []);

  let getUsers = async () => {
    try {
      const users = await axios.get("http://localhost:8000/users");
      setUser(users.data);
      console.log(users.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  let getProducts = async () => {
    try {
      const products = await axios.get("http://localhost:8000/products");
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
          <Card title="User Count" value={user.length} color="primary" icon="group" />
        
          <Card title="Total Products" value={product.length} color="success" icon="inventory" />
          {/*<Card title="Tasks" value="50%" color="info" />*/}
          {/*<Card title="Pending Requests" value="18" color="warning" />*/}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
