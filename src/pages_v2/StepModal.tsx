import React, { useEffect, useState } from "react";
import axios from "axios";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useToken } from "./hooks/useToken";
import Iterable from "./types/Iterable";
import Config from "../Config";
import CardMarkDownBasic from "./CardMarkDownBasic";
import CardMarkDownLangLearn from "./CardMarkDownLangLearn";

interface Props {
  goalType: string;
  goalId: number;
  step: Iterable;
  openModal: boolean;
  closeModalCallback: () => void;
}

const StepModal: React.FC<Props> = ({
  goalId,
  goalType,
  step,
  openModal,
  closeModalCallback,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_token] = useToken();

  useEffect(() => {
    setIsModalOpen(openModal);
  }, [openModal]);

  const handleOk = (item: Iterable) => {
    handleClose();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    closeModalCallback();
  };

  const onSaveStep = (item: Iterable) => {
    let path = `api/steps/${goalId}`;
    axios.post(Config.BACK_SERVER_DOMAIN + path, item, {
      headers: {
        Authorization: _token ? `${_token}` : null,
      },
    });
  };

  

  return (
    <>
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,

          }}
        >
          <div
            style={{
              width: "670px",
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "20px",
              position: "relative",
              color: "green",
            }}
          >
          <Button
              icon={<CloseOutlined />}
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                fontSize: "16px",
                cursor: "pointer",
                
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "red";
                e.currentTarget.style.color = "red";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.color = "";
              }}
            />
            {(goalType === "" || goalType === "Markdown") && (
              <CardMarkDownBasic
                onEditing={() => console.log()}
                onSaveCard={(item: Iterable) => {
                  handleOk(item);
                  onSaveStep(item);
                }}
                onCloseCard={() => {
                  handleClose();
                }}
                card={step}
                outerStyle={{
                  marginLeft: "15px",
                  height: 400,
                  width: 580,
                }}
              />
            )}
            {goalType === "Learn Language" && (
              <CardMarkDownLangLearn
                themeId={goalId}
                onEditing={() => console.log()}
                onSaveCard={(item: Iterable) => {
                  console.log();
                }}
                onCloseCard={() => {
                  console.log();
                }}
                card={step}
                outerStyle={{
                  marginLeft: "15px",
                  height: 400,
                  width: 580,
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StepModal;
