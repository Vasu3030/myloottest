import { Routes, Route } from "react-router-dom"
import HomeView from "./HomeView"
import TeamView from "./TeamView"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/team/:teamId" element={<TeamView />} />
    </Routes>
  )
}

export default App
