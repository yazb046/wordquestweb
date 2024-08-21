import Iterable from "./types/Iterable";
import ListInfiniteOrderable from "./ListInfiniteOrderable";
import { useUser } from "./hooks/useUser";
import ListInfinite from "./ListInfinite";
import StepCardMini from "./StepCardMini";
import { Col } from "antd";
import ListInfiniteGrid from "./ListInfiniteGrid";

interface Props {
  goalId: number | undefined;
  onItemSelected: (item: Iterable) => void;
  onListOrderChange: (list: Iterable[]) => void;
}

const StepsList: React.FC<Props> = ({
  goalId,
  onItemSelected,
  onListOrderChange,
}) => {
  const _params = (pageNo: number) => {
    return {
      pageNo: pageNo,
      pageSize: 10,
      goalId: goalId,
    };
  };

  const renderItem = (item: Iterable) => (
      <StepCardMini item={item} />
  );

  return (
    <>
      <ListInfiniteGrid
        requestParams={_params}
        requestUrl={`api/steps`}
        renderItem={renderItem}
      />
    </>
  );
};

export default StepsList;
