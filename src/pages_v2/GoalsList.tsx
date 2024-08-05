import { useCallback, useEffect, useState } from "react";
import StepsList from "./StepsList";
import { useUser } from "../hooks/useUser";
import ListInfinite from "./ListInfinite";
import { Button } from "antd";
import Iterable from "../types/Iterable";
import AddGoalModal from "./AddGoalModal";

interface Props {}

const GoalsList: React.FC<Props> = ({}) => {
  const _user = useUser();
  const [goal, setGoal] = useState<Iterable | null>();

  const requestParams = (pageNo: number) => {
    return {
      pageNo: pageNo,
      pageSize: 10,
      sortBy: "id",
      direction: "desc",
    };
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [reloadList, setReloadList] = useState(false);

  function closeModal(): void {
    setModalOpen(false);
    setReloadList(true);
  }

  function openModal(): void {
    setModalOpen(true)
    setReloadList(false);
  }

  function onSelectedGoal(item : Iterable): void {
    setGoal(item);
  }


  return (
    <>
      <AddGoalModal openModal={modalOpen} closeModalCallback={closeModal} />
      <Button type="text" onClick={openModal}>
        Add goal
      </Button>
      <ListInfinite
        key={reloadList ? 'reload' : 'no-reload'}
        onItemSelected={onSelectedGoal}
        requestUrl={`api/goals/${_user.userid}`}
        requestParams={requestParams}
        listItemDisplayTemplate={function (item: Iterable | null): string {
          return "";
        }}
      >
        {/* <StepsList goal={goal} onItemSelected={undefined} /> */}
      </ListInfinite>
    </>
  );
};

export default GoalsList;
