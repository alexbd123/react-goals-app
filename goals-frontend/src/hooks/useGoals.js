import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function useGoals() {

    const [goals, setGoals] = useState([]);
    const [editingGoalId, setEditingGoalId] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/goals')
            .then(response => response.json())
            .then(data => setGoals(data))
            .catch(error => console.error('Error fetching goals:', error));
    }, []);


    function setGoalAsEditing(id) {
        setEditingGoalId(id === editingGoalId ? '' : id);
    }

    function updateGoal(id, updates) {

        const goal = goals.find(goal => goal.id === id);
        console.log("Goal being edited:", goal);
        console.log("Updates being applied:", updates);
        const requestBody = {
            title: updates.title ?? goal.title,
            timeframe: updates.timeframe ?? goal.timeframe,
            is_completed: updates.is_completed ?? goal.is_completed,
            is_deleted: updates.is_deleted ?? goal.is_deleted
        };

        fetch(`http://localhost:3000/goals/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Goal updated successfully:', data);
                setGoals(goals.map(goal => {
                    if (goal.id !== id) {
                        return goal;
                    }
                    return {
                        ...goal,
                        title: requestBody.title,
                        timeframe: requestBody.timeframe,
                        is_completed: requestBody.is_completed,
                        is_deleted: requestBody.is_deleted
                    }
                }))
            })
            .catch(error => {
                console.error('Error updating goal:', error);
            });

        
    }

    function addGoal(title, timeframe) {
        fetch('http://localhost:3000/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( title, timeframe )
        })
            .then(response => response.json())
            .then(newGoal => {
                console.log('Goal added successfully:', newGoal);
                setGoals([...goals, newGoal]);
            })
            .catch(error => {
                console.error('Error adding goal:', error);
            });
    }

    function deleteGoal(id) {
        fetch(`http://localhost:3000/goals/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Goal deleted successfully:', data);
                setGoals(goals.filter(goal => goal.id !== id));
            })
            .catch(error => {
                console.error('Error deleting goal:', error);
            });
    }

    return {
        goals,
        editingGoalId,
        setGoals,
        setGoalAsEditing,
        updateGoal,
        addGoal,
        setEditingGoalId,
        setGoalAsEditing,
        deleteGoal
    }

}

export default useGoals