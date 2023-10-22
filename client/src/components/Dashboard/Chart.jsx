import { Card, Title, LineChart } from "@tremor/react";

const Chart = () => {
  const chartdata = [
    {
      year: 1970,
      "Product Sell Rate": 2.04,
    },
    {
      year: 1971,
      "Product Sell Rate": 1.96,
    },
    {
      year: 1972,
      "Product Sell Rate": 1.96,
    },
    {
      year: 1973,
      "Product Sell Rate": 1.93,
    },
    {
      year: 1974,
      "Product Sell Rate": 0.51,
    },
    //...
  ];

  const valueFormatter = (number) =>
    `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <Card>
      <Title>Product Sell Rates Per Daily</Title>
      <LineChart
        className="mt-6"
        data={chartdata}
        index="year"
        categories={["Product Sell Rate"]}
        colors={["blue"]}
        valueFormatter={valueFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default Chart;
