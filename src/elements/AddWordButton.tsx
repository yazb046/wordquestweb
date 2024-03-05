// AddWordButton.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Checkbox } from 'antd';
import { fetchWords } from '../service/wordService'; 

 

interface AddWordButtonProps {
  onAddWord: (selectedWords: string[]) => void;
}

const AddWordButton: React.FC<AddWordButtonProps> = ({ onAddWord }) => {
  const [visible, setVisible] = useState(false);
  const [words, setWords] = useState<{ id: number; word: string }[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleAddWords = async () => {
    try {
      const fetchedWords = await fetchWords();
      setWords(fetchedWords);
    } catch (error: any) {
      console.error('Ошибка при загрузке слов:', error.message);
    }
  };

  const handleConfirm = () => {
    onAddWord(selectedWords);
    setVisible(false);
  };

  const handleCheckboxChange = (word: string) => {
    setSelectedWords((prevSelectedWords) => {
      if (prevSelectedWords.includes(word)) {
        return prevSelectedWords.filter((selectedWord) => selectedWord !== word);
      } else {
        return [...prevSelectedWords, word];
      }
    });
  };

  // Выполнение загрузки слов при открытии модального окна
  useEffect(() => {
    handleAddWords();
  }, []); 

  return (
    <>
    
      <Button type="primary" onClick={handleOpenModal}>
        +
      </Button>
      <Modal
        title="Добавить слова"
        visible={visible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        centered
        className="add-word-modal"
      >
        <div className="modal-content">
          <ul>
            {words.map(({ id, word }) => (
              <li key={id}>
                <Checkbox
                  onChange={() => handleCheckboxChange(word)}
                  checked={selectedWords.includes(word)}
                >
                  {word}
                </Checkbox>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default AddWordButton;
