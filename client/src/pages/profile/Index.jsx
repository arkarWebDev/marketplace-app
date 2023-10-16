import { Tabs, message } from "antd";
import Products from "./Products";
import ManageProduct from "./ManageProduct";
import General from "./General";
import { useState, useEffect } from "react";
import { getAllProducts } from "../../apicalls/product";

const Index = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const getProducts = async () => {
    try {
      const response = await getAllProducts();
      if (response.isSuccess) {
        setProducts(response.productDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(
    (_) => {
      getProducts();
    },
    [activeTabKey]
  );

  const items = [
    {
      key: "1",
      label: "Products",
      children: (
        <Products
          products={products}
          setActiveTabKey={setActiveTabKey}
          setEditMode={setEditMode}
          setEditProductId={setEditProductId}
          getProducts={getProducts}
        />
      ),
    },
    {
      key: "2",
      label: "Manage Product",
      children: (
        <ManageProduct
          setActiveTabKey={setActiveTabKey}
          getProducts={getProducts}
          editMode={editMode}
          editProductId={editProductId}
        />
      ),
    },
    {
      key: "3",
      label: "Notification",
      children: "Content of Tab Pane 2",
    },
    {
      key: "4",
      label: "General",
      children: <General />,
    },
  ];

  const onChangeHandler = (key) => {
    setActiveTabKey(key);
    setEditMode(false);
  };

  return (
    <section>
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => onChangeHandler(key)}
        items={items}
        tabPosition="left"
        size="large"
      />
    </section>
  );
};

export default Index;
