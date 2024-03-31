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

const levels = ['all', 'a1', 'a2', 'b1', 'b2', 'c1', 'c2'];

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

  const handleChange = (value:string) => {
    setLangLevel(value);
  };


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
      <Space direction="vertical">
      <Radio.Group size="small" value={langLevel} onChange={(e) => handleChange(e.target.value)}>
        {levels.map((level) => (
          <Radio.Button key={level} value={level}>
            {level.toUpperCase()}
          </Radio.Button>
        ))}
      </Radio.Group>
    </Space>
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
