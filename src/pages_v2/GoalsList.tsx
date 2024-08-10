import { useEffect, useState } from "react";
import { useUser } from "./hooks/useUser";
import ListInfinite from "./ListInfinite";
import { Button, Space } from "antd";
import Iterable from "./types/Iterable";
import AddGoalModal from "./AddGoalModal";
import { Empty_Iterable } from "./types/IterableClass";

import GoalListItem from "./GoalListItem";

interface Props {}

const GoalsList: React.FC<Props> = ({}) => {
  const _user = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [reloadList, setReloadList] = useState(false);

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

  const renderItem = (item: Iterable) => (
    <GoalListItem
      item={item}
    />
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
        onItemSelected={() => console.log()}
        requestUrl={`api/goals/${_user.userid}`}
        requestParams={(pageNo: number) => {
          return {
            pageNo: pageNo,
            pageSize: 10,
            sortBy: "id",
            direction: "desc",
          };
        }}
        renderItem={renderItem}
      ></ListInfinite>
    </>
  );
};

export default GoalsList;
