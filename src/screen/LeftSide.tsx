import React, { useEffect, useState } from "react";
import XList from "../component/XList";
import XListItemButton from "../component/XListItemButton";
import XListItemText from "../component/XListItemText";
import { fetchWords } from "../service/ServerService";
import addWordToMyList from "../service/WordService";
import { TWord } from "../types/TWord";

const LeftSide = () => {
  let initialValue: TWord = {
    id: 0,
    word: "initialvalue",
    checked: true,
    langLevel: "basic",
  };
  const [data, setData] = useState<TWord[]>([]);

  useEffect(() => {
    fetchWords(setData);
  }, []);

  return (
    <div style={{ overflowY: "scroll", height: "100vh" }}>
      <XList>
        {data.map((item: TWord) => (
          <XListItemButton
            key={item.id}
            onClick={() => addWordToMyList(1, item.id)}
          >
            <XListItemText primary={item.word} />
          </XListItemButton>
        ))}
      </XList>
    </div>
  );
};

export default LeftSide;
