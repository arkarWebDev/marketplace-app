import React, { useEffect, useState } from "react";
import { getSavedProducts } from "../../apicalls/product";
import { message } from "antd";
import Card from "../../components/HomePage/Card";

import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/slices/loaderSlice";

import { RotatingLines } from "react-loader-spinner";

const Index = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const dispatch = useDispatch();

  const { isProcessing } = useSelector((state) => state.reducer.loader);

  const getProducts = async () => {
    dispatch(setLoader(true));
    try {
      const response = await getSavedProducts();

      if (response.isSuccess) {
        setSavedProducts(response.productDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
    dispatch(setLoader(false));
  };

  useEffect((_) => {
    getProducts();
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-bold my-4 text-center">
        Saved Product List
      </h1>
      {isProcessing ? (
        <div className=" flex items-center justify-center">
          <RotatingLines
            strokeColor="#3b82f6"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={isProcessing}
          />
        </div>
      ) : (
        <div className="flex gap-3">
          {savedProducts && savedProducts.length > 0 && (
            <>
              {savedProducts.map((product) => (
                <Card
                  product={product.product_id}
                  key={product._id}
                  saved={true}
                  getProducts={getProducts}
                />
              ))}
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default Index;
