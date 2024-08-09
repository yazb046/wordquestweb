import { useState } from "react"

export const useGoalId = () => {
    const [goalId, setGoalIdInternal] = useState(()=>{
        return localStorage.getItem('token');
    });

    const setGoalId = (newGoalId: any) => {
        localStorage.setItem('goalId', newGoalId);
        setGoalIdInternal(newGoalId);
    }

    return [goalId, setGoalId];
}