import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getProductsByFilters } from "../../apicalls/product";
import { message } from "antd";

import { useDispatch } from "react-redux";
import { setLoader } from "../../store/slices/loaderSlice";

const Hero = ({ setProducts, getAllProducts }) => {
  const [searchKey, setSearchKey] = useState("");

  const dispatch = useDispatch();

  const searchHandler = async () => {
    if (searchKey.trim().length === 0) {
      return message.error("SearchKey must have.");
    }
    dispatch(setLoader(true));
    try {
      const response = await getProductsByFilters("searchKey", searchKey);
      if (response.isSuccess) {
        setProducts(response.productDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
    dispatch(setLoader(false));
  };

  const clearHandler = () => {
    setSearchKey("");
    getAllProducts();
  };

  return (
    <div className="w-full text-center mb-2 mt-10">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">
        "Discover, Connect, and Thrive with TradeHub"
      </h1>
      <p className=" text-lg font-medium text-gray-500 max-w-xl mx-auto my-4">
        Bings buyers and sellers together, providing trust, community, and
        success. Explore, connect, and thrive with us.
      </p>
      <div className=" max-w-sm mx-auto flex items-center gap-2">
        <div className=" relative w-full">
          <input
            type="text"
            className=" bg-white outline-none p-2 rounded-xl w-full "
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <MagnifyingGlassIcon
            width={22}
            height={22}
            className=" text-blue-600 absolute top-2 right-2 cursor-pointer"
            onClick={searchHandler}
          />
        </div>
        {searchKey && (
          <button
            type="button"
            className="text-sm font-medium text-white bg-blue-600 p-2 rounded-md"
            onClick={clearHandler}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default Hero;
