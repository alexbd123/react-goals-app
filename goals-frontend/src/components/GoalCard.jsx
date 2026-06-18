import EditGoalPopup from './EditGoalPopup'
import '../css/GoalCard.css'

function GoalCard({ goal, setGoalAsEditing, updateGoal, deleteGoal, editingGoalId }) {


    return (
        <div className="goal-card">
            <h2>{goal.title}</h2>
            <p>{goal.timeframe}</p>
            <div className="goal-actions">
                {goal.is_deleted === 0 && <button onClick={() => updateGoal(goal.id, { is_completed: goal.is_completed === 1 ? 0 : 1 })}>
                    {goal.is_completed ? '▣' : '□'}
                </button>}
                {goal.is_completed === 1 && goal.is_deleted === 0 &&
                    <button onClick={() => updateGoal(goal.id, { is_deleted: 1 })}>
                        🗑
                    </button>}
                {goal.is_completed === 0 && goal.is_deleted === 0 && (
                    <button onClick={() => setGoalAsEditing(goal.id)}>
                        ✎
                    </button>
                )}
                {goal.is_deleted === 1 &&
                    <button onClick={() => updateGoal(goal.id, { is_deleted: 0 })}>
                        ⟳
                    </button>}
                {goal.is_deleted === 1 && <button onClick={() => deleteGoal(goal.id)}>
                    🗑
                </button>}    
            </div>
            {editingGoalId === goal.id && <EditGoalPopup goalId={goal.id} updateGoal={updateGoal} setGoalAsEditing={setGoalAsEditing} />}
        </div>
    );
}

export default GoalCard