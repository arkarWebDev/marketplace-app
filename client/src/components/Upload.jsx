import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { uploadImage } from "../apicalls/product";
import { message } from "antd";

const Upload = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);

  const onChangeHandler = (event) => {
    const seletedImages = event.target.files;
    const seletedImagesArray = Array.from(seletedImages);
    setImages((prev) => [...prev, ...seletedImagesArray]);
    const previewImagesArray = seletedImagesArray.map((img) => {
      return URL.createObjectURL(img);
    });
    setPreviewImages((prev) => prev.concat(previewImagesArray));
  };

  const deleteHandler = (img) => {
    const indexToDelete = previewImages.findIndex((e) => e === img);

    if (indexToDelete !== -1) {
      const updatedSeletedImages = [...images];
      updatedSeletedImages.splice(indexToDelete, 1);

      setImages(updatedSeletedImages);
      setPreviewImages((prevImg) => prevImg.filter((e) => e !== img));

      URL.revokeObjectURL(img);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("product_images", images[i]);
    }
    try {
      const response = await uploadImage(formData);
      if (response.isSuccess) {
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
      <h1 className=" text-2xl font-bold mb-4">
        Upload your product's images here.
      </h1>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <label
          htmlFor="upload"
          className="p-2 rounded-md border-dashed border-2 border-blue-600 font-medium my-3 text-blue-600 cursor-pointer"
        >
          Upload from device
        </label>
        <input
          type="file"
          hidden
          id="upload"
          name="product_images"
          multiple
          accept="image/png,image/jpeg,image/jpg"
          onChange={onChangeHandler}
        />
        <div className="flex gap-2 mt-4">
          {previewImages &&
            previewImages.map((img, index) => (
              <div key={img} className="basis-1/6 h-32 relative">
                <img
                  src={img}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <TrashIcon
                  width={20}
                  height={20}
                  className=" absolute z-20 bottom-2 right-3 text-white cursor-pointer"
                  onClick={() => deleteHandler(img)}
                />
              </div>
            ))}
        </div>
        <button className="block my-4 text-white bg-blue-600 rounded-md px-3 py-2 font-medium">
          Upload to product
        </button>
      </form>
    </section>
  );
};

export default Upload;