import { BarList, Card, Title, Bold, Flex, Text } from "@tremor/react";
import { GifIcon } from "@heroicons/react/24/outline";

const Bar = () => {
  const data = [
    {
      name: "Twitter",
      value: 456,
      icon: GifIcon,
    },
    {
      name: "Google",
      value: 351,
    },
    {
      name: "GitHub",
      value: 271,
    },
    {
      name: "Reddit",
      value: 191,
    },
    {
      name: "Youtube",
      value: 91,
    },
  ];
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
