import { useEffect, useState } from "react";
import { useUser } from "./hooks/useUser";
import ListInfinite from "./ListInfinite";
import { Button, Space, Collapse, Tooltip } from "antd";
import Iterable from "./types/Iterable";
import AddGoalModal from "./AddGoalModal";
import { Empty_Iterable } from "./types/IterableClass";
import { PlusSquareFilled } from "@ant-design/icons";

import StepsList from "./StepsList";
import StepModal from "./StepModal";

const { Panel } = Collapse;

const GoalsList: React.FC = () => {
  const _user = useUser();
  const [_goal, setGoal] = useState<Iterable>(Empty_Iterable);
  const [modalOpen, setModalOpen] = useState(false);
  const [reloadList, setReloadList] = useState(false);
  const [modalStepOpen, setModalStepOpen] = useState(false);

  useEffect(() => {
    if (reloadList) setReloadList(false);
  }, [reloadList]);

  function closeModal(): void {
    setModalOpen(false);
    setReloadList(!reloadList);
  }

  function openModal(): void {
    setModalOpen(true);
  }

  function onSelectedGoal(item: Iterable): void {
    setGoal(item);
  }

  

  const renderItem = (
    item: Iterable,
    onItemSelected: (item: Iterable) => void
  ) => (
    <div>
      {/* //fix the bug related to step not attached to the goal properly when it is created */}
      {item != null && (
        <StepModal
          goalType={""}
          goalId={item.getId()}
          step={Empty_Iterable}
          openModal={modalStepOpen}
          closeModalCallback={function (): void {
            setReloadList(true);
            setModalStepOpen(false);
          }}
        />
      )}

      <Collapse>
        <Panel
        
          key={item.getId()}
          header={
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ flex: 1 }}>{item.getTitle()}</span>
              <Tooltip title="Add a step" trigger="hover">
                <PlusSquareFilled
                  style={{ fontSize: "16px", cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation(); // blocks the panel to collapse when button is clicked
                    setModalStepOpen(true);
                  }}
                />
              </Tooltip>
            </div>
          }
        >
          <StepsList
            goalId={item.getId()}
            onItemSelected={onItemSelected}
            onListOrderChange={() => console.log()}
          />
        </Panel>
      </Collapse>
    </div>
  );

  return (
    <>
      <AddGoalModal openModal={modalOpen} closeModalCallback={closeModal}/>
      <Space direction="horizontal">
        <Button type="text" onClick={openModal} style={{ border:'1px solid rgb(202, 200, 200)' }}>
          Add goal
        </Button>
      </Space>

      <ListInfinite
        key={reloadList ? "reload" : "no-reload"}
        onItemSelected={onSelectedGoal}
        requestUrl={`api/goals/${_user.userid}`}
        requestParams={(pageNo: number) => ({
          pageNo: pageNo,
          pageSize: 10,
          sortBy: "id",
          direction: "desc",
        })}
        renderItem={renderItem}
      />
    </>
  );
};

export default GoalsList;
