import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const CreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);


  const navigate = useNavigate();

  const getAllCountries = async () => {
    try {
      const countries = await axios.get("https://api.countrystatecity.in/v1/countries", {
        headers: {
          "X-CSCAPI-KEY":
              "dzZxYUdqTEhIamhrTUdmdDZJOUducnRFazhUWFl4ZzY5UU1LVmZnRQ==",
        }
      })
      setCountries(countries.data);
    } catch(err) {
      console.log(err.message)
    } 
  }

  const getAllStates = async () => {
    try {
      const state = await axios.get(
        `https://api.countrystatecity.in/v1/countries/IN/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "dzZxYUdqTEhIamhrTUdmdDZJOUducnRFazhUWFl4ZzY5UU1LVmZnRQ==",
          },
        }
      );
      // console.log(state.data);
      setStates(state.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getAllCities = async () => {
    try {
      const cities = await axios.get(`https://api.countrystatecity.in/v1/countries/IN/states/UP/cities`, {
        headers: {
          "X-CSCAPI-KEY":
              "dzZxYUdqTEhIamhrTUdmdDZJOUducnRFazhUWFl4ZzY5UU1LVmZnRQ==",
        },
      })
      setCities(cities.data)
    } catch(err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getAllCountries();
    getAllStates();
    getAllCities();
   
  }, []);

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
    //   let errors = {}; //Validating the form once the error returns empty else onsubmit won't work

    // //   if (!values.username) {
    // //     errors.username = "Please enter username";
    // //   } else if (values.username.length < 5) {
    // //     errors.username = "Name shouldn't be less than 3 letters";
    // //   } else if (values.username.length > 20) {
    // //     errors.username = "Name shouldn't be more than 20 letters";
    // //   }

    //   if (!values.email) {
    //     errors.email = "Please enter email";
    //   } else if (
    //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    //   ) {
    //     errors.email = "Invalid email address";
    //   }

    //     if (!values.city) {
    //       errors.city = "Please select any one city";
    //     }

    //     if (!values.state) {
    //       errors.state = "Please select any one state";
    //     }

    //     if (!values.country) {
    //       errors.country = "Please select any one state";
    //     }

    //   return errors;
    // },

    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await axios.post("http://localhost:8000/users", values);
        toast.success("User added successfully", {
          duration: 2000
        })
        setTimeout(() => {
          navigate("/layout/user/list");
        }, 2000)
      } catch (err) {
        console.log(err.message);
        setIsLoading(false);
      }
    },
  });
  

  return (
    <>
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
          <span style={{ color: "red" }}>
            {myFormik.errors.email}
          </span>
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
          <span style={{ color: "red" }}>
            {myFormik.errors.password}
          </span>
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
          <span style={{ color: "red" }}>
            {myFormik.errors.password}
          </span>
        </div>

        <div className="col-lg-4">
          <label>Country</label>
          <select
            name="country"
            value={myFormik.values.country}
            // onChange={(e)=>{myFormik.handleChange  ,  getAllStates(e.target.value)}}
            onChange={myFormik.handleChange}
            // onClick={(e)=>}
            className={`form-control ${
              myFormik.errors.country ? "is-invalid" : ""
            } `}
          >
            <option value="">----Select----</option>
            {
              countries.map((e) => {
                return (
                  <option key={e.id} value={e.iso2} >{e.name}</option>
                )
              })
            }
          </select>
          <span style={{ color: "red" }}>
            {myFormik.errors.country}
          </span>
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
            {states.map((e) => {
              return (
                <option key={e.id} value={e.iso2}>
                  {e.name}
                </option>
              );
            })}
          </select>
          <span style={{ color: "red" }}>
            {myFormik.errors.state}
          </span>
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
          {
            cities.map((e) => {
              return (
                <option key={e.id} value={e.iso2}>
                  {e.name}
                </option>
              )
            })
          }
        </select>
        <span style={{ color: "red" }}>{myFormik.errors.city}</span>
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
  <Toaster />
    </>
  );
};

export default CreateUser;
