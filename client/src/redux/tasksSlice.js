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
    },
});

export const { setTasks, addTask } = tasksSlice.actions;
export default tasksSlice.reducer;