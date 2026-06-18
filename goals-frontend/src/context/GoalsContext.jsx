import { createContext } from 'react';
import useGoals from '../hooks/useGoals';

const GoalsContext = createContext();

export function GoalsProvider({ children }) {
    
    const {
        goals,
        editingGoalId,
        addGoal,
        deletedGoals,
        toggleComplete,
        setEditingGoalId,
        setGoalAsEditing,
        updateGoal,
        deleteGoal
    } = useGoals();

    return (
        <GoalsContext.Provider value={{
            goals,
            editingGoalId,
            addGoal,
            deletedGoals,
            setEditingGoalId,
            setGoalAsEditing,
            updateGoal,
            deleteGoal
        }}>
            {children}
        </GoalsContext.Provider>
    );
}

export default GoalsContext;