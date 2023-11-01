import moment from "moment";
import React, { useState } from "react";
import { Pagination, message } from "antd";
import {
  approveProduct,
  rejectProduct,
  rollBackProduct,
} from "../../apicalls/admin";

const Products = ({ products, getProducts, currentPage, totalPages }) => {
  const approveHandler = async (productId) => {
    try {
      const response = await approveProduct(productId);
      if (response.isSuccess) {
        message.success(response.message);
        getProducts();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const rejectHandler = async (productId) => {
    try {
      const response = await rejectProduct(productId);
      if (response.isSuccess) {
        message.success(response.message);
        getProducts();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const rollbackHandler = async (productId) => {
    try {
      const response = await rollBackProduct(productId);
      if (response.isSuccess) {
        message.success(response.message);
        getProducts();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const handlePagination = (page, perPage) => {
    console.log(page, perPage);
    getProducts(page, perPage);
  };

  return (
    <section>
      <h1 className=" text-3xl font-semibold my-2">Products List</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center ">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Seller
              </th>
              <th scope="col" className="px-6 py-3">
                Sell Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products.length > 0 ? (
              <>
                {products.map((product) => (
                  <tr className="bg-white border-b " key={product._id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left"
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.seller.name}</td>
                    <td className="px-6 py-4">
                      {moment(product.createdAt).format("L")}
                    </td>
                    <td className="px-6 py-4">
                      {product.status === "pending" && (
                        <span className=" bg-yellow-400 text-xs p-1 rounded-md text-white">
                          {product.status}
                        </span>
                      )}{" "}
                      {product.status === "approve" && (
                        <span className="bg-green-400 text-xs p-1 rounded-md text-white">
                          {product.status}
                        </span>
                      )}
                      {product.status === "reject" && (
                        <span className="bg-red-400 text-xs p-1 rounded-md text-white">
                          {product.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {product.status === "approve" ? (
                        <button
                          type="button"
                          className="font-medium text-blue-600 hover:underline me-4"
                          onClick={() => {
                            rollbackHandler(product._id);
                          }}
                        >
                          Roll Back
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="font-medium text-blue-600 hover:underline me-4"
                          onClick={() => {
                            approveHandler(product._id);
                          }}
                        >
                          Approve
                        </button>
                      )}
                      {product.status === "reject" ? (
                        <button
                          type="button"
                          className="font-medium text-red-600 hover:underline me-4"
                          onClick={() => {
                            rollbackHandler(product._id);
                          }}
                        >
                          Roll Back
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="font-medium text-red-600 hover:underline me-4"
                          onClick={() => {
                            rejectHandler(product._id);
                          }}
                        >
                          Reject
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
      <div className="flex justify-end my-10">
        <Pagination
          current={currentPage}
          total={totalPages * 6}
          onChange={handlePagination}
        />
      </div>
    </section>
  );
};

export default Products;
