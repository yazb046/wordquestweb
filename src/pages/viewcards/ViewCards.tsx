import { Col, Collapse, Layout, Row, Space } from "antd";
import { useState } from "react";
import { fetchAllCardsByUserId } from "../../service/cardService";
import Iterable from "../../types/Iterable";
import ThemesList from "./components/ThemesList";
import CardsList from "./components/CardsList";
import { iterableBuilder } from "../../types/IterableClass";
import CardMarkDownUpdated from "./components/CardMarkDownUpdated";
const { Panel } = Collapse;

const fetchItems = function (pageNo: number) {
  return fetchAllCardsByUserId(1, pageNo, 10, "id", "asc");
};

export default function ViewCards() {
  const [theme, setTheme] = useState<Iterable>(iterableBuilder(0, "", ""));
  const [card, setCard] = useState<Iterable>(iterableBuilder(0, "", ""));

  const getPanelTitle = function () {
    if (theme !== undefined && theme.getId() > 0) {
      let title = "Steps for: " + theme.getTitle();
      if (title.length > 30) {
        return title.substring(0, 30) + "...";
      } else {
        return title;
      }
    } else {
      return "Steps";
    }
  };

  return (
    <Layout
    style={{
      backgroundColor: "rgba(255, 255, 255, 0)",
    }}
  >
    <Row>
      <Col span={10}>
        <Collapse style={{ ...defaultStyle }}>
          <Panel key="1" header="Goals">
            <ThemesList
              onItemSelected={(item: Iterable) => {
                setTheme(item);
              }}
            />
          </Panel>
          <Panel key="2" header={getPanelTitle()}>
            <CardsList
              onItemSelected={(item: Iterable) => {
                setCard(item);
              }}
              theme={theme}
            />
          </Panel>
        </Collapse>
      </Col>
      <Col span={14}>
        {card !== undefined && card.getId() !== 0 && (
          <CardMarkDownUpdated
            theme={theme}
            card={card}
            closeModalCallback={() => {
              setCard(iterableBuilder(0, "", ""));
            }}
            size={{
              height: 500,
              width: 570,
            }}
          />
        )}
      </Col>
    </Row>
  </Layout>
  );
}

const defaultStyle = {
  width: 430,
  marginLeft: "5px",
  boxShadow: "-0 0 5px rgba(0, 0, 0, 0.5)",
  borderRadius: 2,
  paddingLeft:"2px",
};
