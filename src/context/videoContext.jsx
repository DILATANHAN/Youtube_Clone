import { createContext, useEffect, useState } from "react";
import api from "../utils/api";
import { categories } from "../constants";

// * 1) Context temelini olustur.
export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    //*secilen type i belirle
    const type = selectedCategory.type;
    //* secilen kategorinin type i menu ise fonksiyonu durdur
    if (type === "menu") return;
    //* yuklemeyi true ya cek
    setIsLoading(true);
     //* istek atacagimiz url yi belirledik
    const url =
      type === "home"
        ? "/home"
        : type === "trending"
        ? "/trending"
        : type === "category"
        ? `/search?query=${selectedCategory.name} `
        : "";
  //* api istegi at ve durumu state aktar
    api
      .get(url)
      .then((res) => setVideos(res.data?.data))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [selectedCategory]);

  return (
    <VideoContext.Provider
      value={{
        videos,
        error,
        isLoading,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
