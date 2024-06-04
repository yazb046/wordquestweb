import { Input, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import Config from "../../../Config";
import { useToken } from "../../../hooks/useToken";

interface AddThemeModelProps {
  openModal: boolean;
  closeModalCallback: () => void;
}

const AddThemeModel: React.FC<AddThemeModelProps> = ({
  openModal,
  closeModalCallback,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const user = useUser();
  const [token, setToken] = useToken();

  useEffect(() => {
    setIsModalOpen(openModal);
  }, [openModal]);

  const saveTheme = (str: string) => {
    let path = `api/cards/theme/${user.userid}`;
    const body = {
      title: inputValue,
      description: "",
    };

    axios.post(Config.BACK_SERVER_DOMAIN + path, body, {
      headers: {
        Authorization: token ? `${token}` : null,
      },
    }
  );
  };

  const handleOk = () => {
    if (inputValue.trim().length > 0) {
      saveTheme(inputValue);
    }
    handleClose();
  };

  const handleClose = () => {
    setInputValue("");
    setIsModalOpen(false);
    closeModalCallback();
  };

  const onEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent new line
      saveTheme(inputValue);
      setInputValue("");
      handleClose();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Modal
      width={"600px"}
      style={{ top: "50%", transform: "translateY(-50%)" }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleClose}
    >
      <Input.TextArea
        showCount
        maxLength={150}
        autoSize={{ minRows: 1, maxRows: 6 }}
        placeholder="Add a new theme"
        value={inputValue}
        onChange={handleChange}
        style={{ marginBottom: "20px", marginTop: "30px" }}
        onKeyDown={onEnter}
      />
    </Modal>
  );
};

export default AddThemeModel;
