// AddWordButton.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { fetchWords } from './api'; // Подставьте правильный путь к файлу с вашей функцией fetchWords

interface AddWordButtonProps {
  onAddWord: (words: string[]) => void;
}

const AddWordButton: React.FC<AddWordButtonProps> = ({ onAddWord }) => {
  const [visible, setVisible] = useState(false);
  const [words, setWords] = useState<string[]>([]);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleAddWords = async () => {
    try {
      const fetchedWords = await fetchWords();
      setWords(fetchedWords.map((word) => word.word));
    } catch (error) {
      console.error('Ошибка при загрузке слов:', error.message);
    }
  };

  const handleConfirm = () => {
    onAddWord(words);
    setVisible(false);
  };

  useEffect(() => {
    handleAddWords();
  }, []); // Выполняем загрузку слов при открытии модального окна

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
      >
        <ul>
          {words.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </Modal>
    </>
  );
};

export default AddWordButton;
