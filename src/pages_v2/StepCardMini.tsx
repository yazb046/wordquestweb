import React, { useState } from "react";
import Iterable from "./types/Iterable";
import CardMarkDownBasic from "./CardMarkDownBasic";
import { Card } from "antd";
import { Empty_Iterable } from "../types/IterableClass";
import StepModal from "./StepModal";

interface Props {
  item: Iterable;
}

const StepCardMini: React.FC<Props> = ({ item }) => {
    const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
        <StepModal
        key={item.getId()}
        goalType={""}
        goalId={item.getId()}
        step={item}
        openModal={modalOpen}
        closeModalCallback={function (): void {
          setModalOpen(false);
        }}
      />
      <Card
        onClick={function (): void {
            setModalOpen(true);
          }}
        bordered={false}
        style={{
          margin: "10px",
          width: 340,
          height: 250,
          boxShadow: "-0 0 8px rgba(0, 0, 0, 2)",
        }}
      ><div>
        {item.getTitle()}
        </div>
        <div>
        {item.getContent()}
        </div>
        </Card>
    </div>
  );
};

export default StepCardMini;
