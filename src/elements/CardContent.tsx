import { Row, Col, Image, Button, Space, Typography } from "antd";
const { Paragraph } = Typography;
import { useEffect, useState } from "react";
import Iterable from "../types/Iterable";
import "../assets/css/basic.css";
import { textBuilder } from "../types/TextType";
import { saveNewCard } from "../service/textService";
interface Props {
  context: Iterable;
}
const CardContent: React.FC<Props> = ({ context }) => {

  const [editableContext, setEditableContext] = useState<Iterable>(
    textBuilder(0, "")
  );
  const [editableText, setEditableText] = useState("");

  useEffect(() => {
    if (editableText === "") {
      setEditableContext(context);
      setEditableText(context.getContent())
    }
  }, [context]);

  const handleDelete = () => {
    setEditableText("");
    setEditableContext(textBuilder(0,""))
  };

  const handleSave = () => {
    if(editableContext.getId()!==0){
      editableContext.setContent(editableText);
    }
    saveNewCard(1, editableContext)
    handleDelete();
  }

  const handleUpdate= (text:string)=>{
    setEditableText(text)
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <Space direction="vertical">
            <Paragraph
              editable={{
                tooltip: "Compose/Edit",
                onChange: handleUpdate,
                text: editableText,
              }}
              copyable
            >
              {editableText}
            </Paragraph>
            <Space
              direction="horizontal"
              style={{ paddingBottom: "10px" }}
            ></Space>

            <Paragraph>{"comments comments comments"}</Paragraph>
            <Space direction="horizontal">
              <Button onClick={console.log} disabled={!context}>
                Listen
              </Button>
              <Button onClick={console.log} disabled={!context}>
                Help
              </Button>
              <Button onClick={handleDelete}>Delete</Button>
              <Button onClick={handleSave}>Save</Button>
            </Space>
          </Space>
        </Col>
        <Col span={10}>
          <Image
            src="https://via.placeholder.com/150"
            alt="placeholder"
            width={250}
            height={250}
          />
        </Col>
      </Row>
    </>
  );
};

const styles = {};

export default CardContent;
