import { Row, Col, Image, Button, Space, Typography, Layout } from "antd";
const { Paragraph } = Typography;
import { useEffect, useState } from "react";
import Iterable from "../types/Iterable";
import { textBuilder } from "../types/TextType";
import { saveNewCard } from "../service/cardService";
interface Props {
  word:Iterable,
  context: Iterable;
  closeEvent:any;
}
const CardContent: React.FC<Props> = ({ word, context, closeEvent}) => {
  const [editableContext, setEditableContext] = useState<Iterable>(
    textBuilder(0, "")
  );
  const [comment, setComment] = useState("add comment");
  const [editableText, setEditableText] = useState("");

  useEffect(() => {
    if (editableText === "") {
      setEditableContext(context);
      setEditableText(context.getContent());
    }
  }, [context]);

  const handleClose = () => {
    setEditableText("");
    setEditableContext(textBuilder(0, ""));
    closeEvent();
  };

  const handleSave = () => {
    if (editableContext.getId() !== 0) {
      editableContext.setContent(editableText);
    }
    saveNewCard(1, word.getId(), editableContext, comment);
    handleClose();
  };

  const handleUpdate = (text: string) => {
    setEditableText(text);
  };

  const handleUpdateComment = (text: string) => {
    setComment(text);
  };

  return (
    <>
      <Space direction="horizontal">
        <Space style={{ height: "250px", width: "470px" }} direction="vertical">
          <Paragraph
            style={{
              display: "inline",
              marginTop: "10px",
              textAlign: "left", // Align text to the left
              verticalAlign: "top", // Align text to the top
              maxHeight: "110px",
              overflow: "auto",
            }}
            editable={{
              tooltip: "Compose/Edit",
              maxLength: 250,
              onChange: handleUpdate,
              text: editableText,
            }}
            copyable
          >
            {editableText}
          </Paragraph>
          <Paragraph
            defaultValue={"add comment"}
            editable={{
              tooltip: "comment",
              maxLength: 500,
              onChange: handleUpdateComment,
            }}
            style={{
              margin: "10px",
              textAlign: "left", // Align text to the left
              verticalAlign: "top", // Align text to the top
              maxHeight: 100,
              overflow: "auto",
            }}
          >
            {comment}
          </Paragraph>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              margin: "10px",
            }}
          >
            <Button style={{ marginRight: "5px" }} onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </Space>

        <Image
          src="https://via.placeholder.com/150"
          alt="placeholder"
          width={250}
          height={250}
          style={{ alignSelf: "flex-end" }}
        />
      </Space>
    </>
  );
};

const styles = {};

export default CardContent;
