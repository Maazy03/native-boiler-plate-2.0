import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const initialSetupRequest = createAsyncThunk(
  'user/initialSetupRequest',
  async data => {
    return data;
  },
);

export const getUserData = createAsyncThunk('auth/getUserData', async data => {
  try {
    return {
      status: 'success',
      error: false,
      message: 'Success! You are logged in!',
      userData: data?.data?.user,
      userToken: data?.token,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
      userData: undefined,
      userToken: undefined,
    };
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async data => {
  try {
    return {
      status: 'success',
      userData: data,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: error.code,
    };
  }
});

export const classesHistory = createAsyncThunk(
  'auth/classesHistory',
  async data => {
    try {
      return {
        status: 'success',
        historyData: data?.newData,
        flag: data.flag,
      };
    } catch (error) {
      return {
        status: 'failed',
        error: true,
        message: error.code,
        historyData: undefined,
      };
    }
  },
);

export const wellnessHistory = createAsyncThunk(
  'auth/wellnessHistory',
  async data => {
    try {
      return {
        status: 'success',
        historyData: data,
      };
    } catch (error) {
      return {
        status: 'failed',
        error: true,
        message: error.code,
        historyData: undefined,
      };
    }
  },
);

export const getUserCards = createAsyncThunk(
  'auth/getUserCards',
  async data => {
    try {
      return {
        status: 'success',
        cardsData: data,
      };
    } catch (error) {
      return {
        status: 'failed',
        error: true,
        message: error.code,
        cardsData: undefined,
      };
    }
  },
);

export const refreshList = createAsyncThunk('auth/refreshList', async data => {
  try {
    return {
      status: 'success',
      classesData: data,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: error.code,
      classesData: undefined,
    };
  }
});

export const clearUser = createAsyncThunk('plans/clearUser', async data => {
  try {
    return {
      status: 'success',
      error: false,
      message: 'Success!',
      isData: data,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
      isData: undefined,
    };
  }
});

const initialState = {
  isLoadingRequest: false,
  status: 'idle',
  error: false,
  errorMessage: '',
  user: undefined,
  userToken: '',
  classUpcomingHistory: undefined,
  classAttendedHistory: undefined,
  classCancelledHistory: undefined,
  userCards: undefined,
  userAllClasses: undefined,
  refList: null,
  wellnessUpcomingHistory: undefined,
  wellnessAttendedHistory: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getUserData.pending]: (state, action) => {
      state.status = 'loading';
      state.isLoadingRequest = true;
    },

    [getUserData.rejected]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
    },

    [getUserData.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;

      state.user = action.payload.userData;
      state.userToken = action.payload.userToken;
    },
    // UPDATE USER
    [updateUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.user = action.payload.userData;
    },

    //CLASSES HISTOY USER
    [classesHistory.pending]: (state, action) => {
      state.status = 'loading';
      state.isLoadingRequest = true;
    },
    [classesHistory.rejected]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
      state.classHistory = action.payload.historyData;
    },
    [classesHistory.fulfilled]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
      if (action.payload.flag === 'upcoming') {
        state.classUpcomingHistory = action.payload.historyData;
      } else if (action.payload.flag === 'attended') {
        state.classAttendedHistory = action.payload.historyData;
      } else {
        state.classCancelledHistory = action.payload.historyData;
      }
    },

    //WELLNESS HISTORY
    [wellnessHistory.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      if (action.payload.historyData.flag === 'upcoming') {
        state.wellnessUpcomingHistory = action.payload.historyData;
      } else {
        state.wellnessAttendedHistory = action.payload.historyData;
      }
    },
    // USER CREDIT CARD
    [getUserCards.pending]: (state, action) => {
      state.status = 'loading';
      state.isLoadingRequest = true;
    },
    [getUserCards.rejected]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
      state.classHistory = action.payload.cardsData;
    },
    [getUserCards.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.userCards = action.payload.cardsData;
    },

    ///REFRESH LIST
    [refreshList.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.refList = action.payload.classesData;
    },
    [clearUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.user = undefined;
      state.userToken = '';
      state.classUpcomingHistory = undefined;
      state.classAttendedHistory = undefined;
      state.classCancelledHistory = undefined;
      state.userCards = undefined;
      state.userAllClasses = undefined;
      state.refList = null;
    },
  },
});

export default userSlice.reducer;
