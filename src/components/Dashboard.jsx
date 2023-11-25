import Card from "./Card";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
const Dashboard = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, [])

  let getUsers = async () => {
    try {
      const users = await axios.get("http://localhost:8000/users");
      // console.log("users ", users.data.length);
      setUser(users.data)
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid">
              <Outlet></Outlet>
            </div>
            <div className="container">
              <div className="row">
                <Card title="User Count" value={user.length} color="primary" />
                <Card
                  title="Earnings(Annual)"
                  value="$215,000"
                  color="success"
                />
                <Card title="Tasks" value="50%" color="info" />
                <Card title="Pending Requests" value="18" color="warning" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
