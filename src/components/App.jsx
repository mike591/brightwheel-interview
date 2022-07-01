import { useState, useRef } from "react";
import { Input, Typography, Space, Button, Modal, List } from "antd";
import CardItems from "components/CardItems";
import useSearch from "hooks/useSearch";

// TODO: make tests!
const App = () => {
  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { items, isLoading, setIsLoading, getItems, starred } = useSearch();

  const queryTimeoutRef = useRef();
  const handleInputChange = (e) => {
    const newQuery = e.currentTarget.value;
    setQuery(e.currentTarget.value);

    if (queryTimeoutRef.current) {
      clearTimeout(queryTimeoutRef.current);
    }

    if (newQuery) {
      setIsLoading(true);
      queryTimeoutRef.current = setTimeout(() => {
        getItems(newQuery);
      }, 1000);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {openModal && (
        <Modal
          title="Starred Items"
          visible={openModal}
          width={"50rem"}
          onOk={() => setOpenModal(false)}
          onCancel={() => setOpenModal(false)}
        >
          {/* TODO: Add star toggling and maybe make link to page showing stuff in from /search/:id */}
          <List
            itemLayout="horizontal"
            dataSource={Object.values(starred)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.name}
                  description={
                    item.taxonomy?.scientificName ??
                    item.previewText ??
                    item.description
                  }
                />
              </List.Item>
            )}
          />
        </Modal>
      )}
      <Space
        style={{ width: 1024, padding: "2rem" }}
        direction="vertical"
        size="middle"
      >
        <div
          style={{
            display: "grid",
            alignItems: "center",
            gap: "1rem",
            gridTemplateColumns: "6rem 1fr 6rem",
          }}
        >
          <Typography.Text style={{ width: "8rem" }}>
            Enter Query:
          </Typography.Text>
          <Input value={query} onChange={handleInputChange} />
          <Button
            onClick={() => setOpenModal(true)}
            disabled={!Object.values(starred).length}
          >
            <Typography.Text>
              {Object.values(starred).length} star(s)
            </Typography.Text>
          </Button>
        </div>
        <CardItems showNoneFound={query && !items.length && !isLoading} />
      </Space>
    </div>
  );
};

export default App;
