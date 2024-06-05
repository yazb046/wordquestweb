import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import CardMarkDownUpdated from "./CardMarkDownUpdated";
import Iterable from "../../../types/Iterable";

interface AddCardModelProps {
  openModal: boolean;
  closeModalCallback: () => void;
  theme: Iterable;
  card: Iterable;
}

const AddCardModel: React.FC<AddCardModelProps> = ({
  openModal,
  closeModalCallback,
  theme,
  card,
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
      <CardMarkDownUpdated
        closeModalCallback={closeModalCallback}
        theme={theme}
        card={card}
        size={undefined}
      />
    </Modal>
  );
};

export default AddCardModel;
