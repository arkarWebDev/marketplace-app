import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../apicalls/product";
import { message } from "antd";
import TradeHub from "../../images/TradeHub.jpg";

import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/slices/loaderSlice";

import { RotatingLines } from "react-loader-spinner";

const Details = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const { isProcessing } = useSelector((state) => state.reducer.loader);

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

  useEffect(() => {
    findById();
  }, []);

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
                          key={i}
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
                <h1 className=" text-4xl font-bold my-1">{product.name}</h1>
                <p className=" text-gray-500 font-medium leading-6 mb-4">
                  {product.description}
                </p>
                <hr />
                <h1 className="text-2xl font-semibold my-2">Infomations</h1>
                <div className="flex justify-between mb-4">
                  <div className=" font-medium space-y-2">
                    <p>Type</p>
                    <p>Used for</p>
                  </div>
                  <div className=" text-gray-600 space-y-2 text-right">
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
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Details;
