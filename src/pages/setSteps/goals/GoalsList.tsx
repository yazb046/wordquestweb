import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { iterableBuilder } from "../../../types/IterableClass";
import Iterable from "../../../types/Iterable";
import E_ListSimple from "../elements/E_ListSimple";

interface Props {
  onItemSelected: (item: Iterable|null) => void;
  reloadList: boolean;
  onListReloaded: () => void;
}

const GoalsList: React.FC<Props> = ({
  onItemSelected,
  reloadList,
  onListReloaded,
}) => {
  const [_selectedItem, setSelectedItem] = useState<Iterable|null>(null);
  const [doReload, setDoReload] = useState(false);
  const _user = useUser();

  useEffect(() => {
    onItemSelected(_selectedItem);
  }, [_selectedItem]);

  useEffect(() => {
    setDoReload(true);
  }, []);

  useEffect(() => {
    if (reloadList) {
      setDoReload(true);
    }
  }, [reloadList]);

  const _params = (pageNo: number) => {
    return {
      pageNo: pageNo,
      pageSize: 10,
      sortBy: "id",
      direction: "desc",
    };
  };

  return (
      <E_ListSimple
        params={_params}
        onItemSelected={(item: any) => setSelectedItem(item)}
        reloadList={doReload}
        onListReloaded={() => {
          setDoReload(false);
          onListReloaded();
        }}
        requestUrl={`api/cards/theme/${_user.userid}`}
      />
  );
};

export default GoalsList;
