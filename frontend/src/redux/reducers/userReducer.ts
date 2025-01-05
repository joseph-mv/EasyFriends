import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User type
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
  state: string;
  place: string;
  hobbies: string[];
  email: string;
  password?: string; // Optional, exclude this in production
  friends: string[];
  sendRequests: string[];
  getRequests: string[];
  createdAt: string;
}

// Define the initial state type
interface UserState {
  user: User | null // User object or null
  
}

// Initial state
const initialState: UserState = {
  user: null,
  
};

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set the user object
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    // Clear user data on logout
    clearUser: (state) => {
      state.user = null;
    },
    sendRequest:(state,action:PayloadAction<string>)=>{
      state.user?.sendRequests.push(action.payload)
    },
    cancelRequest:(state,action:PayloadAction<string>)=>{
      const indexToDelete = state.user?.sendRequests.indexOf(action.payload);
console.log('deleteInd' ,indexToDelete)
      if ( indexToDelete as number > -1) {
        state.user?.sendRequests.splice(indexToDelete, 1); // Remove 1 element at the found index
      }
    
    },
    
  },
});

// Export actions
export const { setUser, clearUser,sendRequest,cancelRequest} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
