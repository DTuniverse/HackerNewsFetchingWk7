import { useState, useEffect } from "react";
import moment from "moment";
import LoadingSpinner from "./LoadingSpinner";

export default function Search() {
  //   const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (value) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://hn.algolia.com/api/v1/search?query=${value}`
      );
      const searchData = await res.json();
      // console.log(searchData);
      const searchData2 = await searchData.hits;
      // console.log(searchData2);
      setSearch(searchData2);
      // console.log(searchData2);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const handleChange = (value) => {
    // setInput(value);
    fetchData(value);
    // console.log();
  };

  const getRightTime = (post) => {
    let unixTime = post;
    // console.log(unixTime);
    let newTime = new Date(unixTime * 1000);
    // console.log(newTime);
    return moment(newTime).fromNow();
  };

  return (
    <div>
      <input
        placeholder="Type to search..."
        // value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div>
        <h1>Search Results</h1>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          Array.isArray(search) &&
          search?.map((item, index) => (
            <li key={item.objectID}>
              <a href={item.url} target="_blank">
                {item.title}
              </a>
              <p>{getRightTime(item.created_at_i)}</p>
            </li>
          ))
        )}
      </div>
    </div>
  );
}

/* <div>
        {search?.map((item, index) => (
          <li key={item.objectID}>
            <a href={item.url} target="_blank">
              {item.title}
            </a>
          </li>
        ))}
      </div> */
