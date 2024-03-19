import Word from "../types/WordType";
import ListScrollable from "../elements/ListScrollable";
import { fetchUserWordRelatedContext } from "../service/textService";
import Iterable from "../types/Iterable";
import { textBuilder } from "../types/TextType";

interface AppContextProps {
  word: Iterable;
  setter:(item:Iterable)=>void;
}

const AppContext: React.FC<AppContextProps> = ({ word, setter }) => {
  const fetchDataFunction = async (pageNo: number, word: Word) => {
    return await fetchUserWordRelatedContext(1, word, pageNo);
  };

  return (
    <>
      {word && word.getId() > 0 && (
        <>
         <div style={styles.boxTitle}>pick a context</div>
          <ListScrollable
            clickedItemHandler={setter}
            listClearTriggerObject={word}
            loadListDataHandler={fetchDataFunction}
            listItemDefaultInstance={textBuilder(0, "")}
            scrollListBoxStyle={{
              height: 120,
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

const styles = {
  boxTitle: {
    fontSize: "13px",
    color: "#867373",
    fontWeight: "bold",
    fontFamily: "Roboto Mono",
    paddingBottom: "10px",
  },
};

export default AppContext;
