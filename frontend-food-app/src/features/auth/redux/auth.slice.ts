import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginRequestDef, AUTH_FEATURE_KEY } from '@app/features/auth/auth';
import { RegisterRequestDef, InitialStateDef } from '../types/auth.types';

import {
  authLogin,
  authRegister,
  autoLogin,
  updateUser
} from '../api/auth.api';
import {
  saveTokens,
  clearTokens,
  authErrorHelper
} from '../helpers/auth.helpers';

const initialState: InitialStateDef = {
  user: null,
  isAuthenticated: false,
  error: false,
  loading: false
};

export const login = createAsyncThunk(
  `${AUTH_FEATURE_KEY}/login`,
  async (values: LoginRequestDef, { rejectWithValue }) => {
    try {
      const response = await authLogin(values);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const register = createAsyncThunk(
  `${AUTH_FEATURE_KEY}/register`,
  async (values: RegisterRequestDef, { rejectWithValue }) => {
    try {
      const response = await authRegister(values);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const autoLoginUser = createAsyncThunk(
  `${AUTH_FEATURE_KEY}/autoLogin`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await autoLogin();
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const updateUserInfo = createAsyncThunk(
  `${AUTH_FEATURE_KEY}/update`,
  async (values: any, { rejectWithValue }) => {
    try {
      const response = await updateUser(values);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState,
  reducers: {
    logout(state: InitialStateDef) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = false;
      state.loading = false;
      localStorage.removeItem('id');
      clearTokens();
    },
    changeAdress(
      state: InitialStateDef,
      data: PayloadAction<{ address: string }>
    ) {
      if (state.user) {
        state.user.address = data.payload.address;
      } else {
        state.user = {
          address: '',
          phonenumber: 0
        };
        state.user.address = data.payload.address;
      }
    },
    changePhonenumber(
      state: InitialStateDef,
      data: PayloadAction<{ phonenumber: number }>
    ) {
      if (state.user) {
        state.user.phonenumber = data.payload.phonenumber;
      } else {
        state.user = {
          address: '',
          phonenumber: 0
        };
        state.user.phonenumber = data.payload.phonenumber;
      }
    },
    changeFullname(
      state: InitialStateDef,
      data: PayloadAction<{ name: string }>
    ) {
      if (state.user) {
        state.user.first_name = data.payload.name;
      } else {
        state.user = {
          address: '',
          first_name: '',
          phonenumber: 0
        };
        state.user.first_name = data.payload.name;
      }
    }
  },
  extraReducers: builder => {
    /**
     * LOGIN
     */
    builder.addCase(login.pending, state => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const token = action.payload.jwt;
      const {
        _id,
        first_name,
        last_name,
        username,
        email,
        phonenumber,
        address,
        avatar_url,
        role
      } = action.payload.user;
      state.loading = false;
      state.isAuthenticated = true;
      state.user = {
        _id,
        first_name,
        last_name,
        username,
        email,
        avatar_url,
        phonenumber,
        address,
        role
      };
      localStorage.setItem('id', _id);
      if (token) {
        saveTokens({ token });
      }
    });
    builder.addCase(login.rejected, state => {
      authErrorHelper(state);
      clearTokens();
    });
    /**
     * REGISTER
     */
    builder.addCase(register.pending, state => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      const token = action.payload.jwt;
      const {
        _id,
        first_name,
        last_name,
        username,
        email,
        avatar_url,
        phonenumber,
        address,
        role
      } = action.payload.user;
      state.loading = false;
      state.isAuthenticated = true;
      state.user = {
        _id,
        first_name,
        last_name,
        username,
        email,
        phonenumber,
        address,
        avatar_url,
        role
      };
      localStorage.setItem('id', _id);
      if (token) {
        saveTokens({ token });
      }
    });
    builder.addCase(register.rejected, state => {
      authErrorHelper(state);
      clearTokens();
    });
    /**
     * AUTO LOGIN
     */
    builder.addCase(autoLoginUser.pending, state => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(autoLoginUser.fulfilled, (state, action) => {
      const token = action.payload.jwt;
      const {
        _id,
        first_name,
        last_name,
        username,
        email,
        phonenumber,
        address,
        role,
        avatar_url
      } = action.payload.user;
      state.loading = false;
      state.isAuthenticated = true;
      state.user = {
        _id,
        first_name,
        last_name,
        username,
        email,
        phonenumber,
        address,
        avatar_url,
        role
      };
      localStorage.setItem('id', _id);
      if (token) {
        saveTokens({ token });
      }
    });

    // update user
    builder.addCase(updateUserInfo.fulfilled, (state, action: any) => {
      state.user = {
        _id: action.payload.data._id,
        first_name: action.payload.data.first_name,
        last_name: action.payload.data.last_name,
        username: action.payload.data.username,
        email: action.payload.data.email,
        phonenumber: action.payload.data.phonenumber,
        address: action.payload.data.address,
        avatar_url: action.payload.data.avatar_url,
        role: action.payload.data.role
      };
    });
    builder.addCase(updateUserInfo.rejected, state => {
      state.user = null;
      authErrorHelper(state);
    });

    builder.addCase(autoLoginUser.rejected, state => {
      authErrorHelper(state);
      clearTokens();
    });
  }
});

export const { logout, changeAdress, changePhonenumber, changeFullname } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
