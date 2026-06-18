import { useState } from 'react';
import '../css/GoalSubmitInput.css'

function GoalSubmitInput({ goalsLength, addGoal }) {

    const [newGoalTitle, setNewGoalTitle] = useState("");
    const [newGoalTimeframe, setNewGoalTimeframe] = useState("");

    function determineErrorMessage(noTitle, noTimeframe) {
        if (noTitle && !noTimeframe) {
            alert("You must enter a title for your new goal!");
        } else if (!noTitle && noTimeframe) {
            alert("You must enter a timeframe for your new goal!");
        } else {
            alert("You must enter a title and a timeframe for your new goal!");
        }
    }

    const handleNewGoalSubmit = (e) => {
        const noTitle = newGoalTitle.length === 0;
        const noTimeframe = newGoalTimeframe.length === 0;
        e.preventDefault();
        const newId = goalsLength + 1;
        if (!noTitle && !noTimeframe) {
            alert("You have created a new goal: '" + newGoalTitle + "'" + " to be completed in " + newGoalTimeframe);
            addGoal({
                id: newId,
                title: newGoalTitle,
                timeframe: newGoalTimeframe,
                is_completed: false,
                is_deleted: false
            })
        } else determineErrorMessage(noTitle, noTimeframe);
    }

    return (
        <form onSubmit={handleNewGoalSubmit} className="goal-submit-form">
            <input
                type="text"
                placeholder="Enter new goal here..."
                className="goal-input"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter timeframe here..."
                className="timeframe-input"
                value={newGoalTimeframe}
                onChange={(e) => setNewGoalTimeframe(e.target.value)}
            />
            <button type="submit" className="submit-btn">
                Submit new goal
            </button>
        </form>
    );
}

export default GoalSubmitInput