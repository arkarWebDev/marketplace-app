import { useEffect, useState } from "react";
import { banUser, getAllUsers, unBanUser } from "../../apicalls/admin";
import { message } from "antd";
import moment from "moment";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.isSuccess) {
        setUsers(response.userDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect((_) => {
    getUsers();
  }, []);

  const banHandler = async (userId) => {
    try {
      const response = await banUser(userId);
      if (response.isSuccess) {
        message.success(response.message);
        getUsers();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const unBanHandler = async (userId) => {
    try {
      const response = await unBanUser(userId);
      if (response.isSuccess) {
        message.success(response.message);
        getUsers();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <section>
      <h1 className=" text-3xl font-semibold my-2">User List</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center ">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Create At
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.length > 0 ? (
              <>
                {users.map((user) => (
                  <tr className="bg-white border-b " key={user._id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left"
                    >
                      {user.name}
                    </th>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      {user.role === "admin" ? (
                        <span className=" text-green-600 font-medium italic">
                          {user.role}
                        </span>
                      ) : (
                        <span className=" text-blue-600">{user.role}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {user.status === "pending" && (
                        <span className=" bg-yellow-400 text-xs p-1 rounded-md text-white">
                          {user.status}
                        </span>
                      )}
                      {user.status === "active" && (
                        <span className="bg-green-400 text-xs p-1 rounded-md text-white">
                          {user.status}
                        </span>
                      )}
                      {user.status === "banned" && (
                        <span className="bg-red-400 text-xs p-1 rounded-md text-white">
                          {user.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {moment(user.createdAt).format("L")}
                    </td>
                    <td className="px-6 py-4">
                      {user.status === "active" ? (
                        <button
                          type="button"
                          className="font-medium text-red-600 hover:underline me-4"
                          onClick={() => {
                            banHandler(user._id);
                          }}
                        >
                          Ban
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="font-medium text-blue-600 hover:underline me-4"
                          onClick={() => {
                            unBanHandler(user._id);
                          }}
                        >
                          Unban
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <p>No proudcts added yet.</p>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
