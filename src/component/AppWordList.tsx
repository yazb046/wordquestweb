import React, {useEffect, useState} from 'react'

import {Layout} from 'antd';
import { fetchWords } from './fetchComponent/wordService';

interface Word{
    id: number;
    word: string;
    checked: null,
    langLevel: null
}



const AppWordList: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedWords = await fetchWords();
        setWords(fetchedWords); 
      } catch (error: any) {
        console.error('Ошибка при загрузке слов:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    
    return(
        <Layout.Sider className='siderStyle'>
           <h2 className='sliderStyleHeader'>my words</h2>
           {loading ? (
               <p >Loading...</p>
           ): (
               <ul className='sliderStyleList'>
                   {words.map(({id, word}) => (
                       <li className='sliderStyleText' key={id}>
                           {word}
                       </li>
                   ))}
               </ul>
           )}
        </Layout.Sider>

    )
}

export default AppWordList