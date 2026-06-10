import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',         // Add _id to the initial state
    image: '',
    username: '',
    role: "",
    password:"",
    token:"",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state._id = action.payload._id;   // Set the _id from the action payload
            state.image = action.payload.image;
            state.username = action.payload.username;
            state.role = action.payload.role;
            state.password = action.payload.password;
            state.token = action.payload.token;
        },
        clearUser: (state) => {
            state._id = '';                   // Clear the _id
            state.image = '';
            state.username = '';
            state.role = '';
            state.password='';
            state.token='';
        }
    }
});


// Export actions to be used in components
export const { setUser, clearUser } = userSlice.actions;

// Selector to get user data from the state, including _id
export const selectUser = (state) => state.user;

export default userSlice.reducer;
