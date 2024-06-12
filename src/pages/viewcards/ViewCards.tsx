import { Col, Collapse, Layout, Row, Space, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { fetchAllCardsByUserId } from "../../service/cardService";
import Iterable from "../../types/Iterable";
import GoalsList from "./components/GoalsList";
import CardsList from "./components/StepsList";
import { iterableBuilder } from "../../types/IterableClass";
import CardMarkDownUpdated from "./components/CardMarkDownUpdated";
import { PlusSquareFilled } from "@ant-design/icons";
import AddThemeModel from "./components/AddThemeModel";
import axios from "axios";
import Config from "../../Config";
import { useToken } from "../../hooks/useToken";
import ImageUploadForm from "./components/ImageUploadForm";
const { Panel } = Collapse;


export default function ViewCards() {
  const [theme, setTheme] = useState<Iterable | null>(null);
  const [card, setCard] = useState<Iterable | null>(null);
  const [reloadCardList, setReloadCardList] = useState(false);
  const [reloadGoalsList, setReloadGoalsList] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token] = useToken();
  const [blockedThemeChange, setBlockedThemeChange] = useState(false);


  useEffect(() => {
    if (card != null) {
      setCard(null);
    }
  }, [theme]);

  const onSaveCard = (item: Iterable) => {
    let path = `api/cards/${theme?.getId()}`;
    axios.post(Config.BACK_SERVER_DOMAIN + path, item, {
      headers: {
        Authorization: token ? `${token}` : null,
      },
    });
  };

  const getPanelTitle = function () {
    if (theme != null) {
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
    setReloadGoalsList(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setReloadGoalsList(false);
  };

  const createNewCard = () => {
      setReloadCardList(false);
      setCard(iterableBuilder(0, "", ""));
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
                <GoalsList
                  reloadList={reloadGoalsList}
                  onItemSelected={(item: Iterable) => {
                    if(!blockedThemeChange) {
                      setTheme(item);}
                      else {
                        alert("save & close step being edited before slecting another goal ");
                      }
                  }}
                />
              </Space>
            </Panel>
            <Panel key="2" header={getPanelTitle()}>
              <Space direction="vertical">
                {theme == null ? (
                  <p>set a goal first</p>
                ) : (
                  <>
                    <Tooltip title="add a new card" trigger="hover">
                      <PlusSquareFilled onClick={createNewCard} />
                    </Tooltip>
                    <CardsList
                      onItemSelected={(item: Iterable) => {
                        setCard(item);
                      }}
                      reloadList={reloadCardList}
                      theme={theme}
                    />
                  </>
                )}
              </Space>
            </Panel>
          </Collapse>
        </Col>
        <Col span={14}>
          {card != null ? 
            <>
              <CardMarkDownUpdated
                onBlock={()=>setBlockedThemeChange(true)}
                onSaveCard={(item:Iterable)=>{
                  onSaveCard(item);
                }}
                onCloseCard={() => {
                  setBlockedThemeChange(false);
                  setReloadCardList(true);
                  setCard(null);
                }}
                card={card}
                outerStyle={{
                  marginLeft: "15px",
                  height: 400,
                  width: 580,
                }}
              />
              <ImageUploadForm themeId={theme?.getId()} />
            </>
          :<></>}
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
