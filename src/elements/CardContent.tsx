import { Row, Col, Image, Button, Space, Typography } from "antd";
const { Paragraph } = Typography;
import { useState } from "react";
import Iterable from "../types/Iterable";
interface Props {
    context: Iterable;
}
const CardContent: React.FC<Props> = ({ context }) => {
  const [textContent, setText] = useState("");
  const [synth, setSynth] = useState(window.speechSynthesis);

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  const handlePlay = () => {
    if (!textContent) return;

    const utterance = new SpeechSynthesisUtterance(textContent);
    synth.speak(utterance);
  };
  const [editableStr, setEditableStr] = useState("This is an editable text.");

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <Space direction="vertical">
            <Paragraph editable={{ onChange: setEditableStr }} copyable>
              {context.getContent()}
            </Paragraph>
            <Button
              onClick={handlePlay}
              disabled={!context}
              // style={{ padding: "5px" }}
            >
              Play
            </Button>
          </Space>
        </Col>
        <Col span={10}>
          <Image
            src="https://via.placeholder.com/150"
            alt="placeholder"
            width={300}
            height={300}
          />
        </Col>
      </Row>
    </>
  );
};

const styles = {};

export default CardContent;
