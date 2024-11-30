import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        setTasks: (state, action) => {
            console.log("tasks are now", action.payload)
            return action.payload},
        addTask: (state, action) => {
            console.log("Add Task working!")
            state.push(action.payload);
        },
        removeTask: (state, action) => {
            return state.filter((task) => task.id !== action.payload); // Filter out the task by id
          },
    },
});

export const { setTasks, addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;