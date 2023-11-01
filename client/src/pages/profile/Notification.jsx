import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import {
  deleteAllNoti,
  deleteNoti,
  makeRead,
} from "../../apicalls/notification";
import { message } from "antd";
import { useEffect } from "react";

const Notification = ({ notifications, getNoti }) => {
  useEffect(
    (_) => {
      getNoti();
    },
    [getNoti]
  );

  const markAsRead = async (id) => {
    try {
      const response = await makeRead(id);
      if (response.isSuccess) {
        getNoti();
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const response = await deleteNoti(id);
      if (response.isSuccess) {
        getNoti();
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const deleteAllHandler = async () => {
    try {
      const response = await deleteAllNoti();
      if (response.isSuccess) {
        getNoti();
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <section>
      <div className=" flex my-2 justify-between">
        <h1 className="text-3xl font-semibold ">Notifications</h1>
        <p
          className=" text-red-600 font-medium my-2 underline cursor-pointer"
          onClick={deleteAllHandler}
        >
          Delete All Forever
        </p>
      </div>
      <div className=" max-w-4xl">
        {notifications.length === 0 && (
          <p className=" text-red-600 font-medium my-5">
            No notifications yet.
          </p>
        )}
        {notifications &&
          notifications.map((noti) => (
            <div
              key={noti._id}
              className={`${
                noti.isRead ? "bg-gray-50 " : "bg-white"
              } mb-4 rounded-lg p-4`}
            >
              <p className=" text-sm font-medium text-gray-500">
                {formatDistanceToNow(new Date(noti.createdAt))} ago ...
              </p>
              <h4
                className={`text-xl font-bold my-2 ${
                  noti.isRead ? "text-gray-500" : "text-black"
                }`}
              >
                {noti.title}
              </h4>
              <p className=" text-base font-medium text-gray-600">
                {noti.message}
              </p>
              <p className=" font-medium text-gray-600 my-2">
                Contact Number -{" "}
                <span className=" tracking-wide">{noti.phone_number}</span>
              </p>
              <hr />
              <div className="flex justify-end gap-3">
                <Link
                  to={`/products/${noti.product_id}`}
                  className=" text-blue-600 font-medium my-2 underline"
                >
                  View bids
                </Link>
                {noti.isRead ? (
                  <p
                    className=" text-blue-600 font-medium my-2 underline cursor-pointer"
                    onClick={() => deleteHandler(noti._id)}
                  >
                    Delete Forever
                  </p>
                ) : (
                  <p
                    className=" text-blue-600 font-medium my-2 underline cursor-pointer"
                    onClick={() => markAsRead(noti._id)}
                  >
                    Mark as read
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Notification;
