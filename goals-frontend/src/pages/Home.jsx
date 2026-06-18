import GoalCard from '../components/GoalCard'
import GoalSubmitInput from '../components/GoalSubmitInput'
import IncompleteGoalsList from '../components/IncompleteGoalsList'
import CompletedGoalsList from '../components/CompletedGoalsList'
import NavBar from '../components/NavBar'
import '../css/Home.css'
import { useState } from 'react'
import useGoals from '../hooks/useGoals.js'
import { useContext } from 'react'
import GoalsContext from '../context/GoalsContext'

function Home() {

    const {
        goals,
        editingGoalId,
        addGoal,
        updateGoal,
        deleteGoal,
        toggleComplete,
        setGoalAsEditing,
        toggleDelete
    } = useContext(GoalsContext);

    console.log(editingGoalId);

    return (

        <main className="main-content">
            <GoalSubmitInput
                goalsLength={goals.length}
                addGoal={addGoal}
            />
            <NavBar />
            <IncompleteGoalsList
                goals={goals}
                setGoalAsEditing={setGoalAsEditing}
                updateGoal={updateGoal}
                editingGoalId={editingGoalId}
            />
            <CompletedGoalsList
                goals={goals}
                updateGoal={updateGoal}
            />
            
        </main>
    )
};

export default Home;