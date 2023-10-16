import { Tabs } from "antd";
import ProductForm from "../../components/ProductForm";
import { useState } from "react";
import Upload from "../../components/Upload";

const ManageProduct = ({
  setActiveTabKey,
  getProducts,
  editMode,
  editProductId,
}) => {
  const [productActiveTabKey, setProductActiveTabKey] = useState("1");

  const items = [
    {
      key: "1",
      label: "Product Details",
      children: (
        <ProductForm
          setActiveTabKey={setActiveTabKey}
          getProducts={getProducts}
          editMode={editMode}
          editProductId={editProductId}
        />
      ),
    },
    editMode
      ? {
          key: "2",
          label: "Product Images",
          children: (
            <Upload
              editProductId={editProductId}
              setActiveTabKey={setActiveTabKey}
            />
          ),
        }
      : null,
  ];

  const onChangeHandler = (key) => {
    setProductActiveTabKey(key);
  };

  return (
    <section>
      <Tabs
        activeKey={productActiveTabKey}
        onChange={(key) => onChangeHandler(key)}
        items={items}
      />
    </section>
  );
};

export default ManageProduct;
