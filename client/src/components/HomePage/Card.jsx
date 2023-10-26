import TradeHub from "../../images/TradeHub.jpg";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { deleteSavedProduct, savedProduct } from "../../apicalls/product";
import { message } from "antd";

const Card = ({ product, saved = false, getProducts }) => {
  const ProductStatusHandler = async (id) => {
    try {
      let response;

      if (saved) {
        response = await deleteSavedProduct(id);
      } else {
        response = await savedProduct(id);
      }

      if (response.isSuccess) {
        if (saved) {
          getProducts();
        }
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(err.message);
    }
  };
  return (
    <div className={` ${saved ? "basis-1/4" : "basis-1/2"} px-4 mb-4`}>
      {product.images[0] ? (
        <Link to={`/products/${product._id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-52 object-cover"
          />
        </Link>
      ) : (
        <Link to={`/products/${product._id}`}>
          <img src={TradeHub} alt={product.name} className="w-full" />
        </Link>
      )}

      <p className=" text-white text-xs bg-blue-600 rounded-lg p-1 w-fit font-medium my-2">
        {product.category.toUpperCase().replaceAll("_", " ")}
      </p>
      <div className="flex items-center justify-between">
        <Link to={`/products/${product._id}`}>
          <p className=" text-xl font-bold text-gray-700">{product.name}</p>
        </Link>
        {saved ? (
          <BookmarkSlashIcon
            className="w-6 h-8 text-blue-600 cursor-pointer"
            onClick={() => {
              ProductStatusHandler(product._id);
            }}
          />
        ) : (
          <BookmarkIcon
            className="w-6 h-8 text-blue-600 cursor-pointer"
            onClick={() => {
              ProductStatusHandler(product._id);
            }}
          />
        )}
      </div>
      <p className="text-gray-500">{product.description.slice(0, 80)}</p>
    </div>
  );
};

export default Card;
