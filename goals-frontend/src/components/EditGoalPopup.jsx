import { useState } from 'react';
import '../css/EditGoalPopup.css'

function EditGoalPopup({ goalId, updateGoal, setGoalAsEditing }) {

    const [editedGoalTitle, setEditedGoalTitle] = useState("");
    const [editedGoalTimeframe, setEditedGoalTimeframe] = useState("");

    const handleEditGoalSubmit = (e) => {
        e.preventDefault();
        updateGoal(goalId, { title: editedGoalTitle === "" ? undefined : editedGoalTitle, timeframe: editedGoalTimeframe === "" ? undefined : editedGoalTimeframe });
        setGoalAsEditing('');
    }

    return (
        <form className="edit-goal-title-form" onSubmit={handleEditGoalSubmit}>
            <div className="edit-goal-inputs">
                <input
                    className="edit-goal-title-input"
                    placeholder="Edit goal title..."
                    type='text'
                    onChange={(e) => { setEditedGoalTitle(e.target.value) }}
                >
                </input>
                <input
                    className="edit-goal-timeframe-input"
                    placeholder="Edit goal timeframe..."
                    type='text'
                    onChange={(e) => { setEditedGoalTimeframe(e.target.value) }}
                >
                </input>
            </div>
            <button type="submit" className="submit-btn">
                Submit edited goal
            </button>
        </form>
    );
}

export default EditGoalPopup;