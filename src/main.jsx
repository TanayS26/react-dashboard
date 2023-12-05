import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Dashboard from "./components/Dashboard.jsx";

import CreateUser from "./components/User/CreateUser.jsx";
import UserListing from "./components/User/UserListing.jsx";
import EditUser from "./components/User/EditUser.jsx";

import ProductListing from "./components/Products/ProductListing.jsx";
import CreateProduct from "./components/Products/CreateProduct.jsx";
import EditProduct from "./components/Products/EditProduct.jsx";
import "./theme.css";
import Layout from "./Layout.jsx";
import UserProfile from "./components/User/UserProfile.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="/layout" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="user/list" element={<UserListing />} />
        <Route path="user/create" element={<CreateUser />} />
        <Route path="user/edit/:id" element={<EditUser />} />
        <Route path="user/profile/:id" element={<UserProfile/>} />

        <Route path="product/list" element={<ProductListing />} />
        <Route path="product/create" element={<CreateProduct />} />
        <Route path="product/edit/:id" element={<EditProduct />} />
      </Route>

    </Routes>
  </BrowserRouter>
);

