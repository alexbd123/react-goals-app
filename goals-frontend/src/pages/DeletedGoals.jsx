import DeletedGoalsList from '../components/DeletedGoalsList'
import useGoals from '../hooks/useGoals.js'
import '../css/Home.css'
import { useContext } from 'react'
import GoalsContext from '../context/GoalsContext'
import '../css/DeletedGoals.css'
import NavBar from '../components/NavBar'

function DeletedGoals() {

    const {
        goals,
        updateGoal,
        deleteGoal
    } = useContext(GoalsContext);


    return (
        <main className="deleted-goals-page">
            <NavBar />
            <div className="deleted-goals-list">
                <DeletedGoalsList
                    goals={goals}
                    updateGoal={updateGoal}
                    deleteGoal={deleteGoal}
                />
            </div>
        </main>
    );
}

export default DeletedGoals;