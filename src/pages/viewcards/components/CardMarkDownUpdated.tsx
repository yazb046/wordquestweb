import { Button, Card, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Content, Footer } from "antd/es/layout/layout";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { iterableBuilder } from "../../../types/IterableClass";
import Iterable from "../../../types/Iterable";
import axios from "axios";
import Config from "../../../Config";
import { useToken } from "../../../hooks/useToken";
import globaleStyles from "../../../assets/css/globalStyles";

interface ModalProps {
  theme: Iterable;
  card: Iterable;
  size: any;
  onCloseCard:() => void;
}

const CardMarkDownUpdated: React.FC<ModalProps> = ({
  theme,
  card,
  size,
  onCloseCard,
}) => {
  
  const [internalTheme, setInternalTheme] = useState<Iterable>(
    iterableBuilder(0, "", "")
  );
  const [internalCardId, setInternalCardId] = useState(0);
  const [editableContent, setEditableContent] = useState("");
  const [editableTitle, setEditableTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [token] = useToken();

  useEffect(() => {
    if (theme !== undefined && theme.getId() !== 0) {
      setInternalTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (card !== undefined && card.getId() !== 0) {
      setInternalCardId(card.getId());
      setEditableContent(card.getContent());
      setEditableTitle(card.getTitle());
    }
  }, [card]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let editedContent = e.target.value;
    setEditableContent(editedContent);
  };

  const onContentClick = () => {
    setEditMode(true);
  };

  const saveCard = () => {
    let card = iterableBuilder(internalCardId, editableTitle, editableContent);
    let path = `api/cards/${internalTheme.getId()}`;

    axios.post(Config.BACK_SERVER_DOMAIN + path, card, {
      headers: {
        Authorization: token ? `${token}` : null,
      },
    });
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && event.ctrlKey) {
      setEditMode(false);
    }
  };

  const handleTitleChange = (event: any) => {
    setEditableTitle(event.target.value);
  };

  const onPressCancel = () => {
    close();
  };

  const onPressOk = () => {
    saveCard();
    close();
  };

  const close = () => {
    onCloseCard();
    setEditableTitle("");
    setEditableContent("");
    setInternalCardId(0);
  };

  return (
    <Card
      bordered={false}
      style={{
        alignSelf: "end",
        justifyContent: "end",
        width: size === undefined ? "680px" : size.width,
        height: size === undefined ? "500px" : size.height + 60,
        padding: "5px",
        // marginTop: "15px",
        margin: "10px",
        marginTop:"2px",  
        marginLeft: "20px",
        // marginBottom: "80px",
        alignItems: "center",
        boxShadow: "-0 0 8px rgba(0, 0, 0, 2)",
      }}
    >
      <div
        style={{
          alignSelf: "end",
          justifyContent: "end",
          marginBottom: "5px",
          alignItems: "center",
          textOverflow: "ellipsis", 
          overflow: "hidden",
        }}
      >
        {internalTheme.getTitle()}
      </div>
      <Input
        placeholder={"add step title"}
        value={editableTitle}
        onChange={handleTitleChange}
      />

      <Content
        onClick={onContentClick}
        style={{
          width: size === undefined ? "622px" : size.width - 60,
          height: size === undefined ? "370px" : size.height - 120,
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        {editMode ? (
          <TextArea
            onKeyDown={handleKeyDown}
            showCount
            maxLength={1000}
            onChange={onChange}
            placeholder="add step description"
            value={editableContent}
            style={{
              padding: "0px",
              border: "1px solid #E5E4E2",
              borderRadius: "5px",
              height: size === undefined ? "350px" : size.height - 120,
              width: size === undefined ? "622px" : size.width - 60,
              resize: "none",
              fontFamily: "Merriweather",
            }}
          />
        ) : (
          <div
            style={{
              height: size === undefined ? "350px" : size.height - 120,
              border: "1px solid #E5E4E2",
              padding: "5px",
              paddingLeft: "10px",
              paddingRight: "10px",
              borderRadius: "5px",
              fontFamily: "Merriweather",
              wordWrap: "break-word",
              // whiteSpace: "pre-line",
            }}
          >
            <ReactMarkdown>{editableContent}</ReactMarkdown>
          </div>
        )}
      </Content>
      <Footer style={{ height: "32px", padding: "0px", marginTop: "10px" }}>
        <Button
          style={{ marginRight: "5px" }}
          onClick={() => setEditMode(false)}
        >
          View
        </Button>
        <Button
          style={{ marginRight: "5px" }}
          onClick={() => setEditMode(true)}
        >
          Edit
        </Button>
        <Button style={{ marginRight: "5px" }} onClick={onPressCancel}>
          Cancel
        </Button>
        <Button style={{ marginRight: "5px" }} onClick={onPressOk}>
          Ok
        </Button>
      </Footer>
    </Card>
  );
};

export default CardMarkDownUpdated;
