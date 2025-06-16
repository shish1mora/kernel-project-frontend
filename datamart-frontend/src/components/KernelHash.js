import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import useFetch from "../hooks/useFetch";
import Kernpage from "./KernPage";

const Kernelhash = () => {
  const apiUrl = process.env.REACT_APP_REST_API_URL;
  const apiPort = process.env.REACT_APP_REST_API_PORT;
  const [kernelHash, setKernelHash] = useState("");

  // Функция для очистки поля ввода
  const clearSearch = () => {
    setKernelHash("");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        clearSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [clearSearch]);

  const url = kernelHash
    ? `${apiUrl}:${apiPort}/get_kern_data/${kernelHash}`
    : null;

  const { data } = useFetch(url);

  return (
    <div className="home">
      <div className="input-wrapper kernel-search">
        <FaSearch id="search-icon" />
        <input
          type="text"
          value={kernelHash}
          spellCheck="false"
          onChange={(e) => setKernelHash(e.target.value)}
          placeholder="Введите хеш ядра"
        />

        {kernelHash && (
          <FaTimes
            id="clear-icon"
            onClick={clearSearch}
            style={{ cursor: "pointer" }}
            aria-label="Очистить ввод"
          />
        )}
      </div>

      {kernelHash && !data && "Получение данных..."}
      {kernelHash && data && <Kernpage kernel_data={data.data} />}
    </div>
  );
};

export default Kernelhash;