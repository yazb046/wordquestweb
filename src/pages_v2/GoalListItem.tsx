import { PlusSquareFilled } from "@ant-design/icons";
import { Collapse, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import StepModal from "./StepModal";
import StepsList from "./StepsList";
import { Empty_Iterable } from "./types/IterableClass";
const { Panel } = Collapse;

interface Props {
  item: any;
}

const GoalListItem: React.FC<Props> = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [reloadList, setReloadList] = useState(false);

  useEffect(() => {
    if (reloadList) setReloadList(false);
  }, [reloadList]);

  const onClickAddStep = (e:any) =>{
    e.stopPropagation(); // blocks the panel to collapse when button is clicked
    console.log("Add button clicked for " + e);
    setModalOpen(true);
  }

  return (
    <div>
      <StepModal
        key={item.getId()}
        goalType={""}
        goalId={item.getId()}
        step={Empty_Iterable}
        openModal={modalOpen}
        closeModalCallback={function (): void {
          setModalOpen(false);
          setReloadList(!reloadList);
        }}
      />

      <Collapse>
        <Panel
          key={item.getId()}
          header={
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ flex: 1 }}>{item.getTitle()}</span>
              <Tooltip title="Add a step" trigger="hover">
                <PlusSquareFilled
                  style={{ fontSize: "16px", cursor: "pointer" }}
                  onClick={onClickAddStep}
                />
              </Tooltip>
            </div>
          }
        >
          <StepsList
            key={reloadList ? "reload" : "no-reload"}
            goalId={item.getId()}
            onItemSelected={() => console.log()}
            onListOrderChange={() => console.log()}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default GoalListItem;

