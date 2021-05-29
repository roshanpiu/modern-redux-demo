import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { incremented, amountAdded } from "./features/counter/counter-slice";
import { useFetchBreedsQuery } from "./features/dogs/dogs-slice";

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  function handleClick() {
    dispatch(incremented());
  }

  const [amount, setAmount] = useState(0);

  function handleAddAmount() {
    dispatch(amountAdded(amount));
    setAmount(0);
  }

  const [numDog, setNumDogs] = useState(10);

  const { data = [], isFetching } = useFetchBreedsQuery(numDog);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Vite + React Counter</p>
        <p>Count: {count}</p>
        <p>
          <button onClick={handleClick}>Increment</button>
        </p>
        <input
          type="number"
          value={amount}
          onChange={(event) => setAmount(+event.target.value)}
          style={{ padding: "10px", margin: "5px" }}
        ></input>
        <button onClick={handleAddAmount}>Add Amount</button>
        {isFetching && (
          <div>
            <p>Loading...</p>
          </div>
        )}
        <div>
          {!isFetching && (
            <div>
              <div>
                <p>Dogs to fetch.</p>
                <select
                  value={numDog}
                  onChange={(e) => setNumDogs(+e.target.value)}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>20</option>
                </select>
              </div>
              <div>
                <p>Number of Dogs Fetched: {data.length}</p>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Picture</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((breed) => (
                      <tr key={breed.id}>
                        <td>{breed.name}</td>
                        <td>
                          <img
                            src={breed.image.url}
                            alt={breed.name}
                            height={"250px"}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
