import { Outlet, useRoutes } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import Scrollbar from "./components/Scrollbar/Scrollbar"
import Home from "./pages/Home"
import NavigationBar from "./components/NavBar/NavigationBar"

const Layout = () => {
  return (
    <>
      <NavigationBar />
      <Scrollbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function App() {

  const element = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/about',
          element: <div>about me</div>
        },
        {
          path: '/side-quests',
          element: <div>side quests</div>
        },
        {
          path: '/contact',
          element: <div>contact me</div>
        },
      ]
    }
  ])
  return (
    <>
      {element}
    </>
  )
}

export default App
