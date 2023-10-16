import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import Moment from "react-moment";

const AdminProduct = () => {
  const [auth] = useAuth();
  const [categoryList, setCategoryList] = useState([]);
  const [singleCategory, setSingleCategory] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  const initialNewProduct = {
    name: "",
    description: "",
    price: "",
    active: true,
    category: "",
    tags: [],
    quantity: "",
  };
  const [newProduct, setNewProduct] = useState(initialNewProduct);
  const [editProduct, setEditProduct] = useState(initialNewProduct);

  const editProductModal = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/single-product/${id}`
      );
      if (data.success) {
        toast.success("indide if");
        setEditProduct({
          name: data.product.name,
          description: data.product.description,
          price: data.product.price,
          active: data.product.active,
          category: data.product.category,
          tags: data.product.tags,
          quantity: data.product.quantity,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting single product detail...");
    }
  };

  const onEditProductChangeHandle = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };
  const editProductHandle = async (e, id) => {
    e.preventDefault();
    const form = document.getElementById("editForm");
    const submitter = document.querySelector("button[value=edit]");
    const formData = new FormData(form, submitter);
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        formData,
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      if (data.success) {
        toast.success("Product Edited Successfully...");
        getAllProducts();
        setNewProduct(initialNewProduct);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in Edit product Handle...");
    }
  };
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/all-products"
      );
      if (data.success) {
        setAllProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching products...");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/all-category"
      );
      if (data.success) {
        setCategoryList(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting Categories...");
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllProducts();
  }, []);

  const createProductHandle = async (e) => {
    e.preventDefault();
    const form = document.getElementById("form");
    const submitter = document.querySelector("button[value=save]");
    const formData = new FormData(form, submitter);
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/create-product",
        formData,
        {
          headers: {
            authorization: auth.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.success) {
        toast.success("Product created successfully...");
        getAllProducts();
        setNewProduct(initialNewProduct);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while crating new product...");
    }
  };

  const newOnChangeHandle = (e) => {
    setNewProduct((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };

  const productDeleteHandle = async (id, name) => {
    try {
      if (
        !window.confirm(
          `Do you really want to remove ${name} from your inventory`
        )
      ) {
        return;
      } else {
        const { data } = await axios.delete(
          `http://localhost:8080/api/v1/product/delete-product/${id}`,
          {
            headers: {
              authorization: auth.token,
            },
          }
        );
        if (data.success) {
          toast.success("Product deleted successfully...");
          getAllProducts();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting product...");
    }
  };

  const singleCategoryHandle = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/category/${id}`
      );
      if (data.success) {
        setSingleCategory(data.category.name);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting single Category");
    }
  };

  const onClickActiveChange = async (id, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        {
          active: !status,
        },
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      if (data.success) {
        toast.success("Active Status Change successfully...");
        getAllProducts();
      }
    } catch (error) {
      toast.error("Error while changing active status");
    }
  };

  return (
    <div className="container-fluid">
      <AdminLayout>
        {/* {Create new product} */}
        <div className="createProductModal my-4">
          <button
            type="button"
            className="btn btn-outline-secondary fw-bold w-100"
            data-bs-toggle="modal"
            data-bs-target="#createProductModal"
          >
            Create New Product
          </button>
          <div
            className="modal fade"
            id="createProductModal"
            tabIndex={-1}
            aria-labelledby="createProductModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-fullscreen	">
              <div className="modal-content">
                <div className="modal-header bg-secondary">
                  <h1 className="modal-title fs-5" id="createProductModalLabel">
                    New Product
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form
                    id="form"
                    onSubmit={createProductHandle}
                    encType="multipart/form-data"
                  >
                    <div className="mb-3">
                      <label htmlFor="productName" className="form-label">
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="productName"
                        name="name"
                        value={newProduct.name}
                        onChange={newOnChangeHandle}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="productDescription"
                        className="form-label"
                      >
                        Product Description
                      </label>
                      <textarea
                        className="form-control"
                        id="productDescription"
                        name="description"
                        value={newProduct.description}
                        onChange={newOnChangeHandle}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="productPrice" className="form-label">
                        Product Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="productPrice"
                        name="price"
                        value={newProduct.price}
                        onChange={newOnChangeHandle}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="productQuantity" className="form-label">
                        Product Quantity{" "}
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="productQuantity"
                        value={newProduct.quantity}
                        name="quantity"
                        onChange={newOnChangeHandle}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="productCategory" className="form-label">
                        Product Category
                      </label>
                      <select
                        className="form-select form-select-sm"
                        aria-label="Small select example"
                        value={newProduct.category}
                        name="category"
                        onChange={newOnChangeHandle}
                        defaultValue={"DEFAULT"}
                      >
                        <option value={"DEFAULT"}>Select Category</option>
                        {categoryList.map((c) => {
                          return <option value={c._id}>{c.name}</option>;
                        })}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="productTags" className="form-label">
                        Product Tags
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="productTags"
                        value={newProduct.tags}
                        name="tags"
                        onChange={newOnChangeHandle}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="productImage" className="form-label">
                        Product Image
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="productTags"
                        name="image"
                      />
                    </div>

                    <div className="w-25 m-auto border">
                      <img
                        src="https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                        className="img-fluid"
                        alt="..."
                      />
                    </div>

                    <div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="productActive"
                          id="productActive1"
                          value={false}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="productActive1"
                        >
                          Deactive
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="productActive"
                          id="productActive2"
                          value={true}
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="productActive2"
                        >
                          Active
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 my-4"
                      value="save"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {Create new product end} */}
        {/* {All Products} */}

        <div className="display-4 text-center fw-bold">All Products</div>
        <hr />
        <div className="allItems d-flex justify-content-around flex-wrap">
          {allProducts.map((p) => {
            let image = p.image.split(/(\\|\/)/g).pop();
            return (
              <>
                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                  <div className="row g-0">
                    <div className="col-md-4 " style={{ maxHeight: "220px" }}>
                      <img
                        src={`http://localhost:8080/product/${image}`}
                        className="img-thumbnail h-100  rounded-start"
                        alt={image}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">
                          {p.description.slice(0, 50)}...
                        </p>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            <Moment fromNow>{p.createdAt}</Moment>
                          </small>
                        </p>
                      </div>
                      <button
                        className="btn btn-primary btn-sm m-2"
                        data-bs-toggle="modal"
                        data-bs-target={`#more${p._id}`}
                        onClick={() => {
                          singleCategoryHandle(p.category);
                        }}
                      >
                        More
                      </button>
                      {/* <!-- More Modal --> */}
                      <div
                        className="modal fade"
                        id={`more${p._id}`}
                        tabIndex={-1}
                        aria-labelledby={`more${p._id}Label`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-scrollable modal-lg modal-fullscreen-md-down">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id={`more${p._id}Label`}
                              >
                                {p.slug}
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              />
                            </div>
                            <div className="modal-body">
                              <div className="container-fluid">
                                <div className="row">
                                  <div className="col-md-10 m-auto">
                                    <img
                                      src={`http://localhost:8080/product/${image}`}
                                      alt={image}
                                      className="img-fluid"
                                    />
                                  </div>
                                  <div className="row">
                                    <div className="col-md-10 m-auto">
                                      <div className="display-3 mb-3">
                                        <big className="text-decoration-underline">
                                          Name:
                                        </big>{" "}
                                        {p.name}
                                      </div>
                                      <p className="fs-3 mb-3">
                                        <big className="text-decoration-underline">
                                          Description:
                                        </big>{" "}
                                        {p.description}
                                      </p>
                                      <p className="fs-3 mb-3">
                                        <big className="text-decoration-underline">
                                          Price:
                                        </big>{" "}
                                        {p.price}/- Rupees
                                      </p>
                                      <p className="fs-3 mb-3">
                                        <big className="text-decoration-underline">
                                          Quantity:
                                        </big>{" "}
                                        {p.quantity} Pcs
                                      </p>
                                      <p className="fs-3 mb-3">
                                        <big className="text-decoration-underline">
                                          Category:
                                        </big>{" "}
                                        {singleCategory}
                                      </p>
                                      <p className="fs-3 mb-3">
                                        <big className="text-decoration-underline">
                                          Tags:
                                        </big>{" "}
                                        {p.tags.length === 0 ? (
                                          <mark>No Tags</mark>
                                        ) : (
                                          p.tags.toString()
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        className="btn btn-warning btn-sm m-2"
                        data-bs-toggle="modal"
                        data-bs-target={`#edit${p._id}`}
                        onClick={() => editProductModal(p._id)}
                      >
                        Edit
                      </button>

                      {/* edit Modal */}
                      <div
                        className="modal fade"
                        id={`edit${p._id}`}
                        tabIndex={-1}
                        aria-labelledby={`edit${p._id}Label`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id={`edit${p._id}Label`}
                              >
                                Edit Product Details
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              />
                            </div>
                            <div className="modal-body">
                              <form
                                id="editForm"
                                onSubmit={(e) => {
                                  editProductHandle(e, p._id);
                                }}
                                encType="multipart/form-data"
                              >
                                <div className="mb-3">
                                  <label
                                    htmlFor="productName"
                                    className="form-label"
                                  >
                                    Product Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="productName"
                                    name="name"
                                    value={editProduct.name}
                                    onChange={onEditProductChangeHandle}
                                  />
                                </div>

                                <div className="mb-3">
                                  <label
                                    htmlFor="productDescription"
                                    className="form-label"
                                  >
                                    Product Description
                                  </label>
                                  <textarea
                                    className="form-control"
                                    id="productDescription"
                                    name="description"
                                    value={editProduct.description}
                                    onChange={onEditProductChangeHandle}
                                  ></textarea>
                                </div>

                                <div className="mb-3">
                                  <label
                                    htmlFor="productPrice"
                                    className="form-label"
                                  >
                                    Product Price
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="productPrice"
                                    name="price"
                                    value={editProduct.price}
                                    onChange={onEditProductChangeHandle}
                                  />
                                </div>

                                <div className="mb-3">
                                  <label
                                    htmlFor="productQuantity"
                                    className="form-label"
                                  >
                                    Product Quantity{" "}
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="productQuantity"
                                    value={editProduct.quantity}
                                    name="quantity"
                                    onChange={onEditProductChangeHandle}
                                  />
                                </div>

                                <div className="mb-3">
                                  <label
                                    htmlFor="productCategory"
                                    className="form-label"
                                  >
                                    Product Category
                                  </label>
                                  <select
                                    className="form-select form-select-sm"
                                    aria-label="Small select example"
                                    value={editProduct.category}
                                    name="category"
                                    onChange={onEditProductChangeHandle}
                                    defaultValue={"DEFAULT"}
                                  >
                                    <option value={"DEFAULT"}>
                                      Select Category
                                    </option>
                                    {categoryList.map((c) => {
                                      return (
                                        <option value={c._id}>{c.name}</option>
                                      );
                                    })}
                                  </select>
                                </div>

                                <div className="mb-3">
                                  <label
                                    htmlFor="productTags"
                                    className="form-label"
                                  >
                                    Product Tags
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="productTags"
                                    value={editProduct.tags}
                                    name="tags"
                                    onChange={onEditProductChangeHandle}
                                  />
                                </div>

                                <div className="mb-3">
                                  <label
                                    htmlFor="productImage"
                                    className="form-label"
                                  >
                                    Product Image
                                  </label>
                                  <input
                                    type="file"
                                    className="form-control"
                                    id="productTags"
                                    name="imageUpdate"
                                  />
                                </div>

                                <div className="w-25 m-auto border">
                                  <img
                                    src="https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                                    className="img-fluid"
                                    alt="..."
                                  />
                                </div>

                                <div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="productActive"
                                      id="productActive1"
                                      value={false}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="productActive1"
                                    >
                                      Deactive
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="productActive"
                                      id="productActive2"
                                      value={true}
                                      defaultChecked
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="productActive2"
                                    >
                                      Active
                                    </label>
                                  </div>
                                </div>

                                <button
                                  type="submit"
                                  className="btn btn-primary w-100 my-4"
                                  value="edit"
                                  data-bs-dismiss="modal"
                                >
                                  Edit
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          productDeleteHandle(p._id, p.name);
                        }}
                        className="btn btn-danger btn-sm m-2"
                      >
                        Delete
                      </button>
                      {p.active ? (
                        <button
                          onClick={() => {
                            onClickActiveChange(p._id, p.active);
                          }}
                          className="btn btn-success btn-sm m-2"
                        >
                          Activated
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            onClickActiveChange(p._id, p.active);
                          }}
                          className="btn btn-secondary btn-sm m-2"
                        >
                          Deactivated
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        {/* {All Products end} */}
      </AdminLayout>
    </div>
  );
};

export default AdminProduct;
