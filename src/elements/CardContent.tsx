import { Row, Col, Image, Button, Space, Typography } from "antd";
const { Paragraph } = Typography;
import { useEffect, useState } from "react";
import Iterable from "../types/Iterable";
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
      setEditableText(context.getContent());
    }
  }, [context]);

  const handleDelete = () => {
    setEditableText("");
    setEditableContext(textBuilder(0, ""));
  };

  const handleSave = () => {
    if (editableContext.getId() !== 0) {
      editableContext.setContent(editableText);
    }
    saveNewCard(1, editableContext);
    handleDelete();
  };

  const handleUpdate = (text: string) => {
    setEditableText(text);
  };

  return (
    <>
     <Space direction="vertical">
      <Row gutter={[16, 8]}>
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
              style={{ paddingBottom: "5px" }}
            ></Space>

            <Paragraph editable style={{ maxHeight: 100, overflow: "auto" }}>
              {"comments comments comments"}
            </Paragraph>
          </Space>
        </Col>
        <Col span={10} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Image
            src="https://via.placeholder.com/150"
            alt="placeholder"
            width={250}
            height={250}
          />
        </Col>
      </Row>
      <div style={{ position: 'absolute', bottom: 0, left: 0, margin: '10px' }}>
     
        <Button style={{marginRight:'5px'}}onClick={handleDelete}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      
      </div>
      </Space>
    </>
  );
};

const styles = {};

export default CardContent;
