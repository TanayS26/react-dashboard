import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Dashboard from "./components/Dashboard.jsx"
import CreateUser from "./components/User/CreateUser.jsx";
import UserListing from "./components/User/UserListing.jsx";
import EditUser from "./components/User/EditUser.jsx";
import "./theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user/create" element={<CreateUser />} />
      <Route path="/user/list" element={<UserListing />} />
      <Route path="/user/edit/:id" element={<EditUser />} />
    </Routes>
  </BrowserRouter>
);
