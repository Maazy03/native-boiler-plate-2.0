import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {URL} from '@config/apiUrl';
import {Get} from '@axios/AxiosInterceptorFunction';

export const initialSetupRequest = createAsyncThunk(
  'user/initialSetupRequest',
  async data => {
    return data;
  },
);

export const popularClass = createAsyncThunk(
  'user/popularClass',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success! You are logged in!',
        isData: data,
      };
    } catch (error) {
      console.log('ERROR', error);
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
      };
    }
  },
);

export const IVdrip = createAsyncThunk('user/IVdrip', async data => {
  try {
    return {
      status: 'success',
      error: false,
      message: 'Success! You are logged in!',
      isData: data,
    };
  } catch (error) {
    console.log('ERROR', error);
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
    };
  }
});

export const getAllTrainer = createAsyncThunk(
  'user/getAllTrainer',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success! You are logged in!',
        isData: data,
      };
    } catch (error) {
      console.log('ERROR', error);
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
      };
    }
  },
);

export const getTrainerDetails = createAsyncThunk(
  'user/getTrainerDetails',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success! You are logged in!',
        isData: data,
      };
    } catch (error) {
      console.log('ERROR', error);
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
      };
    }
  },
);

export const getClasses = createAsyncThunk('user/getClasses', async data => {
  try {
    return {
      status: 'success',
      error: false,
      message: 'Success! You are logged in!',
      isData: data,
    };
  } catch (error) {
    console.log('ERROR', error);
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
    };
  }
});

export const getSingleClass = createAsyncThunk(
  'user/getSingleClass',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success! You are logged in!',
        isData: data,
      };
    } catch (error) {
      console.log('ERROR', error);
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
      };
    }
  },
);

export const getSportClasses = createAsyncThunk(
  'user/getSportClasses',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success! You are logged in!',
        isData: data,
      };
    } catch (error) {
      console.log('ERROR', error);
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
      };
    }
  },
);

export const getSportClassByDate = createAsyncThunk(
  'user/getSportClassByDate',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success! You are logged in!',
        classesData: data,
      };
    } catch (error) {
      console.log('ERROR', error);
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
      };
    }
  },
);

export const getAllWellnessCategories = createAsyncThunk(
  'user/getAllWellnessCategories',
  async data => {
    try {
      return {
        status: 'success',
        error: false,
        message: 'Success! You are logged in!',
        isData: data,
      };
    } catch (error) {
      console.log('ERROR', error);
      return {
        status: 'failed',
        error: true,
        message: 'Oops! Something went wrong!',
      };
    }
  },
);

export const saveDate = createAsyncThunk('user/saveDate', async data => {
  try {
    return {
      status: 'success',
      error: false,
      dateSaved: data,
    };
  } catch (error) {
    console.log('ERROR', error);
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
    };
  }
});

export const booked = createAsyncThunk('user/booked', async data => {
  try {
    return {
      status: 'success',
      error: false,
      dateSaved: data,
    };
  } catch (error) {
    return {
      status: 'failed',
      error: true,
      message: 'Oops! Something went wrong!',
    };
  }
});

export const refreshList = createAsyncThunk(
  'classes/refreshList',
  async data => {
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
  },
);

export const clearClasses = createAsyncThunk(
  'plans/clearClasses',
  async data => {
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
  },
);

const initialState = {
  isLoadingRequest: false,
  status: 'idle',
  error: false,
  errorMessage: '',
  popularClasses: [],
  allTrainer: [],
  classesData: undefined,
  sportClassesData: undefined,
  savedDate: '',
  refList: null,
  isBooked: false,
  trainerDetails: undefined,
  wellnessCategories: [],
  IVdripData: [],
};

const classReducer = createSlice({
  name: 'classes',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    //POPULARS
    [popularClass.pending]: (state, action) => {
      state.status = 'loading';
      state.isLoadingRequest = true;
    },
    [popularClass.rejected]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
      state.popularClasses = action.payload.isData;
    },
    [popularClass.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.popularClasses = action.payload.isData;
    },
    //IVDrip
    [IVdrip.pending]: (state, action) => {
      state.status = 'loading';
      state.isLoadingRequest = true;
    },
    [IVdrip.rejected]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
      state.popularClasses = action.payload.isData;
    },
    [IVdrip.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.IVdripData = action.payload.isData;
    },

    //GET CLASSES BY DATE
    [getClasses.pending]: (state, action) => {
      state.status = 'loading';
      state.isLoadingRequest = true;
    },
    [getClasses.rejected]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
      state.classesData = action.payload.isData;
    },
    [getClasses.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.classesData = action.payload.isData;
    },
    ///SINGLE DATE CLASSES
    [getSingleClass.pending]: (state, action) => {
      state.status = 'loading';
      state.isLoadingRequest = true;
    },
    [getSingleClass.rejected]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
      state.classesData = action.payload.isData;
    },
    [getSingleClass.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.classesData = action.payload.isData;
    },

    ///SAVE DATE
    [saveDate.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.savedDate = action.payload.dateSaved;
    },
    ///BOOKED SPORT CLASSS
    [booked.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.isBooked = action.payload.dateSaved;
    },

    ///REFRESH LIST
    [refreshList.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.refList = action.payload.classesData;
    },

    //GET SPORT CLASSES  BY DATE
    [getSportClasses.pending]: (state, action) => {
      state.status = 'loading';
      state.isLoadingRequest = true;
    },
    [getSportClasses.rejected]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
      state.sportClassesData = action.payload.isData;
    },
    [getSportClasses.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.sportClassesData = action.payload.isData;
    },
    ///SINGLE DATE SPORT CLASSES
    [getSportClassByDate.pending]: (state, action) => {
      state.status = 'loading';
      state.isLoadingRequest = true;
    },
    [getSportClassByDate.rejected]: (state, action) => {
      state.status = 'failed';
      state.isLoadingRequest = false;
      state.error = true;
      state.sportClassesData = action.payload.classesData;
    },
    [getSportClassByDate.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.sportClassesData = action.payload.classesData;
    },
    [refreshList.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.refList = action.payload.classesData;
    },
    //ALL TRAINERS
    [getAllTrainer.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.allTrainer = action.payload.isData;
    },
    //TRAINER DETAILS
    [getTrainerDetails.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.trainerDetails = action.payload.isData;
    },
    //GET ALL WELLNESS CATEGORIES
    [getAllWellnessCategories.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.wellnessCategories = action.payload.isData;
    },
    [clearClasses.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.isLoadingRequest = false;
      state.error = false;
      state.popularClasses = [];
      state.allTrainer = [];
      state.classesData = undefined;
      state.sportClassesData = undefined;
      state.savedDate = '';
      state.refList = null;
      state.isBooked = false;
    },
  },
});

export default classReducer.reducer;
