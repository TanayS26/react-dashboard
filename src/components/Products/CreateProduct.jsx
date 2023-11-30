import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      name: "",
      price: "",
      desc: "",
      rating: "",
    },

    // validate: (values) => {
    //   let errors = {};

    //   if (!values.name) {
    //     errors.name = "Please enter the name of the product";
    //   } else if(values.name.length > 20) {
    //     errors.name = "Product name too long"
    //   } else if(values.name.length < 3) {
    //     errors.name = "Product name too short"
    //   }

    //   if(!values.price) {
    //     errors.price = "Please enter the price"
    //   } else if (values.price < 0) {
    //     errors.price = "Invalid price"
    //   } else if (values.price > 1000) {
    //     errors.price = "Price must be between 0 and 999"
    //   }
    // },

    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await axios.post("http://localhost:8000/products", values);
        navigate("/product/list");
      } catch (err) {
        setIsLoading(false);
        console.log(err.message);
      }
    },
  });

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
            {/**/}
            <div className="container">
              <form onSubmit={myFormik.handleSubmit}>
                <div className="row">

                  <div className="col-lg-6">
                    <label>Name</label>
                    <input
                      name="name"
                      value={myFormik.values.name}
                      onChange={myFormik.handleChange}
                      type={"text"}
                      className={`form-control ${
                        myFormik.errors.name ? "is-invalid" : ""
                      } `}
                    />
                    <span style={{ color: "red" }}>{myFormik.errors.name}</span>
                  </div>

                  <div className="col-lg-6">
                    <label>Price</label>
                    <input
                      name="price"
                      value={myFormik.values.price}
                      onChange={myFormik.handleChange}
                      type={"text"}
                      className={`form-control ${
                        myFormik.errors.price ? "is-invalid" : ""
                      } `}
                    />
                    <span style={{ color: "red" }}>
                      {myFormik.errors.price}
                    </span>
                  </div>

                  <div className="col-lg-6">
                    <label>Description</label>
                    <input
                      name="desc"
                      value={myFormik.values.desc}
                      onChange={myFormik.handleChange}
                      type={"text"}
                      className={`form-control ${
                        myFormik.errors.desc ? "is-invalid" : ""
                      } `}
                    />
                    <span style={{ color: "red" }}>{myFormik.errors.desc}</span>
                  </div>

                  <div className="col-lg-6">
                    <label>Rating</label>
                    <input
                      name="rating"
                      value={myFormik.values.rating}
                      onChange={myFormik.handleChange}
                      type={"text"}
                      className={`form-control ${
                        myFormik.errors.rating ? "is-invalid" : ""
                      } `}
                    />
                    <span style={{ color: "red" }}>
                      {myFormik.errors.rating}
                    </span>
                  </div>

                  <div className="col-lg-4 mt-3">
                    <input
                      disabled={isLoading}
                      type="submit"
                      value={isLoading ? "Submitting..." : "Create"}
                      className=" btn btn-primary"
                    />
                  </div>
                </div>
              </form>
              {/* {JSON.stringify(myFormik.values)} */}
            </div>
            {/**/}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
