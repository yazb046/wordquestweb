import { Input, Modal, Select, SelectProps } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { useToken } from "../../../hooks/useToken";
import { SizeType } from "antd/es/config-provider/SizeContext";
import CONFIG from "../../../Config";


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
  const [addOn, setAddOn]= useState("");
  const [_token] = useToken();
  const [_options, setOptions] = useState<SelectProps['options']>([]);
  const [size, setSize] = useState<SizeType>('middle');


  useEffect(() => {
    fetchAddOns();
  }, []);

  useEffect(() => {
    setIsModalOpen(openModal);
  }, [openModal]);

  const fetchAddOns = function () {
    let path = `api/cards/theme/addOns`;
    return axios
      .get(CONFIG.BACK_SERVER_DOMAIN + path, {
        headers: { Authorization: _token ? `${_token}` : null },
      })
      .then((response) => {
        let options: SelectProps['options'] = [];
        response.data.forEach((e: any) => {
          {
            options.push({
              value: e.id,
              label: e.description,
            });
          }
        });
        setOptions(options);
      });
  };

  const saveTheme = (str: string) => {
    let path = `api/cards/theme/${user.userid}`;
    const body = {
      title: inputValue,
      addOn: addOn,
      description: "",
    };

    axios.post(CONFIG.BACK_SERVER_DOMAIN + path, body, {
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

  const handleAddOnChange = (value: string) => {
    setAddOn(value);
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
        placeholder="Add a goal"
        value={inputValue}
        onChange={handleChange}
        style={{ marginBottom: "20px", marginTop: "30px" }}
        onKeyDown={onEnter}
      />
      <Select
          size={size}
          placeholder="Add-On"
          onChange={handleAddOnChange}
          style={{ width: 200 }}
          options={_options}
        />
    </Modal>
  );
};

export default AddThemeModel;
