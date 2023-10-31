import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../apicalls/product";
import { Form, Input, message } from "antd";
import TradeHub from "../../images/TradeHub.jpg";

import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/slices/loaderSlice";

import { RotatingLines } from "react-loader-spinner";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { getAllBids, savedNewBid } from "../../apicalls/bid";

import { formatDistanceToNow } from "date-fns";
import { notfiy } from "../../apicalls/notification";

const Details = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [bids, setBids] = useState([]);
  const [isPlaced, setIsPlaced] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const { isProcessing } = useSelector((state) => state.reducer.loader);
  const { user } = useSelector((state) => state.reducer.user);

  const params = useParams();

  const findById = async () => {
    dispatch(setLoader(true));
    try {
      const response = await getProductById(params.id);
      if (response.isSuccess) {
        setProduct(response.productDoc);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
    dispatch(setLoader(false));
  };

  const getBids = async () => {
    try {
      const response = await getAllBids(params.id);
      if (response.isSuccess) {
        setBids(response.bidDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    findById();
    getBids();
  }, []);

  const onFinishHandler = async (values) => {
    setIsPlaced(true);
    values.product_id = product._id;
    values.seller_id = product.seller._id;
    values.buyer_id = user._id;

    try {
      const response = await savedNewBid(values);
      if (response.isSuccess) {
        getBids();
        form.resetFields();
        message.success(response.message);

        await notfiy({
          title: "New bid placed.",
          message: `New bid is placed in ${product.name} by ${user.name}.`,
          owner_id: product.seller._id,
          product_id: product._id,
          phone_number: values.phone,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
    setIsPlaced(false);
  };

  return (
    <section
      className={`flex mt-20 ${
        isProcessing
          ? "items-center justify-center"
          : "items-start justify-between"
      }`}
    >
      {isProcessing ? (
        <RotatingLines
          strokeColor="#3b82f6"
          strokeWidth="5"
          animationDuration="0.75"
          width="50"
          visible={isProcessing}
        />
      ) : (
        <>
          {product && product.category && product.seller && (
            <>
              <div className="w-1/3">
                {product && product.images && product.images.length > 0 ? (
                  <>
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-96 object-fill object-center rounded-xl overflow-hidden"
                    />
                    <div className="flex items-center gap-3 mt-3">
                      {product.images.map((i, index) => (
                        <div
                          key={index}
                          className={`border-2 overflow-hidden border-blue-400 rounded-lg p-2 ${
                            selectedImage === index && "border-dashed"
                          }`}
                        >
                          <img
                            src={i}
                            alt={product.name}
                            className=" w-24 h-24 object-cover cursor-pointer"
                            onClick={() => setSelectedImage(index)}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={TradeHub}
                      alt={product.name}
                      className="w-full h-96 object-fill object-center rounded-xl overflow-hidden"
                    />
                    <p className=" font-medium my-2 text-red-600">
                      This product does not include images.
                    </p>
                  </>
                )}
              </div>
              <div className="w-2/3 px-20">
                <div className=" flex justify-between">
                  <div className=" w-3/4">
                    <h1 className=" text-4xl font-bold my-1">{product.name}</h1>
                    <p className=" text-gray-500 font-medium leading-6 mb-4">
                      {product.description}
                    </p>
                  </div>
                  <ArrowLeftIcon
                    width={30}
                    height={30}
                    className="text-blue-600 cursor-pointer"
                    onClick={() => navigate(-1)}
                  />
                </div>
                <hr />
                <h1 className="text-2xl font-semibold my-2">Infomations</h1>
                <div className="flex justify-between mb-4">
                  <div className=" font-medium space-y-2">
                    <p>Price</p>
                    <p>Category</p>
                    <p>Used for</p>
                  </div>
                  <div className=" text-gray-600 space-y-2 text-right">
                    <p>{product.price} Kyats</p>
                    <p>{product.category.toUpperCase().replaceAll("_", " ")}</p>
                    <p>{product.usedFor}</p>
                  </div>
                </div>
                <hr />
                <div className=" mb-4">
                  <h1 className="text-2xl font-semibold my-2">Details</h1>
                  {product.details.map((d, i) => (
                    <div className="flex justify-between" key={i}>
                      <div className=" font-medium space-y-2">
                        <p>{d}</p>
                      </div>
                      <div className=" text-gray-600 space-y-2">
                        <p>Include</p>
                      </div>
                    </div>
                  ))}
                </div>
                <hr />
                <h1 className="text-2xl font-semibold my-2">
                  Seller Infomation
                </h1>
                <div className="flex justify-between mb-4">
                  <div className=" font-medium space-y-2">
                    <p>Name</p>
                    <p>E-mail</p>
                  </div>
                  <div className=" text-gray-600 space-y-2 text-right">
                    <p>{product.seller.name}</p>
                    <p>{product.seller.email}</p>
                  </div>
                </div>
                <hr />
                <h1 className="text-2xl font-semibold my-2">Place Your Bids</h1>
                {user && user._id !== product.seller._id && (
                  <div className=" mb-10">
                    <Form onFinish={onFinishHandler} layout="vertical">
                      <Form.Item
                        name="message"
                        label="Text "
                        rules={[
                          {
                            required: true,
                            message: "Message must contains.",
                          },
                          {
                            min: 3,
                            message: "Message must have 3 characters.",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input placeholder="write something ..."></Input>
                      </Form.Item>
                      <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                          {
                            required: true,
                            message: "Phone number must contains.",
                          },
                          {
                            min: 3,
                            message: "Phone number must have 3 characters.",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          type="number"
                          placeholder="phone number ..."
                        ></Input>
                      </Form.Item>
                      <div className=" text-right mb-3">
                        <button className=" text-white font-medium text-base px-2 py-1 rounded-md bg-blue-600">
                          {isPlaced && "Submitting Message ..."}
                          {!isPlaced && "Submit Message"}
                        </button>
                      </div>
                    </Form>
                  </div>
                )}
                {!user && (
                  <p className=" font-medium text-red-600">
                    <Link to={"/login"} className=" underline">
                      Login
                    </Link>{" "}
                    or{" "}
                    <Link to={"/register"} className="underline">
                      Register
                    </Link>{" "}
                    to bid this product.
                  </p>
                )}
                {user._id === product.seller._id && (
                  <p className=" font-medium text-red-600 mb-2">
                    You are the product seller / owner. You can't placed bid.
                  </p>
                )}
                <hr />
                <h1 className="text-2xl font-semibold my-2">Recent Bids</h1>
                <div>
                  {bids.map((bid) => (
                    <div
                      className=" mb-4 bg-white px-2 py-4 rounded-lg"
                      key={bid._id}
                    >
                      <h5 className=" font-medium text-base">
                        {bid.buyer_id.name}
                      </h5>
                      <p className=" text-xs text-gray-400">
                        {formatDistanceToNow(new Date(bid.createdAt))} ago
                      </p>
                      <p className=" text-gray-600 text-sm font-medium">
                        {bid.text}
                      </p>
                    </div>
                  ))}
                </div>
                {bids.length === 0 && (
                  <p className=" my-2 font-medium text-red-600">
                    Not bids are not placed yet.
                  </p>
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Details;
