import { Routes, Route } from "react-router-dom"
import HomeView from "./HomeView"
import TeamView from "./TeamView"
import UserDetailsView from "./UserDetailsView";
import ErrorPage from './components/ErrorPage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/team/:teamId" element={<TeamView />} />
      <Route path="/user/:userId" element={<UserDetailsView />} />
      <Route path="*" element={<ErrorPage message="Page not found" status='404' />} />
    </Routes>
  )
}

export default App
