import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  const fetchStories = async () => {
    const r = await fetch("/users");
    const users = await r.json();
    console.log("Users", users);
    // dispatch(grabAllStories(stories));
  }

  useEffect(() => {
    // fetch("/users")
    //   .then((r) => r.json())
    //   .then((data) => console.log(data));

    fetchStories();
  }, []);


  return (
    <div className="App">
      <h1>Page Count: {count}</h1>
    </div>
  );


}

export default App;
