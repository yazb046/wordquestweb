import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import CardMarkDownUpdated from "./CardMarkDownUpdated";
import Iterable from "../../../types/Iterable";

interface AddCardModelProps {
  openModal: boolean;
  closeModalCallback: () => void;
  theme:Iterable;
}

const AddCardModel: React.FC<AddCardModelProps> = ({
  openModal,
  closeModalCallback,
  theme,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(openModal);
  }, [openModal]);



  return (
    <Modal
      width={"900px"}
      style={{ top: "50%", transform: "translateY(-50%)" }}
      open={isModalOpen}
      footer={null}
      closable={false}
    >
      <CardMarkDownUpdated closeModalCallback={closeModalCallback} theme={theme}/>
    </Modal>
  );
};

export default AddCardModel;
