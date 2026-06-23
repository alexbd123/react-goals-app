import GoalCard from './GoalCard'
import '../css/GoalsLists.css'

function IncompleteGoalsList({ goals, toggleComplete, setGoalAsEditing, updateGoal, editingGoalId }) {

    const incompleteGoals = goals.filter(goal => goal.is_completed === 0 && goal.is_deleted === 0);

    return (
        <div className="incomplete-goals-list"
            data-testid="incomplete-goals-list">
            <h2>To-Do:</h2>
            {incompleteGoals.length === 0 && <p className="incomplete-message">You have no incomplete goals!</p>}
            {incompleteGoals.map(goal => (
                <GoalCard
                    goal={goal}
                    setGoalAsEditing={setGoalAsEditing}
                    updateGoal={updateGoal}
                    editingGoalId={editingGoalId}
                    key={goal.id} />
            ))}
        </div>
    );
}

export default IncompleteGoalsList;