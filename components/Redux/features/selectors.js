import { createSelector } from "reselect";

// Selectors
const selectWeatherData = (state) => state.weather.weatherData;
const selectLoading = (state) => state.weather.loading;
const selectError = (state) => state.weather.error;

// Create memoized selectors
export const selectWeatherDataMemoized = createSelector(
  [selectWeatherData],
  (weatherData) => weatherData
);

export const selectLoadingMemoized = createSelector(
  [selectLoading],
  (loading) => loading
);

export const selectErrorMemoized = createSelector(
  [selectError],
  (error) => error
);
