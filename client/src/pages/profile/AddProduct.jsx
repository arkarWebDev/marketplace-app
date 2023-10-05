import { Checkbox, Col, Form, Input, Row, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";

import {
  sellProduct,
  getOldProduct,
  updateProduct,
} from "../../apicalls/product";
import { useEffect, useState } from "react";

const AddProduct = ({
  setActiveTabKey,
  getProducts,
  editMode,
  editProductId,
}) => {
  const [form] = Form.useForm();
  const [sellerId, setSellerId] = useState(null);

  const options = [
    {
      value: "clothing_and_fashion",
      label: "Clothing and Fashion",
    },
    {
      value: "electronics_and_gadgets",
      label: "Electronics and Gadgets",
    },
    {
      value: "home_and_furniture",
      label: "Home and Furniture",
    },
    {
      value: "beauty_and_personal_care",
      label: "Beauty and Personal Care",
    },
    {
      value: "books_and_media",
      label: "Books and Media",
    },
    {
      value: "sports_and_fitness",
      label: "Sports and Fitness",
    },
    {
      value: "toys_and_games",
      label: "Toys and Games",
    },
  ];
  const checkBoxOptions = [
    {
      label: "Accessories",
      value: "Accessories",
    },
    {
      label: "Warranty",
      value: "Warranty",
    },
    {
      label: "Vocher",
      value: "Vocher",
    },
  ];

  const onFinishHandler = async (values) => {
    try {
      let response;
      if (editMode) {
        values.seller_id = sellerId;
        values.product_id = editProductId;
        response = await updateProduct(values);
      } else {
        response = await sellProduct(values);
      }
      if (response.isSuccess) {
        form.resetFields();
        message.success(response.message);
        getProducts();
        setActiveTabKey("1");
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const getOldProductData = async () => {
    try {
      const response = await getOldProduct(editProductId);
      if (response.isSuccess) {
        message.success("Edit mode on!!");
        const { name, description, price, usedFor, category, details, seller } =
          response.productDoc;
        setSellerId(seller);
        const modifiedProduct = {
          product_name: name,
          product_description: description,
          product_price: price,
          product_category: category,
          product_details: details,
          product_used_for: usedFor,
        };
        form.setFieldsValue(modifiedProduct);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(
    (_) => {
      if (editMode) {
        getOldProductData();
      } else {
        form.resetFields();
      }
    },
    [editMode]
  );

  return (
    <section>
      <h1 className="text-3xl font-semibold my-2">
        {editMode ? "Update your product here." : "What you want to sell ?"}
      </h1>
      <Form layout="vertical" onFinish={onFinishHandler} form={form}>
        <Form.Item
          name="product_name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: "Product name must contains.",
            },
          ]}
        >
          <Input placeholder="product name ..." />
        </Form.Item>
        <Form.Item
          name="product_description"
          label="Product Description"
          rules={[
            {
              required: true,
              message: "Description must contains.",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="product_price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Price must contains.",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="product_category"
              label="Choose a category"
              rules={[
                {
                  required: true,
                  message: "Category must choose.",
                },
              ]}
            >
              <Select defaultValue={""} options={options} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="product_used_for"
              label="Used for"
              rules={[
                {
                  required: true,
                  message: "Product's used time must write.",
                },
              ]}
            >
              <Input placeholder="eg, 3 months ago" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="product_details" label="This product is have">
          <Checkbox.Group options={checkBoxOptions} defaultValue={[""]} />
        </Form.Item>
        <button
          type="submit"
          className=" font-medium text-lg text-center py-1 rounded-md bg-blue-500 text-white flex items-center gap-2 justify-center w-full"
        >
          <SquaresPlusIcon width={30} />
          {editMode ? "Update Product" : "Sell Product"}
        </button>
      </Form>
    </section>
  );
};

export default AddProduct;
