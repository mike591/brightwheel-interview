import { Card, Typography } from "antd";
import useSearch from "hooks/useSearch";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const Company = ({ item }) => {
  const { handleToggle } = useSearch();

  return (
    <Card
      hoverable
      style={{ height: "100%" }}
      onClick={() => handleToggle(item)}
    >
      <Typography.Title level={5}>
        {item.name} {item.starred ? <StarFilled /> : <StarOutlined />}
      </Typography.Title>
      {/* TODO: make an address formatter or something. Address can be empty. */}
      <Typography.Text>{`${item.address?.address1}, ${item.address?.city}, ${item.address?.state}`}</Typography.Text>
      <Typography.Paragraph type={"secondary"}>
        {item.description}
      </Typography.Paragraph>
    </Card>
  );
};

export default Company;
