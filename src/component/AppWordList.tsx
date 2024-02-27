import React, {useEffect, useState} from 'react'
import axios from 'axios';

import {Layout} from 'antd';

interface Word{
    id: number;
    word: string;
    checked: null,
    langLevel: null
}





const AppWordList: React.FC = () => {
    const [words, setWords] = useState<Word[]>([]);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWords = async () => {
            try{
                const response = await axios.get<Word[]>('http://localhost:8080/api/words');
                setWords(response.data);
            }catch (error){
                if (axios.isAxiosError(error)){
                    // Обработка ошибок Axios
                    console.error('Ошибка Axios:', error.message)
                }else{
                    // Обработка общих ошибок
                    console.error('Ошибка при получении данных:', error.message)
                }
            } finally{
                setLoading(false);
            }
        };
        if (words.length === 0){
            fetchWords()
        };
    }, []);
    return(
        <Layout.Sider className='siderStyle'>
           <h2 className='sliderStyleHeader'>my words</h2>
           {words.length === 0 ? (
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