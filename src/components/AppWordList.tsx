import React, { useState } from "react";
import { Row, Col, Tooltip } from "antd";
import { fetchWordsByUserId } from "../service/wordService";
import Iterable from "../types/Iterable";
import { wordBuilder } from "../types/WordType";
import ListScrollable from "../elements/ListScrollable";
import { PlusSquareFilled } from "@ant-design/icons";
import DictionaryModal from "./DictionaryModal";

interface CallbackFunction {
  setter: (item: Iterable) => void;
}

const AppWordList: React.FC<CallbackFunction> = ({ setter }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doReload, setDoReload] = useState(false);

  const fetchDataFunction = (page: number) => {
    return fetchWordsByUserId(1, page, 50);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setDoReload(false);
  };

  const closeModal =() =>{
    setDoReload(true);
    setIsModalOpen(false);
  }

  return (
    <div>
      <Row style={{ paddingBottom: "5px" }}>
        <Col span={12} style={{ textAlign: "left" }}>
          <div style={styles.boxTitle}>my list</div>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Tooltip title="add a new word" trigger="hover">
            <PlusSquareFilled onClick={openModal} />
          </Tooltip>
        </Col>
      </Row>
      <DictionaryModal openModal={isModalOpen} callback={closeModal}/>
      <ListScrollable
        doReload={doReload}
        addToolTipMessage="pick a context"
        listClearTriggerObject={undefined}
        loadListDataHandler={fetchDataFunction}
        listItemDefaultInstance={wordBuilder(0, "")}
        clickedItemHandler={setter}
        scrollListBoxStyle={{
          height: 550,
          overflow: "auto",
        }}
        listItemStyle={{
          borderRadius: "1px",
          height: "25px",
          fontSize: "13px",
          paddingLeft: "7px",
          fontFamily: "Merriweather",
          fontWeight: "bold",
        }}
      />
    </div>
  );
};

const styles = {
  addButton: {
    fontFamily: "Ropa Sans",
    cursor: "pointer",
    fontSize: "12px",
    padding: "3px",
    marginLeft: "0px",
    margin: "3px",
    color: "red",
  },
  smallButton: {
    fontFamily: "Ropa Sans",
    cursor: "pointer",
    fontSize: "12px",
    padding: "0px",
    marginTop: "0px",
    marginBottom: "10px",
    marginRight: "5px",
    color: "blue",
  },
  boxTitle: {
    fontSize: "13px",
    color: "#3c9691",
    fontFamily: "Roboto Mono",
    paddingBottom: "10px",
  },
};

export default AppWordList;
