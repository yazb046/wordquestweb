import Word from "../types/WordType";
import ListScrollable from "../elements/ListScrollable";
import { fetchUserWordRelatedContext } from "../service/textService";
import Iterable from "../types/Iterable";
import { textBuilder } from "../types/TextType";

interface AppContextProps {
  word: Word;
  clickedItemHandler:(item:Iterable)=>void;
}

const AppContext: React.FC<AppContextProps> = ({ word, clickedItemHandler }) => {
  const fetchDataFunction = async (pageNo: number, word: Word) => {
    return await fetchUserWordRelatedContext(1, word, pageNo);
  };

  return (
    <>
      {word && word.id > 0 && (
        <>
          <ListScrollable
            clickedItemHandler={clickedItemHandler}
            listClearTriggerObject={word}
            loadListDataHandler={fetchDataFunction}
            listItemDefaultInstance={textBuilder(0, "")}
            scrollListBoxStyle={{
              height: 75,
              overflow: "auto",
            }}
            listItemStyle={{
              borderRadius: "1px",
              height: "auto",
              fontSize: "14px",
              padding: "3px",
              margin: "0px",
              fontFamily: "Merriweather",
              textAlign: "left",
              verticalAlign: "top",
            }}
          />
        </>
      )}
    </>
  );
};

export default AppContext;
