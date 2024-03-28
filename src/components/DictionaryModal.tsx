import React from "react";
import { useState,useEffect} from "react";
import Modal from "antd/es/modal/Modal";
import { Space, Radio } from "antd";
import ListInfinite from "../elements/ListInfinite";
import { fetchWordsByLangLevel, saveWords } from "../service/wordService";
import Iterable from "../types/Iterable";


interface Props {
  openModal:boolean;
  callback:any;
}

const DictionaryModal: React.FC <Props> = ({openModal, callback}) => {

  const [langLevel, setLangLevel] = useState("all");
  const fetchDataFunction = (page: number, langLevel:string) => {
    return fetchWordsByLangLevel(page, 10, "word", "asc", langLevel);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pressedOk, setPressedOk] = useState(false);
  const [pressedCancel, setPressedCancel] = useState(false);

  useEffect(()=>{
    setIsModalOpen(openModal); 
  },[openModal])


  const handleOk = () => {
    setPressedOk(true);
    setPressedCancel(false);
  };

  const handleCancel = () => {
    setPressedOk(false);
    setPressedCancel(true);
    callback();
    setIsModalOpen(false);
  };

  const saveAndClose = (userId:number, items:Iterable[]) => {
    saveWords(userId,items);
    callback();
    setPressedOk(false);
    setPressedCancel(false);
    setIsModalOpen(false);
  }


  return (
    <Modal
      width={"300px"}
      style={{ top: "50%", transform: "translateY(-50%)" }}
      open={isModalOpen}
      onOk={handleOk} 
      onCancel={handleCancel}
      title="pick a word to learn"
    >
      <Space direction="vertical">
        <Radio.Group size="small">
          <Radio.Button value="all" onClick={() => setLangLevel("all")}>
            All
          </Radio.Button>
          <Radio.Button value="a1" onClick={() => setLangLevel("a1")}>
            A1
          </Radio.Button>
          <Radio.Button value="a2" onClick={() => setLangLevel("a2")}>
            A2
          </Radio.Button>
          <Radio.Button value="b1" onClick={() => setLangLevel("b1")}>
            B1
          </Radio.Button>
          <Radio.Button value="b2" onClick={() => setLangLevel("b2")}>
            B2
          </Radio.Button>
          <Radio.Button value="c1" onClick={() => setLangLevel("c1")}>
            C1
          </Radio.Button>
          <Radio.Button value="c2" onClick={() => setLangLevel("c2")}>
            C2
          </Radio.Button>
        </Radio.Group>
        <ListInfinite
          fetchFunction={fetchDataFunction}
          aLangLevel={langLevel}
          pressedOk={pressedOk}
          pressedCancel={pressedCancel}
          save={saveAndClose}
        />
      </Space>
    </Modal>
  );
};

export default DictionaryModal;
