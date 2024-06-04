import { Button, Card, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Content, Footer } from "antd/es/layout/layout";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { iterableBuilder } from "../../../types/IterableClass";
import Iterable from "../../../types/Iterable";
import { useTheme } from "../../../hooks/useTheme";
import axios from "axios";
import Config from "../../../Config";
import { useToken } from "../../../hooks/useToken";

interface ModalProps {
  theme:Iterable 
  closeModalCallback: () => void;
}

const CardMarkDownUpdated: React.FC<ModalProps> = ({
    theme,
    closeModalCallback,
  }) => {  
  const [editableContent, setEditableContent] = useState("");
  const [editableTitle, setEditableTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [token] = useToken();

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
    let card = iterableBuilder(0, editableTitle, editableContent);
    let path = `api/cards/${theme.getId()}`;

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

 
  const handleTitleChange = (event:any) => {
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
    closeModalCallback();
    setEditableTitle("");
    setEditableContent("");
  };


  return (
    <Card
      bordered={false}
      style={{
        alignSelf: "end",
        justifyContent: "end",
        width: "680px",
        height: "500px",
        padding: "5px",
        marginTop: "40px",
        margin: "10px",
        marginBottom: "80px",
        alignItems: "center",
        boxShadow: "-0 0 8px rgba(0, 0, 0, 2)",
      }}
    >
      <div>{theme.getTitle()}</div>
      <Input placeholder={"add step title"} value={editableTitle} onChange={handleTitleChange}/>

      <Content
        onClick={onContentClick}
        style={{
          height: "300px",
          width: "622px",
          marginTop: "10px",
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
              height: "280px",
              width: "622px",
              resize: "none",
              fontFamily: "Merriweather",
            }}
          />
        ) : (
          <div
            style={{
              height: "280px",
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
      <Footer style={{ height: "32px", padding: "0px", margin: "0px" }}>
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
        <Button
          style={{ marginRight: "5px" }}
          onClick={onPressCancel}
        >
          Cancel
        </Button>
        <Button
          style={{ marginRight: "5px" }}
          onClick={onPressOk}
        >
          Ok
        </Button>
      </Footer>
    </Card>
  );
}

export default CardMarkDownUpdated;
