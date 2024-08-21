import React, { useEffect, useState } from 'react'
import StepsList from './StepsList'
import { useGoalId } from './hooks/useGoalId'
import StepsCards from './StepsCards';

interface Props {

}
  
  const StepsView: React.FC<Props> = ({
  }) => {
    const [goalId] = useGoalId();
    const [reloadView, setReloadView] = useState(false);

    useEffect(() => {
      setReloadView(!reloadView);
    }, [goalId]);

    
  return (
    <div>
      <StepsCards
            key={reloadView ? "reload" : "no-reload"}
            goalId={Number(goalId)}
            onItemSelected={() => console.log()}
            onListOrderChange={() => console.log()}
          />
    </div>
  )
}

export default StepsView
