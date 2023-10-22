import { Badge, Card, Flex, Metric, Text } from "@tremor/react";

export default ({ title, count, icon, note }) => (
  <Card className="max-w-sm">
    <Flex justifyContent="between" alignItems="center">
      <Text>{title}</Text>
      <Badge size="xs" icon={icon}>
        {note}
      </Badge>
    </Flex>
    <Metric>{count}</Metric>
  </Card>
);
