import EditGoalPopup from './EditGoalPopup'
import '../css/GoalCard.css'
import { toast } from 'react-toastify';

function GoalCard({ goal, setGoalAsEditing, updateGoal, deleteGoal, editingGoalId }) {

    function handleGoalCompletion(goal) {
        updateGoal(goal.id, { is_completed: goal.is_completed === 1 ? 0 : 1 });
        toast.info("You have marked the goal '" + goal.title + "' as " + (goal.is_completed === 1 ? 'incomplete' : 'completed') + "!");
    }

    function handleGoalDeletion(goal) {
        if (goal.is_deleted === 0) {
            updateGoal(goal.id, { is_deleted: 1 });
            toast.info("You have deleted the goal '" + goal.title + "'!");
        } else {
            deleteGoal(goal.id);
            toast.info("You have permanently deleted the goal '" + goal.title + "'!");
        }
    }

    function handleGoalRestoration(goal) {
        updateGoal(goal.id, { is_deleted: 0 });
        toast.info("You have restored the goal '" + goal.title + "'!");
    }

    return (
        <div className="goal-card" data-testid={`goal-card-${goal.id}`}>
            <h2 className={"goal-card-title"}  data-testid={`goal-card-title-${goal.id}`}>
                {goal.title}
            </h2>
            <p className={"goal-card-timeframe"} data-testid={`goal-card-timeframe-${goal.id}`}>
                {goal.timeframe}
            </p>
            <div className="goal-actions">
                {goal.is_deleted === 0 && <button 
                className="toggle-completion" 
                data-testid={`toggle-completion-${goal.id}`}
                onClick={() => handleGoalCompletion(goal)}>
                    {goal.is_completed ? '▣' : '□'}
                </button>}
                {goal.is_completed === 1 && goal.is_deleted === 0 &&
                    <button 
                    className="delete-goal"
                    data-testid={`temp-delete-goal-${goal.id}`}
                    onClick={() => handleGoalDeletion(goal)}>
                        🗑
                    </button>}
                {goal.is_completed === 0 && goal.is_deleted === 0 && (
                    <button 
                    className="edit-goal"
                    data-testid={`edit-goal-${goal.id}`}
                    onClick={() => setGoalAsEditing(goal.id)}>
                        ✎
                    </button>
                )}
                {goal.is_deleted === 1 &&
                    <button 
                    className="restore-goal"
                    data-testid={`restore-goal-${goal.id}`}
                    onClick={() => handleGoalRestoration(goal)}>
                        ⟳
                    </button>}
                {goal.is_deleted === 1 && <button 
                className="delete-goal"
                data-testid={`perma-delete-goal-${goal.id}`}
                onClick={() => handleGoalDeletion(goal)}>
                    🗑
                </button>}
            </div>
            {editingGoalId === goal.id && <EditGoalPopup goalId={goal.id} updateGoal={updateGoal} setGoalAsEditing={setGoalAsEditing} />}
        </div>
    );
}

export default GoalCard