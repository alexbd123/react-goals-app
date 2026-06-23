import { useState } from 'react';
import '../css/EditGoalPopup.css'
import { toast } from 'react-toastify';

function EditGoalPopup({ goalId, updateGoal, setGoalAsEditing }) {

    const [editedGoalTitle, setEditedGoalTitle] = useState("");
    const [editedGoalTimeframe, setEditedGoalTimeframe] = useState("");

    const handleEditGoalSubmit = (e) => {
        const emptyTitle = editedGoalTitle === " ";
        const emptyTimeframe = editedGoalTimeframe === " ";
        e.preventDefault();
        updateGoal(goalId, { title: editedGoalTitle === "" ? undefined : editedGoalTitle, timeframe: editedGoalTimeframe === "" ? undefined : editedGoalTimeframe });
        if (emptyTitle || emptyTimeframe) {
            toast.warn("New title or timeframe cannot be an empty space!");
        }
        setGoalAsEditing('');
    }

    return (
        <form className="edit-goal-title-form" onSubmit={handleEditGoalSubmit}>
            <div className="edit-goal-inputs">
                <input
                    className="edit-goal-title-input"
                    data-testid="edit-title-input"
                    placeholder="Edit goal title..."
                    type='text'
                    onChange={(e) => { setEditedGoalTitle(e.target.value) }}
                >
                </input>
                <input
                    className="edit-goal-timeframe-input"
                    data-testid="edit-timeframe-input"
                    placeholder="Edit goal timeframe..."
                    type='text'
                    onChange={(e) => { setEditedGoalTimeframe(e.target.value) }}
                >
                </input>
            </div>
            <button 
            type="submit" 
            className="submit-btn"
            data-testid = "submit-edit-btn"
            >
                Submit edited goal
            </button>
        </form>
    );
}

export default EditGoalPopup;