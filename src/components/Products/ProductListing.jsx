import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ProductListing = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  let getProducts = async () => {
    try {
      const products = await axios.get("http://localhost:8000/products");
      console.log("products ", products);
      setProductData(products.data);
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
        await axios.delete(`http://localhost:8000/products/${id}`);
        toast.error(`Product with id ${id} deleted successfully`, {
          duration: 2000,
        });
        setTimeout(() => {
          getProducts();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Users</h1>
          <Link
            to="/layout/product/create"
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            {/*<FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />*/}
            Create Products
          </Link>
        </div>
        {/* <!-- DataTables --> */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">DataTables</h6>
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
                      <th>Price</th>
                      <th>Description</th>
                      <th>Rating</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Description</th>
                      <th>Rating</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {productData.map((product) => {
                      return (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.desc}</td>
                          <td>{product.rating}</td>
                          <th>
                            <Link
                              to={`/portal/user-view/${product.id}`}
                              className="btn btn-primary btn-sm mr-1"
                            >
                              View
                            </Link>
                            <Link
                              to={`/layout/product/edit/${product.id}`}
                              style={{
                                fontSize: "30px",
                                verticalAlign: "middle",
                                cursor: "pointer",
                                textDecoration: "none",
                              }}
                              className="material-symbols-outlined"
                            >
                              edit
                            </Link>
                            <span
                              onClick={() => handleDelete(product.id)}
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
      <Toaster />
    </>
  );
};

export default ProductListing;
