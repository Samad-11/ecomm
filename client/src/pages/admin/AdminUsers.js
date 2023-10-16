import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";

const AdminUsers = () => {
  const [auth, setAuth] = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const getAllUser = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/user/get-all-users",
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      if (data.success) {
        console.log("testing 2", data.userList);
        setAllUsers(data.userList);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch Users");
    }
  };
  useEffect(() => {
    getAllUser();
  }, []);
  let i = 0;

  const onClickUserDeleteHandle = async (id) => {
    try {
      if (!window.confirm("Do you really want to delete this user")) {
        return;
      } else {
        const { data } = await axios.delete(
          `http://localhost:8080/api/v1/user/delete-user/${id}`,
          {
            headers: {
              authorization: auth.token,
            },
          }
        );
        if (data.success) {
          toast.success("user deleted successfully");
          getAllUser();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting User");
    }
  };
  return (
    <div className="container-fluid">
      <AdminLayout>
        <div className="display-3 fw-bold text-center mb-3">All Users</div>
        <hr />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((u) => {
              return (
                <>
                  <tr key={u._id}>
                    <th scope="row">{++i}</th>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.address ? u.address : "No Address Provided "}</td>
                    <td>
                      <button
                        onClick={() => {
                          onClickUserDeleteHandle(u._id);
                        }}
                        className="btn btn-sm btn-outline-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </AdminLayout>
    </div>
  );
};

export default AdminUsers;
