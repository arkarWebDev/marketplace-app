import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const Hero = () => {
  return (
    <div className="w-full text-center mb-2 mt-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        "Discover, Connect, and Thrive with TradeHub"
      </h1>
      <p className=" text-lg font-medium text-gray-500 max-w-xl mx-auto mb-4">
        Bings buyers and sellers together, providing trust, community, and
        success. Explore, connect, and thrive with us.
      </p>
      <div className=" max-w-sm mx-auto relative">
        <input
          type="text"
          className=" bg-gray-100 outline-none p-2 rounded-xl w-full "
        />
        <MagnifyingGlassIcon
          width={22}
          height={22}
          className=" text-blue-600 absolute top-2 right-2 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Hero;
