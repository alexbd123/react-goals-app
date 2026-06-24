import GoalCard from "./GoalCard";
import '../css/GoalsLists.css'

function CompletedGoalsList({ goals, updateGoal }) {

    const completedGoals = goals.filter(goal => goal.is_completed === 1 && goal.is_deleted === 0);

    return (
        <div className="complete-goals-list" data-testid="completed-goals-list">
            <h2>Completed:</h2>
            {completedGoals.length === 0 && <p className="completed-message">You have no completed goals!</p>}
            {completedGoals.map(goal => (
                <GoalCard
                    goal={goal}
                    updateGoal={updateGoal}
                    key={goal.id}
                />
            ))}
        </div>
    );
}

export default CompletedGoalsList;