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
import ImageUploadForm from "./ImageUploadForm";

interface ModalProps {
  theme: Iterable;
  card: Iterable;
  outerStyle: any;
  onCloseCard: () => void;
}

const CardMarkDownUpdated: React.FC<ModalProps> = ({
  theme,
  card,
  outerStyle,
  onCloseCard,
}) => {
  const [internalTheme, setInternalTheme] = useState<Iterable>(
    iterableBuilder(0, "", "")
  );
  const [internalCardId, setInternalCardId] = useState(0);
  const [editableContent, setEditableContent] = useState("");
  const [editableTitle, setEditableTitle] = useState("");
  const [openAddImageForm, setOpenAddImageForm] = useState(false);
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

  const onPressAddImage = () => {
    setOpenAddImageForm(true);
  };

  return (
    <Card
      bordered={false}
      style={{
        marginLeft: outerStyle === undefined ? "0px" : outerStyle.marginLeft,
        width: outerStyle === undefined ? 750 : outerStyle.width,
        height: outerStyle === undefined ? 500 : outerStyle.height + 60,
        boxShadow: "-0 0 8px rgba(0, 0, 0, 2)",
      }}
    >
      <Input
        placeholder={"add step title"}
        value={editableTitle}
        onChange={handleTitleChange}
      />

      <Content
        onClick={onContentClick}
        style={{
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
              height: outerStyle === undefined ? 350 : outerStyle.height - 120,
              width: outerStyle === undefined ? 700 : outerStyle.width - 60,
              resize: "none",
              fontFamily: "Merriweather",
            }}
          />
        ) : (
          <div
            style={{
              height: outerStyle === undefined ? 350 : outerStyle.height - 120,
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

        {openAddImageForm && <ImageUploadForm themeId={theme.getId()}/>}
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
        <Button style={{ marginRight: "5px" }} onClick={onPressAddImage}>
          Add image
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
