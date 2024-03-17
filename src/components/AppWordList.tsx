import React, { useState } from "react";
import { Flex } from "antd";
import { fetchWordsByUserId } from "../service/wordService";
import WordType from "../types/WordType";
import { wordBuilder } from "../types/WordType";
import ListScrollable from "../elements/ListScrollable";

interface CallbackFunction {
  onActiveWordChange: (item: WordType) => void;
}

const AppWordList: React.FC<CallbackFunction> = ({ onActiveWordChange }) => {
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

  const fetchDataFunction = async (page: number) => {
    return await fetchWordsByUserId(1, page, 50)
  };

  return (
    <div>
      <div style={styles.boxTitle}>my list</div>
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
        listClearTriggerObject={undefined}
        loadListDataHandler={fetchDataFunction}
        listItemDefaultInstance={wordBuilder(0, "")}
        clickedItemHendler={onActiveWordChange}
        scrollListBoxStyle={{
          height: 500,
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

      <div onClick={handleAddWord} style={styles.addButton}> [add] </div>
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
    fontSize: "14px",
    color: "#867373",
    fontWeight: "bold",
    fontFamily: "Roboto Mono",
    paddingBottom: "10px",
  },
};

export default AppWordList;
