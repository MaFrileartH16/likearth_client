// features/yourSlice.ts
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from "axios"; // Adjust the path as needed

// Define the type for the data returned from the API
interface TestData {
  message: string;
}

// Define the state type
interface TestState {
  data: TestData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TestState = {
  data: null,
  status: 'idle',
  error: null,
};

// Create async thunk with void argument type
export const getTest = createAsyncThunk<TestData, void>(
  'test/getTest',
  async () => {
    const response = await axios.get('https://vast-earth-68010-16a9f7e523a9.herokuapp.com/api/v1/')
    return response.data;
  }
);

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTest.fulfilled, (state, action: PayloadAction<TestData>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getTest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export default testSlice.reducer;
