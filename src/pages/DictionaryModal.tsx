import React from 'react'
import ListScrollable from '../elements/ListScrollable';
import { wordBuilder } from '../types/WordType';
import Iterable from '../types/Iterable';
import { fetchWords } from '../service/wordService';


const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#FFF8D3',
    flex: 1,
    marginRight: 48,
    width: '100%',

  };

  interface Props {
    loadListDataHandler: any;
    clickedItemHandler: (item: Iterable) => void; 
  }  

const DisctionaryModal: React.FC <Props>= ({clickedItemHandler}) => {

  const loadListDataHandler = async () => {
    
  };

  const fetchData = (page: number) => {
    return fetchWords(page, 20,'word','asc');
  };

    return(<>
    <ListScrollable
          addToolTipMessage="pick a word"
          listClearTriggerObject={undefined}
          loadListDataHandler={fetchData}
          listItemDefaultInstance={wordBuilder(0, "")}
          clickedItemHandler={clickedItemHandler}
          scrollListBoxStyle={{
            height: 200,
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



    </>)   
  }
  
  export default DisctionaryModal;