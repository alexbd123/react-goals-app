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
        <div className="goal-card">
            <h2>{goal.title}</h2>
            <p>{goal.timeframe}</p>
            <div className="goal-actions">
                {goal.is_deleted === 0 && <button onClick={() => handleGoalCompletion(goal)}>
                    {goal.is_completed ? '▣' : '□'}
                </button>}
                {goal.is_completed === 1 && goal.is_deleted === 0 &&
                    <button onClick={() => handleGoalDeletion(goal)}>
                        🗑
                    </button>}
                {goal.is_completed === 0 && goal.is_deleted === 0 && (
                    <button onClick={() => setGoalAsEditing(goal.id)}>
                        ✎
                    </button>
                )}
                {goal.is_deleted === 1 &&
                    <button onClick={() => handleGoalRestoration(goal)}>
                        ⟳
                    </button>}
                {goal.is_deleted === 1 && <button onClick={() => handleGoalDeletion(goal)}>
                    🗑
                </button>}
            </div>
            {editingGoalId === goal.id && <EditGoalPopup goalId={goal.id} updateGoal={updateGoal} setGoalAsEditing={setGoalAsEditing} />}
        </div>
    );
}

export default GoalCard