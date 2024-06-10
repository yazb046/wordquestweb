import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import CardMarkDownUpdated from "./CardMarkDownUpdated";
import Iterable from "../../../types/Iterable";

interface AddCardModelProps {
  openModal: boolean;
  onCloseModal: () => void;
  theme: Iterable;
  card: Iterable;
}

const AddCardModel: React.FC<AddCardModelProps> = ({
  openModal,
  onCloseModal,
  theme,
  card,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [internalTheme, setInternalTheme] = useState(theme);

  useEffect(() => {
    if(theme !== undefined && theme.getId() !== internalTheme.getId()){
      setInternalTheme(theme);
    }
  }, [theme]);


  useEffect(() => {
    setIsModalOpen(openModal);
  }, [openModal]);

  return (
    <Modal
      width={800}
      style={{}}
      open={isModalOpen}
      footer={null}
      closable={false}
    >
      <CardMarkDownUpdated
        onCloseCard={onCloseModal}
        theme={internalTheme}
        card={card}
        outerStyle={undefined}
      />
    </Modal>
  );
};

export default AddCardModel;

const defaultStyle ={
  top: "50%", 
  transform: "translateY(-50%)"
}
