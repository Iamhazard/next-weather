import { Inter } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Loader from "../components/Weather/Spinner";
import {
  fetchWeatherData,
  selectError,
  selectWeather,
} from "@/components/Redux/features/weatherslice";
import Weather from "@/components/Weather/weather";

import Image from "next/image";
import { selectLoadingMemoized } from "@/components/Redux/features/selectors";
import { toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch();
  //const loading = useSelector(selectLoading);
  const [city, setIsCity] = useState("");
  //const error = useSelector(setError);
  const weatherData = useSelector(selectWeather);
  //const weatherData = useSelector(selectWeatherDataMemoized);
  const loading = useSelector(selectLoadingMemoized);
  const Error = useSelector(selectError);

  const fetchWeather = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      toast.error("Please enter a city name");
      return;
    }

    try {
      dispatch(fetchWeatherData(city));
    } catch (error) {
      if (error.message.includes("404")) {
        toast.error("City not found");
      } else {
        toast.error("An error occurred while fetching the weather data");
      }
    }
  };
  // console.log(weatherData);

  if (loading === "pending") {
    return <Loader />;
  }
  if (loading === "rejected") {
    return <p>Error</p>;
  }
  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 group-hover:opacity-0 transition-opacity">
        <Image
          className="object-cover"
          src="https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?auto=format&fit=crop&q=80&w=2074&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          layout="fill"
          alt="weather"
        />
      </div>
      <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10">
        <form
          className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-800 text-white rounded-2xl"
          onSubmit={fetchWeather}>
          <div>
            <input
              onChange={(e) => setIsCity(e.target.value)}
              value={city}
              type="text"
              placeholder="Search city"
              className="bg-transparent border-none text-zinc-800 focus:outline-none text-2xl"
            />
          </div>

          <button type="button" onClick={fetchWeather}>
            <BsSearch size={20} />
          </button>
        </form>
      </div>
      {weatherData && weatherData.main && <Weather data={weatherData} />}
    </div>
  );
}
