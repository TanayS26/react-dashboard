import axios from "axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const EditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProductData();
  }, []);

  let getProductData = async () => {
    try {
      const user = await axios.get(
        `http://localhost:8000/products/${params.id}`
      );
      myFormik.setValues(user.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const myFormik = useFormik({
    initialValues: {
      name: "",
      price: "",
      desc: "",
      rating: "",
    },

    // validate: (values) => {
    //   // let errors = {}; //Validating the form once the error returns empty else onsubmit won't work
    //   // if (!values.username) {
    //   //     errors.username = "Please enter username";
    //   // } else if (values.username.length < 5) {
    //   //     errors.username = "Name shouldn't be less than 3 letters";
    //   // } else if (values.username.length > 25) {
    //   //     errors.username = "Name shouldn't be more than 20 letters";
    //   // }
    //   // if (!values.email) {
    //   //   errors.email = "Please enter email";
    //   // } else if (
    //   //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    //   // ) {
    //   //   errors.email = "Invalid email address";
    //   // }
    //   // if (!values.city) {
    //   //   errors.city = "Please select any one city";
    //   // }
    //   // if (!values.state) {
    //   //   errors.state = "Please select any one state";
    //   // }
    //   // if (!values.country) {
    //   //   errors.country = "Please select any one state";
    //   // }
    //   // return errors;
    // },

    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await axios.put(`http://localhost:8000/products/${params.id}`, values);
        toast.success(`Product with id ${params.id} updated successfully`, {
          duration: 2000,
        });
        setIsLoading(false);
        setTimeout(() => {
          navigate("/layout/product/list");
        }, 2000);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <div className="container">
        <h3>UserEdit - Id : {params.id} </h3>

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
                    myFormik.errors.username ? "is-invalid" : ""
                  } `}
                />
                <span style={{ color: "red" }}>{myFormik.errors.username}</span>
              </div>

              <div className="col-lg-6">
                <label>Price</label>
                <input
                  name="price"
                  value={myFormik.values.price}
                  onChange={myFormik.handleChange}
                  type={"number"}
                  className={`form-control ${
                    myFormik.errors.price ? "is-invalid" : ""
                  } `}
                />
                <span style={{ color: "red" }}>{myFormik.errors.price}</span>
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
                  type={"number"}
                  className={`form-control ${
                    myFormik.errors.rating ? "is-invalid" : ""
                  } `}
                />
                <span style={{ color: "red" }}>{myFormik.errors.rating}</span>
              </div>

              <div className="col-lg-4 mt-3">
                <input
                  disabled={isLoading}
                  type="submit"
                  value={isLoading ? "Updating..." : "Update"}
                  className=" btn btn-primary"
                />
              </div>
            </div>
          </form>
          {/* {JSON.stringify(myFormik.values)} */}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default EditProduct;
