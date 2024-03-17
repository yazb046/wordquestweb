import Word from "../types/WordType";
import ListScrollable from "../elements/ListScrollable";
import { textBuilder } from "../types/TextType";
import { fetchUserWordRelatedContext } from "../service/textService";

interface AppContextProps {
  word: Word;
}

const AppContext: React.FC<AppContextProps> = ({ word }) => {
  const fetchDataFunction = async (pageNo: number, word: Word) => {
    return await fetchUserWordRelatedContext(1, word, pageNo);
  };

  return (
    <>
      {word && word.id > 0 && (
        <>
          <ListScrollable
            clickedItemHendler={console.log()}
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
