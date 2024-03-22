import React, { useState, useEffect } from "react";
import { Flex, Row, Col, Tooltip } from "antd";
import { fetchWordsByUserId } from "../service/wordService";
import Iterable from "../types/Iterable";
import { wordBuilder } from "../types/WordType";
import ListScrollable from "../elements/ListScrollable";
import { DownloadOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import DisctionaryModal from "../pages/DictionaryModal";


interface CallbackFunction {
  setter: (item: Iterable) => void;
}

const AppWordList: React.FC<CallbackFunction> = ({ setter }) => {
  const [ascending, setAscending] = useState(true);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [showWip, setShowWip] = useState<boolean>(false);
  const [showDone, setShowDone] = useState<boolean>(false);

  const handleSort = () => {
    //call server for sorted list
    setAscending(!ascending);
  };

  const handleShowNew = () => {
    //call server for newly added words with sorting
    setShowNew(!showNew);
  };

  const handleShowWip = () => {
    //call server for WIP words with sorting
    setShowWip(!showWip);
  };

  const handleShowDone = () => {
    //call server for DONE words with sorting with useEffect
    setShowDone(!showDone);
  };

  const handleAddWord = () => {
    //call server to send dictioner list
  };

  const fetchDataFunction = (page: number) => {
    return fetchWordsByUserId(1, page, 50);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Row style={{ paddingBottom: "5px" }}>
        <Col span={12} style={{ textAlign: "left" }}>
          <div style={styles.boxTitle}>my list</div>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Tooltip title="add a new word" trigger="hover">
            <DownloadOutlined onClick={openModal} />
          </Tooltip>
        </Col>
      </Row>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title='dictionary'
      >
        <DisctionaryModal cardCloseListener={setter}/>
      </Modal>

      <Flex>
        <div onClick={handleShowNew} style={styles.smallButton}>
          {showNew ? (
            <p style={{ fontWeight: "bold", color: "green" }}>new</p>
          ) : (
            "new"
          )}
        </div>
        <div onClick={handleShowWip} style={styles.smallButton}>
          {showWip ? (
            <p style={{ fontWeight: "bold", color: "green" }}>learning</p>
          ) : (
            "learning"
          )}
        </div>
        <div onClick={handleShowDone} style={styles.smallButton}>
          {showDone ? (
            <p style={{ fontWeight: "bold", color: "green" }}>archived</p>
          ) : (
            "archived"
          )}
        </div>
        <div onClick={handleSort} style={styles.smallButton}>
          {ascending ? "desc[↓]" : "asc[↑]"}
        </div>
      </Flex>
      <ListScrollable
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
