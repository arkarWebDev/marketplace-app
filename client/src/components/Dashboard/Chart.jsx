import { Card, Title, LineChart } from "@tremor/react";
import { format } from "date-fns";

const Chart = ({ products }) => {
  // get date from last 1 week
  const currentDate = new Date(); // current date
  const last1Week = new Date();
  last1Week.setDate(currentDate.getDate() - 7);

  const productDailySellRate = {};

  // calc products in one week
  products.forEach((product) => {
    const productSellDate = new Date(product.createdAt);

    if (productSellDate <= currentDate && productSellDate >= last1Week) {
      const formattedSellDate = format(new Date(productSellDate), "dd/MM");
      if (!productDailySellRate[formattedSellDate]) {
        productDailySellRate[formattedSellDate] = 0;
      }
      productDailySellRate[formattedSellDate] += 1;
    }
  });

  const chartdata = Object.entries(productDailySellRate).map(([key, val]) => ({
    date: key,
    "Product Sell Rate": val,
  }));

  return (
    <Card>
      <Title>Product Sell Rates Per Daily</Title>
      <LineChart
        className="mt-6"
        data={chartdata}
        index="date"
        categories={["Product Sell Rate"]}
        colors={["blue"]}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default Chart;
