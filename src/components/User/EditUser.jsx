import axios from "axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const EditUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  let getUserData = async () => {
    try {
      const user = await axios.get(`http://localhost:8000/users/${params.id}`);
      myFormik.setValues(user.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const myFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      number: "",
      city: "",
      state: "",
      country: "",
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
        await axios.put(`http://localhost:8000/users/${params.id}`, values);
        toast.success(`User with id ${params.id} updated successfully`, {
          duration: 2000
        })
        setIsLoading(false);
        setTimeout(() => {
          navigate("/layout/user/list");
        }, 2000)
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
                <label>Email</label>
                <input
                  name="email"
                  value={myFormik.values.email}
                  onChange={myFormik.handleChange}
                  type={"mail"}
                  className={`form-control ${
                    myFormik.errors.email ? "is-invalid" : ""
                  } `}
                />
                <span style={{ color: "red" }}>{myFormik.errors.email}</span>
              </div>

              <div className="col-lg-6">
                <label>Password</label>
                <input
                  name="password"
                  value={myFormik.values.password}
                  onChange={myFormik.handleChange}
                  type={"password"}
                  className={`form-control ${
                    myFormik.errors.password ? "is-invalid" : ""
                  } `}
                />
                <span style={{ color: "red" }}>{myFormik.errors.password}</span>
              </div>

              <div className="col-lg-6">
                <label>Number</label>
                <input
                  name="number"
                  value={myFormik.values.number}
                  onChange={myFormik.handleChange}
                  type={"number"}
                  className={`form-control ${
                    myFormik.errors.number ? "is-invalid" : ""
                  } `}
                />
                <span style={{ color: "red" }}>{myFormik.errors.number}</span>
              </div>

              <div className="col-lg-4">
                <label>City</label>
                <select
                  name="city"
                  value={myFormik.values.city}
                  onChange={myFormik.handleChange}
                  className={`form-control ${
                    myFormik.errors.city ? "is-invalid" : ""
                  } `}
                >
                  <option value="">----Select----</option>
                  <option value="CN">Chennai</option>
                  <option value="KN">Kochin</option>
                  <option value="MU">Mumbai</option>
                  <option value="SA">Seattle</option>
                  <option value="MI">Miami</option>
                  <option value="VB">Virginia Beach</option>
                </select>
                <span style={{ color: "red" }}>{myFormik.errors.city}</span>
              </div>

              <div className="col-lg-4">
                <label>State</label>
                <select
                  name="state"
                  value={myFormik.values.state}
                  onChange={myFormik.handleChange}
                  className={`form-control ${
                    myFormik.errors.state ? "is-invalid" : ""
                  } `}
                >
                  <option value="">----Select----</option>
                  <option value="TN">TamilNadu</option>
                  <option value="KL">Kerala</option>
                  <option value="MH">Maharashtra</option>
                  <option value="WA">Washington</option>
                  <option value="FL">Florida</option>
                  <option value="VA">Virginia</option>
                </select>
                <span style={{ color: "red" }}>{myFormik.errors.state}</span>
              </div>

              <div className="col-lg-4">
                <label>Country</label>
                <select
                  name="country"
                  value={myFormik.values.country}
                  onChange={myFormik.handleChange}
                  className={`form-control ${
                    myFormik.errors.country ? "is-invalid" : ""
                  } `}
                >
                  <option value="">----Select----</option>
                  <option value="IN">India</option>
                  <option value="US">USA</option>
                </select>
                <span style={{ color: "red" }}>{myFormik.errors.country}</span>
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

export default EditUser;
