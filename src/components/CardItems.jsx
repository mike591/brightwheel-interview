import { Row, Col, Spin, Typography } from "antd";
import Animal from "./Animal";
import Company from "./Company";
import Product from "./Product";
import useSearch from "hooks/useSearch";

const CardItems = ({ showNoneFound }) => {
  const { items, isLoading } = useSearch();

  if (!items.length && !showNoneFound) return <></>;

  const getComponent = (item) => {
    if (item.type === "product") {
      return Product;
    } else if (item.type === "animal") {
      return Animal;
    } else {
      return Company;
    }
  };

  return (
    <Spin spinning={isLoading}>
      {showNoneFound && (
        <Typography.Paragraph type="danger">
          No matching items. Please update your query.
        </Typography.Paragraph>
      )}
      <Row gutter={[16, 16]}>
        {items.map((item) => {
          const Component = getComponent(item);
          return (
            <Col span={8} key={item.id}>
              <Component item={item} />
            </Col>
          );
        })}
      </Row>
    </Spin>
  );
};

export default CardItems;
