import React, { useState, useEffect } from "react";
import {
  Layout,
  Divider,
  List,
  Typography,
  Button,
  Flex,
  Skeleton,
} from "antd";
import { fetchWords, fetchWordsByUserId } from "../service/wordService";
import InfiniteScroll from "react-infinite-scroll-component";

interface Word {
  id: number;
  word: string;
  checked: null;
  langLevel: null;
}

const AppWordList: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [page, setPage] = useState(0);
  const [doesHaveMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadWords = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    let response = await fetchWordsByUserId(1, page, 50);
    setWords([...words, ...response.content]);
    setHasMore(!response.last);
    setPage(page + 1);
    setLoading(false);
  };
  useEffect(() => {
    loadWords();
  }, []);

  const [clickedItemId, setClickedItemId] = useState<number>();
  const handleClick = (id: number) => {
    console.log(`Clicked on ${id}`);
    setClickedItemId(id);
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
      <div
        id="scrollableDiv"
        style={{
          height: 500,
          overflow: "auto",
        }}
      >
        <InfiniteScroll
          dataLength={words.length}
          next={loadWords}
          hasMore={doesHaveMore}
          scrollableTarget="scrollableDiv"
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        >
          <List
            dataSource={words}
            renderItem={(item: Word) => (
              <List.Item
                key={item.id}
                style={{
                  borderRadius: "1px",
                  height: "25px",
                  fontSize: "12px",
                  paddingLeft: "7px",
                  fontFamily: "Merriweather",
                  background: clickedItemId === item.id ? "#D2CB9B" : "white",
                }}
                onClick={() => handleClick(item.id)}
              >
                {item.word}
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
      <div onClick={handleAddWord} style={styles.addButton}>
          [add]
        </div>
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
