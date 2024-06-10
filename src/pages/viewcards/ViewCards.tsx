import { Col, Collapse, Layout, Row, Space, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { fetchAllCardsByUserId } from "../../service/cardService";
import Iterable from "../../types/Iterable";
import ThemesList from "./components/ThemesList";
import CardsList from "./components/CardsList";
import { iterableBuilder } from "../../types/IterableClass";
import CardMarkDownUpdated from "./components/CardMarkDownUpdated";
import { PlusSquareFilled } from "@ant-design/icons";
import AddCardModel from "./components/AddCardModel";
import AddThemeModel from "./components/AddThemeModel";
const { Panel } = Collapse;

const fetchItems = function (pageNo: number) {
  return fetchAllCardsByUserId(1, pageNo, 10, "id", "asc");
};

export default function ViewCards() {
  const [theme, setTheme] = useState<Iterable>(iterableBuilder(0, "", ""));
  const [card, setCard] = useState<Iterable>(iterableBuilder(0, "", ""));
  const [reloadCardList, setReloadCardList] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCard(iterableBuilder(0, "", ""));
  }, [theme]);

  const getPanelTitle = function () {
    if (theme !== undefined && theme.getId() > 0) {
      let themeTitle = theme.getTitle();

      let title = "Steps to: ";
      if (themeTitle.length > 20) {
        themeTitle = themeTitle.substring(0, 20) + "...";
      }

      return title + themeTitle;
    } else {
      return "Steps";
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setReloadCardList(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setReloadCardList(false);
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
              <Space direction="vertical">
                <>
                  <AddThemeModel
                    openModal={isModalOpen}
                    closeModalCallback={closeModal}
                  />
                  <Tooltip title="add a goal" trigger="hover">
                    <PlusSquareFilled onClick={openModal} />
                  </Tooltip>
                </>
                <ThemesList
                  onItemSelected={(item: Iterable) => {
                    setTheme(item);
                  }}
                />
              </Space>
            </Panel>
            <Panel key="2" header={getPanelTitle()}>
              <Space direction="vertical">
                {theme !== undefined && theme.getId() != 0 && (
                  <>
                    <Tooltip title="add a new card" trigger="hover">
                      <PlusSquareFilled onClick={openModal} />
                    </Tooltip>
                    <AddCardModel
                      openModal={isModalOpen}
                      onCloseModal={closeModal}
                      theme={theme}
                      card={iterableBuilder(0, "", "")}
                    />
                  </>
                )}

                <CardsList
                  onItemSelected={(item: Iterable) => {
                    setReloadCardList(false);
                    setCard(item);
                  }}
                  reloadList={reloadCardList}
                  theme={theme}
                />
              </Space>
            </Panel>
          </Collapse>
        </Col>
        <Col span={14}>
          {card !== undefined && card.getId() !== 0 && (
            <CardMarkDownUpdated
              onCloseCard={() => {
                setReloadCardList(true);
                setCard(iterableBuilder(0, "", ""));
              }}
              theme={theme}
              card={card}
              outerStyle={{
                marginLeft:"20px",
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
  paddingLeft: "2px",
};
