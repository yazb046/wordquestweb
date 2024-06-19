import { Card, Space, Button, Row, Col } from "antd";
import Iterable from "../types/Iterable";
import { CloseOutlined } from "@ant-design/icons";
import { wordBuilder } from "../types/WordType";
import { useEffect, useState } from "react";
import { textBuilder } from "../types/TextType";
import { saveNewCard } from "../service/cardService";
import { Image, Typography } from "antd";
import globalStyles from "../assets/css/globalStyles";
import { Content } from "antd/es/layout/layout";
const { Paragraph } = Typography;
import ReactMarkdown from 'react-markdown';

interface Props {
  word: Iterable;
  context: Iterable;
  cardCloseListener: () => any;
}

const AppCardUpdated: React.FC<Props> = ({
  word,
  context,
  cardCloseListener,
}) => {
  const [activeWord, setActiveWord] = useState<Iterable>(wordBuilder(0, ""));
  const [editableContext, setEditableContext] = useState<Iterable>(
    textBuilder(0, "")
  );
  const [comment, setComment] = useState("add comment");
  const [editableText, setEditableText] = useState("");

  const closeCard = () => {
    setActiveWord(wordBuilder(0, ""));
    cardCloseListener();
  };

  useEffect(() => {
    setActiveWord(word);
    setEditableContext(context);
    setEditableText(context.getContent());
  }, [word, context]);

  const handleClose = () => {
    setEditableText("");
    setEditableContext(textBuilder(0, ""));
    cardCloseListener();
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
    {editableContext.getId()!== 0 && 
    
    <Card
        style={{
          ...globalStyles.card,
          margin: "auto",
          width: 600,
          height: 400,
        }}
        title={activeWord.getContent()}
        extra={<CloseOutlined onClick={closeCard} />}
      >
        <Space direction="horizontal">
          <Content style={{ height: "300px" }}>
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
                textAlign: "left",
                verticalAlign: "top",
                width: "250px",
                overflow: "auto",
              }}
            >
              {comment}
            </Paragraph>
            <Content style={{ margin: "auto" }}>
              <Button style={{ marginRight: "5px" }} onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </Content>
          </Content>
          <Content style={{ height: "300px" }}></Content>
          <Image
            src="https://via.placeholder.com/150"
            alt="placeholder"
            width={250}
            height={250}
            style={{ alignSelf: "flex-end" }}
          />
        </Space>
      </Card>} 
    </>
  );
};

export default AppCardUpdated;
