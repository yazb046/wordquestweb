import { Space } from "antd";
import Radio from "antd/es/radio";
import ListInfinite from "../elements/ListInfinite";

export default function DisctionaryModal() {
  return (
    <Space direction="vertical">
      <Radio.Group size="small">
        <Radio.Button value="a1">A1</Radio.Button>
        <Radio.Button value="a2">A2</Radio.Button>
        <Radio.Button value="b1">B1</Radio.Button>
        <Radio.Button value="b2">B2</Radio.Button>
        <Radio.Button value="c1">C1</Radio.Button>
        <Radio.Button value="c2">C2</Radio.Button>
      </Radio.Group>
      <ListInfinite />
    </Space>
  );
}
