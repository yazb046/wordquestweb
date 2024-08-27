import React, { useEffect, useState } from "react";
import { useGoalId } from "./hooks/useGoalId";
import { PlusSquareFilled, ProfileFilled } from "@ant-design/icons";
import { Collapse, Tooltip } from "antd";

import StepModal from "./StepModal";
import StepsList from "./StepsList";
import { Empty_Iterable } from "./types/IterableClass";

import Iterable from "./types/Iterable";
const { Panel } = Collapse;

interface Props {
  item: any;
}

const GoalListItem: React.FC<Props> = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [reloadList, setReloadList] = useState(false);
  const [goalId, setGoalId] = useGoalId();
  const [_goalId, setLocalGoalId] = useState(0);
  
  useEffect(() => {
    // implement redux to store Global variables
    setGoalId(_goalId)
    console.log("new goal id" + goalId);
  }, [_goalId]);

  useEffect(() => {
    if (reloadList) setReloadList(false);
  }, [reloadList]);

  const onClickAddStep = (e:any) =>{
    e.stopPropagation(); // blocks the panel to collapse when button is clicked
    console.log("Add button clicked for " + e);
    setModalOpen(true);
  }

  const onClickViewSteps = (e:any, itemId:number) =>{
    e.stopPropagation(); // blocks the panel to collapse when button is clicked
    console.log("view steps is clicked for " + itemId);
    setLocalGoalId(itemId);
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
              <Tooltip title="View steps" trigger="hover">
                <ProfileFilled
                  style={{ fontSize: "16px", cursor: "pointer" }}
                  onClick={(e) => onClickViewSteps(e,item.getId())}
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

