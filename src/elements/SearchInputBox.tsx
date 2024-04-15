import { Space, Button, Input } from "antd";
const { Search } = Input;

interface Props {
  onSearch: any;
  searchText: any;
  setSearchText: any;
  onClearButtonClick:any;
}

const SearchInputBox: React.FC<Props> = ({
  onSearch,
  searchText,
  setSearchText,
  onClearButtonClick,
}) => {
  return (
    <div>
      <Space.Compact style={{ width: "100%" }}>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 235, paddingBottom: "5px" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button type="primary" onClick={onClearButtonClick}>
          Clear
        </Button>
      </Space.Compact>
    </div>
  );
};

export default SearchInputBox;
