import { useEffect, useState } from "react";
import Card from "../../components/HomePage/Card";
import Filter from "../../components/HomePage/Filter";
import Hero from "../../components/HomePage/Hero";
import { getProducts } from "../../apicalls/product";
import { message } from "antd";

const Index = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await getProducts();
      if (response.isSuccess) {
        setProducts(response.productDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect((_) => {
    getAllProducts();
  }, []);

  return (
    <section>
      <Hero setProducts={setProducts} getAllProducts={getAllProducts} />
      <Filter setProducts={setProducts} getAllProducts={getAllProducts} />
      <div className="flex max-w-4xl mx-auto flex-wrap flex-row">
        {products.map((product) => (
          <Card product={product} key={product._id} />
        ))}
      </div>
    </section>
  );
};

export default Index;
