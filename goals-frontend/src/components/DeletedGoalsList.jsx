import GoalCard from "./GoalCard";
import NavBar from "./NavBar";

function DeletedGoalsList({ goals, updateGoal, deleteGoal }) {

    const deletedGoals = goals.filter(goal => goal.is_deleted === 1);

    return (
        <>
            <div className="deleted-goals-list" data-testid="deleted-goals-list">
                <h2>Deleted goals:</h2>
                {deletedGoals.length === 0 && 
                <p className="deleted-message" data-testid="no-deleted-message">
                    Deleted goals will appear here.
                </p>}
                {deletedGoals.map(goal =>
                    <GoalCard
                        goal={goal}
                        updateGoal={updateGoal}
                        deleteGoal={deleteGoal}
                        key={goal.id}
                    />
                )}
            </div>
        </>
    );
}

export default DeletedGoalsList;