import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllCategories } from '../api/category.api';
import { initialStateDef } from '../category';
import { CATEGORY_FEATURE_KEY } from '../constants/category.key';

const initialState: initialStateDef = {
  categories: []
};

export const getCategories = createAsyncThunk(
  `${CATEGORY_FEATURE_KEY}/getall`,
  async (_, { rejectWithValue }) => {
    try {
      const result = await getAllCategories();
      return result.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: CATEGORY_FEATURE_KEY,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCategories.pending, state => {});
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  }
});

export const {} = authSlice.actions;

export const categoryReducer = authSlice.reducer;
