import axios from "axios";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const UserListing = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  let getUsers = async () => {
    try {
      const users = await axios.get("http://localhost:8000/users");
      console.log("users ", users);
      setUserData(users.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure do you want to delete the data?"
      );
      if (confirmDelete) {
        await axios.delete(`http://localhost:8000/users/${id}`);
        getUsers();
      }
    } catch (error) {
      console.log(error);
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
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Users</h1>
                <Link
                  to="/user/create"
                  className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                >
                  {/*<FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />*/}
                  Create User
                </Link>
              </div>
              {/* <!-- DataTables --> */}
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    DataTables
                  </h6>
                </div>
                <div className="card-body">
                  {isLoading ? (
                    <img src="https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif" />
                  ) : (
                    <div className="table-responsive">
                      <table
                        className="table table-bordered"
                        id="dataTable"
                        width="100%"
                        cellSpacing="0"
                      >
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Country</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Country</th>
                            <th>Action</th>
                          </tr>
                        </tfoot>
                        <tbody>
                          {userData.map((user) => {
                            return (
                              <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.number}</td>
                                <td>{user.city}</td>
                                <td>{user.state}</td>
                                <td>{user.country}</td>
                                <th>
                                  <Link
                                    to={`/portal/user-view/${user.id}`}
                                    className="btn btn-primary btn-sm mr-1"
                                  >
                                    View
                                  </Link>
                                  <Link
                                    to={`/user/edit/${user.id}`}
                                    style={{
                                      fontSize: "30px",
                                      verticalAlign: "middle",
                                      cursor: "pointer",
                                      textDecoration: "none"
                                    }}
                                    className="material-symbols-outlined"
                                  >
                                   
                                      edit
                                  </Link>
                                  <span
                                    onClick={() => handleDelete(user.id)}
                                    className="material-symbols-outlined"
                                    style={{
                                      fontSize: "30px",
                                      verticalAlign: "middle",
                                      cursor: "pointer",
                                    }}
                                  >
                                    delete
                                  </span>
                                </th>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserListing;
