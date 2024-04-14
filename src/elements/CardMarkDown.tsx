import { Card, Button, Layout } from "antd";
import Iterable from "../types/Iterable";
import { CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Input } from "antd";
import globalStyles from "../assets/css/globalStyles";
import { Content } from "antd/es/layout/layout";
const { TextArea } = Input;
import ReactMarkdown from "react-markdown";
import { cardBuilder } from "../types/CardType";
const { Footer } = Layout;

interface Props {
  card: Iterable;
  handleSave:(card:Iterable)=>void,
  cardCloseListener: () => any;
}

const CardMarkDown: React.FC<Props> = ({ card, cardCloseListener, handleSave }) => {
  const [editableContent, setEditableContent] = useState("");
  const [processingCard, setProcessingCard] = useState<Iterable>(
    cardBuilder(0, "", "")
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (
      editableContent !== "" &&
      editableContent !== processingCard.getContent()
    ) {
      console.log("Save or cancel changes before moving on");
    } else {
      setProcessingCard(card);
      setEditableContent(card.getContent());
    }
  }, [card.getId()]);

  const closeCard = () => {
    setEditableContent("");
    setProcessingCard(cardBuilder(0, "", ""));
    cardCloseListener();
  };

  const onPressCancel = () => {
    closeCard();
  };
  const onPressSave = () => {
    let temp = processingCard;
    temp.setContent(editableContent);
    handleSave(processingCard);
    setProcessingCard(temp);
    setEditMode(false);
  };

  const onPressOk = () => {
    onPressSave();
    closeCard();
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let editedContent  = (e.target.value);
    setEditableContent(editedContent);
  };

  const onPressEdit = () => {
    setEditMode(true);
  };

  return (
    <>
      {processingCard.getId() !== 0 && (
        <Card
          style={{
            ...globalStyles.card,
            margin: "auto",
            width: 600,
            height: 500,
          }}
          title={processingCard.getTitle()}
          extra={<CloseOutlined onClick={closeCard} />}
        >
          <Content style={{ height: "350px", margin: "5px", padding: "0px" }}>
            {editMode ? (
              <TextArea
                showCount
                maxLength={1000}
                onChange={onChange}
                placeholder="add content"
                value={editableContent}
                style={{
                  margin: "0px",
                  padding: "0px",
                  height: "320px",
                  width: "520px",
                  resize: "none",
                }}
              />
            ) : (
              <div
                style={{
                  overflowY: "auto",
                  maxHeight: "320px",
                  maxWidth: "580px",
                  wordWrap: "break-word",
                  whiteSpace: "pre-line",
                }}
              >
                <ReactMarkdown>{editableContent}</ReactMarkdown>
              </div>
            )}
          </Content>
          <Footer style={{ height: "32px", padding: "0px", margin: "0px" }}>
            <Button style={{ marginRight: "5px" }} onClick={onPressCancel}>
              Cancel
            </Button>
            <Button style={{ marginRight: "5px" }} onClick={onPressEdit}>Edit</Button>
            <Button style={{ marginRight: "5px" }} onClick={onPressSave}>
              Save
            </Button>
            <Button style={{ marginRight: "5px" }} onClick={onPressOk}>
              OK
            </Button>
          </Footer>
        </Card>
      )}
    </>
  );
};

export default CardMarkDown;
