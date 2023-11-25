import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* <!-- Sidebar - Brand --> */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href=""
        >
          <div className="sidebar-brand-icon rotate-n-15">
            {/* <FontAwesomeIcon icon={faFaceLaughWink} size={"2x"} />*/}
          </div>
          <div className="sidebar-brand-text mx-3">Welcome Back!</div>
        </a>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard">
            {/*<FontAwesomeIcon icon={faTachographDigital} style={{ marginRight: "0.5rem" }} />*/}
            <span
              className="material-symbols-outlined"
              style={{
                marginRight: "0.5rem",
                fontSize: "25px",
                verticalAlign: "middle",
              }}
            >
              grid_view
            </span>
            <span>Dashboard</span>
          </Link>
        </li>
        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Users --> */}
        <li className="nav-item active">
          <Link className="nav-link" to="/user/list">
            {/*<FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />*/}
            <span
              className="material-symbols-outlined"
              style={{
                marginRight: "0.5rem",
                fontSize: "25px",
                verticalAlign: "middle",
              }}
            >
              group
            </span>
            <span>Users</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
          <Link className="nav-link" to="">
            {/*<FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />*/}
            <span
              className="material-symbols-outlined"
              style={{
                marginRight: "0.5rem",
                fontSize: "25px",
                verticalAlign: "middle",
              }}
            >
              category
            </span>
            <span>Categories</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
          <Link className="nav-link" to="">
            {/*<FontAwesomeIcon icon={faUsers} style={{ marginRight: "0.5rem" }} />*/}
            <span
              className="material-symbols-outlined"
              style={{
                marginRight: "0.5rem",
                fontSize: "25px",
                verticalAlign: "middle",
              }}
            >
              inventory_2
            </span>
            <span>Products</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />
      </ul>
    </>
  );
};

export default Sidebar;
