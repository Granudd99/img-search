import React, { useEffect, useState } from "react";

const YourComponent = () => {
  const [inputData, setInputData] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const accessKey = "u-iqsIsYrLkadDhcoBoSUOZKd5mK5dhlPjk4kRhnZm8";

  const baseURL = "https:/api.unsplash.com";

  const searchImages = async () => {
    const url = `${baseURL}/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (page === 1) {
        setResults([]);
      }

      const newResults = data.results || [];
      setResults((prevResults) => [...prevResults, ...newResults]);

      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPage(1);
    searchImages();
  };

  const handleShowMore = () => {
    searchImages();
  };

  useEffect(() => {
    if (page > 1) {
      setShowButton(true);
    }
  }, [page]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          id="search-input"
          placeholder="Serch for images..."
        />
        <button id="search-btn" type="submit">
          Search
        </button>
      </form>
      <div className="search-results">
        {results.map((result) => (
          <div key={result.id} className="search-result">
            <img src={result.urls.small} alt={result.alt_description} />
            <a href={result.links.html} target="_blank">
              {result.alt_description}
            </a>
          </div>
        ))}
        {showButton && (
          <button id="show-more-btn" onClick={handleShowMore}>
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default YourComponent;
