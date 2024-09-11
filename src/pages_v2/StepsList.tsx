import Iterable from "./types/Iterable";
import ListInfiniteOrderable from "./ListInfiniteOrderable";
import { useUser } from "./hooks/useUser";

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

  return (
    <div>
      <ListInfiniteOrderable
        requestParams={_params}
        requestUrl={`api/steps`}
       
      />
    </div>
  );
};

export default StepsList;
