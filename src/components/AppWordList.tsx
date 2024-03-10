import React, { useState } from "react";
import { Layout, Divider, List, Typography, Button, Flex } from "antd";

interface Word {
  id: number;
  word: string;
  checked: null;
  langLevel: null;
}

const AppWordList: React.FC = () => {
  
  const [clickedItem, setClickedItem] = useState<string>('');
  const handleClick = (item: string) => {
    console.log(`Clicked on ${item}`);
    setClickedItem(item);
  };

  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const handleAddWords = (newWords: string[]) => {
    setSelectedWords(newWords);
  };

  const [ascending, setAscending] = useState(true);
  const handleSort = () => {
    //call server for sorted list
    setAscending(!ascending);
  };

  const [showNew, setShowNew] = useState<boolean>(false);
  const handleShowNew = () => {
    //call server for newly added words with sorting
    setShowNew(!showNew);
  };
  const [showWip, setShowWip] = useState<boolean>(false);
  const handleShowWip = () => {
    //call server for WIP words with sorting
    setShowWip(!showWip);
  };
  const [showDone, setShowDone] = useState<boolean>(false);
  const handleShowDone = () => {
    //call server for DONE words with sorting with useEffect
    setShowDone(!showDone);
  };

  const handleAddWord = () => {
   //call server to send dictioner list
  };

  return (  
    <div>
      <div style={styles.boxTitle}>my list</div>
      <List
        style={{ borderRadius: "4px" }}
        size="small"
        bordered
        header={<Flex >
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
      </Flex>}
        footer={<div onClick={handleAddWord} style={styles.addButton}>
        [add]
      </div>}
        dataSource={["text1", "text2", "text3"]}
        renderItem={(item: string) => (
          <List.Item
            style={{
              borderRadius: "1px",
              height: "25px",
              fontSize: "12px",
              paddingLeft:'7px',
              fontFamily:'Merriweather',
              background: clickedItem === item ? "#D2CB9B" : "white",
            }}
            onClick={() => handleClick(item)}
          >
            {item}
          </List.Item>
        )}
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
    marginLeft:'0px',
    margin: "3px",
    color:'red',
  },
  smallButton: {
    fontFamily: "Ropa Sans",
    cursor: "pointer",
    fontSize: "12px",
    padding: "0px",
    marginTop: "0px",
    marginBottom: "10px",
    marginRight: "5px",
    color:'blue',
  },
  boxTitle: {
    fontSize: "14px",
    color: "#867373",
    fontWeight: "bold",
    fontFamily: "Roboto Mono",
    paddingBottom:'10px',
  },
};

export default AppWordList;
