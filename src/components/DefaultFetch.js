import { useState, useEffect } from "react";
import moment from "moment";

export default function DefaultFetch() {
  const [posts, setPosts] = useState([]);
  const getData = async () => {
    try {
      const res = await fetch(
        "http://hn.algolia.com/api/v1/search?query=react"
      );
      const data = await res.json();
      // console.log(data);
      const data2 = await data.hits;
      // console.log(data2);
      setPosts(data2);
      // console.log(data2);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const getRightTime = (post) => {
    let unixTime = post;
    // console.log(unixTime);
    let newTime = new Date(unixTime * 1000);
    // console.log(newTime);
    return moment(newTime).fromNow();
  };

  return (
    <div>
      <h1>"Hot React News"</h1>
      {posts?.map((item, index) => (
        <li key={item.objectID}>
          <a href={item.url} target="_blank">
            {item.title}
          </a>
          <p>{getRightTime(item.created_at_i)}</p>
        </li>
      ))}
    </div>
  );
}
// {posts?.map((item, index) => (
//   <h3 key={item.objectID}>{item.title}</h3>
// ))}
