import { Routes, Route } from "react-router-dom"
import HomeView from "./HomeView"
import TeamView from "./TeamView"
import UserDetailsView from "./UserDetailsView";
import ErrorPage from './components/ErrorPage';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomeView />} />
        <Route path="/team/:teamId" element={<TeamView />} />
        <Route path="/user/:userId" element={<UserDetailsView />} />
        <Route path="*" element={<ErrorPage message="Page not found" status='404' />} />
      </Route>
    </Routes>
  )
}

export default App