
import React, { useState } from 'react';
import { Layout } from 'antd';
import AddWordButton from '../elements/AddWordButton';

interface Word {
  id: number;
  word: string;
  checked: null;
  langLevel: null;
}

const AppWordList: React.FC = () => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  const handleAddWords = (newWords: string[]) => {
    setSelectedWords(newWords);
  };

  return (
    <Layout.Sider className='siderStyle'>
      <h2 className='sliderStyleHeader'>my words</h2>
     <p style={{marginBottom: '10px'}}> <b>Выберите слово</b></p>
      <AddWordButton onAddWord={handleAddWords} />
      <div className='slected-words'>
        {selectedWords.map((word, index) => (
          <p key={index}>{word}</p>
        ))}
        </div>
      
    </Layout.Sider>
  );
};

export default AppWordList;
