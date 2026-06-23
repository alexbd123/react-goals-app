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

    async function updateGoal(id, updates) {
        const goal = goals.find(goal => goal.id === id);

        const requestBody = {
            title: updates.title ?? goal.title,
            timeframe: updates.timeframe ?? goal.timeframe,
            is_completed: updates.is_completed ?? goal.is_completed,
            is_deleted: updates.is_deleted ?? goal.is_deleted
        };

        try {
            const response = await fetch(
                `http://localhost:3000/goals/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            setGoals(goals.map(goal =>
                goal.id === id ? data : goal
            ));
        }
        catch (error) {
            console.error('Error updating goal:', error);
        }
    }

    function addGoal(title, timeframe) {
        fetch('http://localhost:3000/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(title, timeframe)
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