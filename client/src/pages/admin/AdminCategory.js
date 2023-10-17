import React, { useRef, useEffect, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/authContext";
const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [updateCategory, setUpdateCategory] = useState("");
  //eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  const ref = useRef();

  const onChangeHandle = (e) => {
    setNewCategory(e.target.value);
    console.log(newCategory);
  };
  const createHandle = async (e) => {
    e.preventDefault();
    try {
      console.log("inside create");
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        {
          name: newCategory,
        },
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      if (data.success) {
        toast.success(`${newCategory} Created Successfully`);
        allCategory();
        setNewCategory("");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Error in Creating Category");
    }
  };
  const allCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/all-category"
      );
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting Categories...");
    }
  };
  useEffect(() => {
    allCategory();

    // eslint-disable-next-line
  }, []);

  const onDeleteHandle = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${id}`,
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      if (data.success) {
        toast.success("Category Deleted Successfully");
        allCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting category...");
    }
  };

  const updateHandle = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/edit-category/${id}`,
        {
          name: updateCategory,
        },
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      if (data.success) {
        toast.success("Category Updated Successfully...");
        allCategory();
        setUpdateCategory("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in Updating category...");
    }
  };

  let i = 0;
  return (
    <div className="container-fluid">
      <AdminLayout>
        <div>
          <form onSubmit={createHandle}>
            <div className="mb-3">
              <label htmlFor="updateCategory" className="form-label">
                New Category
              </label>
              <input
                type="text"
                className="form-control"
                id="updateCategory"
                placeholder="Enter category name"
                value={newCategory}
                onChange={onChangeHandle}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Create Category
            </button>
          </form>
        </div>
        <div className="display-3 my-2 text-center">All Category</div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => {
                return (
                  <tr key={c._id}>
                    <th scope="row">{++i}</th>
                    <td>{c.name}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm ms-2 "
                        data-bs-toggle="modal"
                        data-bs-target={`#u${c._id}`}
                      >
                        Update
                      </button>

                      <button
                        onClick={() => {
                          onDeleteHandle(c._id);
                        }}
                        className="btn btn-danger btn-sm ms-2 "
                      >
                        Delete
                      </button>
                    </td>
                    {/*   */}
                    <div>
                      {/* Modal */}
                      <div
                        className="modal fade"
                        id={`u${c._id}`}
                        tabIndex={-1}
                        aria-labelledby={`u${c._id}Label`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id={`u${c._id}Label`}
                              >
                                Update Category
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                ref={ref}
                              />
                            </div>
                            <div className="modal-body">
                              <form onSubmit={createHandle}>
                                <div className="mb-3">
                                  <label
                                    htmlFor="updateCategory"
                                    className="form-label"
                                  >
                                    New Category
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="updateCategory"
                                    placeholder={c.name}
                                    value={updateCategory}
                                    onChange={(e) => {
                                      setUpdateCategory(e.target.value);
                                    }}
                                  />
                                </div>
                              </form>
                            </div>
                            <div className="modal-footer">
                              <button
                                id="closeModal"
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                onClick={() => {
                                  updateHandle(c._id);
                                }}
                                type="button"
                                d
                                className="btn btn-warning"
                                data-bs-dismiss="modal"
                              >
                                Update Category
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*   */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminCategory;
