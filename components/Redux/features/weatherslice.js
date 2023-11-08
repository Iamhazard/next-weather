import weatherServices from "@/components/services/weatherServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  weatherData: null, // Store the weather data here
  loading: "false",
  error: null,
};

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (city, thunkAPI) => {
    try {
      const response = await weatherServices.getWeatherData(city);
      if (response.cod === "404") {
        thunkAPI.dispatch(setError("City not found"));
        return;
      }

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const weatherslice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.weatherData = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { setWeatherData, setLoading, setError } = weatherslice.actions;
export const selectWeather = (state) => state.weather.weatherData;
export const selectLoading = (state) => state.weather.loading;
export const selectError = (state) => state.weather.error;

export default weatherslice.reducer;
