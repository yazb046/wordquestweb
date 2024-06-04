import {useState } from "react"

export const useTheme = () => {
    const [themeId, setThemeIdInternal] = useState(()=>{
        return localStorage.getItem('themeId');
    });

    const setThemeId = (newId: any) => {
        localStorage.setItem('themeId', newId);
        setThemeIdInternal(newId);
    }

    return [themeId, setThemeId];
}