import { useState } from "react"

export const useGoalId = () => {
    
    const [goalId, setGoalIdInternal] = useState(()=>{
        return localStorage.getItem('goalId');
    });

    const setGoalId = (newGoalId: number) : void => {
        localStorage.setItem('goalId', newGoalId.toString());
        setGoalIdInternal(newGoalId.toString());
    }

    return [goalId, setGoalId];
}