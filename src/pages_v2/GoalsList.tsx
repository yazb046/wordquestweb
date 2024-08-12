import { useEffect, useState } from "react";
import { useUser } from "./hooks/useUser";
import ListInfinite from "./ListInfinite";
import { Button, Collapse, Space, Tooltip } from "antd";
import Iterable from "./types/Iterable";
import AddGoalModal from "./AddGoalModal";
import { Empty_Iterable } from "./types/IterableClass";
import { PlusSquareFilled } from "@ant-design/icons";
import StepsList from "./StepsList";
import StepModal from "./StepModal";

const { Panel } = Collapse;

const GoalsList: React.FC = () => {
  const _user = useUser();
  const [selectedGoal, setSelectedGoal] = useState<Iterable | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [reloadList, setReloadList] = useState(false);
  const [modalStepOpen, setModalStepOpen] = useState(false);

  useEffect(() => {
    if (reloadList) setReloadList(false);
  }, [reloadList]);

  function closeModal(): void {
    setModalOpen(false);
    setReloadList(true);
  }

  function openModal(): void {
    setModalOpen(true);
  }

  const handleGoalSelection = (item: Iterable) => {
    setSelectedGoal(item);
  };

  const renderItem = (item: Iterable) => (
    <div>
      {item != null && selectedGoal?.getId() === item.getId() && (
        <StepModal
          goalType={""}
          goalId={item.getId()}
          step={Empty_Iterable}
          openModal={modalStepOpen}
          closeModalCallback={() => {
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
                  onClick={() => {
                    setModalStepOpen(true);
                  }}
                />
              </Tooltip>
            </div>
          }
        >
          <StepsList
            goalId={item.getId()}
            onItemSelected={handleGoalSelection}
            onListOrderChange={() => console.log()}
            
          />
        </Panel>
      </Collapse>
    </div>
  );

  return (
    <>
      <AddGoalModal openModal={modalOpen} closeModalCallback={closeModal} />
      <Space direction="horizontal">
        <Button type="text" onClick={openModal}>
          Add goal
        </Button>
      </Space>

      <ListInfinite
        key={reloadList ? "reload" : "no-reload"}
        onItemSelected={handleGoalSelection}
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
