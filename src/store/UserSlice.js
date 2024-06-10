import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export var url = process.env.REACT_APP_API_URL;
export const token = process.env.REACT_APP_API_TOKEN;

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const request = await axios.post(
      url + "/api/v1/auth/login",
      userCredentials
    );
    const response = await request.data;
    // console.log(response);
    sessionStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
