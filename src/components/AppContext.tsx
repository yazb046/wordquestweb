import Word from "../types/WordType";
import React, { useEffect, useState } from "react";
import ListScrollable from "../elements/ListScrollable";
import { textBuilder } from "../types/TextType";
import { fetchUserWordRelatedContext } from "../service/textService";

interface AppContextProps {
  word: Word;
}

const AppContext: React.FC<AppContextProps> = ({ word }) => {

  const fetchDataFunction = async (word:Word, pageNo: number) => {
    return await fetchUserWordRelatedContext(1, word, pageNo);
  };

  return (
    <>
      {word && word.id > 0 && (
        <>
          <ListScrollable
            listClearTriggerObject={word}
            callbackFunction={fetchDataFunction}
            listItemType={textBuilder(0, "")}
            listItemDefaultInstance={textBuilder(0, "")}
            scrollListBoxStyle={{
              height: 75,
              overflow: "auto",
            }}
          />
        </>
      )}
    </>
  );
};

export default AppContext;
