import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createClient } from "@supabase/supabase-js";
import './App.css'

  const supabase = createClient("https://dzmmfskrxgkcjakmhutk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bW1mc2tyeGdrY2pha21odXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg4OTQ5NTksImV4cCI6MjAyNDQ3MDk1OX0.rcnmUdhmLpXxlhgkPAUq1jA743biNbMLZtOtR361AS0");


function App() {
  const [count, setCount] = useState(0)

  const [countries, setCountries] = useState([]);

  // Sample pulling from countries supabase data!
  //   useEffect(() => {
  //     getCountries();
  //   }, []);

  //   async function getCountries() {
  //     const { data } = await supabase.from("countries").select();
  //     setCountries(data);
  //   }

  //   return (
  //     <ul>
  //       {countries.map((country) => (
  //         <li key={country.name}>{country.name}</li>
  //       ))}
  //     </ul>
  //   );
  // }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
