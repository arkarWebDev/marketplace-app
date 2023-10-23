import { BarList, Card, Title, Bold, Flex, Text } from "@tremor/react";

const Bar = ({ products }) => {
  const categoryCount = {};

  products.forEach((product) => {
    const productCategory = product.category;

    if (!categoryCount[productCategory]) {
      categoryCount[productCategory] = 0;
    }

    categoryCount[productCategory]++;
  });

  const data = Object.entries(categoryCount).map(([key, val]) => ({
    name: key.toUpperCase().replaceAll("_", " "),
    value: val,
  }));

  return (
    <Card className="w-full my-4">
      <Title>Prouduct Counts By Categories</Title>
      <Flex className="mt-4">
        <Text>
          <Bold>Category</Bold>
        </Text>
        <Text>
          <Bold>Counts</Bold>
        </Text>
      </Flex>
      <BarList data={data} className="mt-2" />
    </Card>
  );
};

export default Bar;
