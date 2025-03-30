import { Outlet, useRoutes } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import Scrollbar from "./components/Scrollbar/Scrollbar"
import Home from "./pages/Home"
import NavigationBar from "./components/NavBar/NavigationBar"
import BlogPage from "./pages/BlogPages/BlogPage"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
import ContactMe from "./pages/ContactMe"
import Services from "./pages/Services"
import BlogPost from "./components/Blog/BlogPost"
import PortfolioPage from "./pages/Portfolio"

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
          element: <About />
        },
        {
          path: '/contact',
          element: <ContactMe />
        },
        {
          path: '/side-quests',
          element: <BlogPage />
        },
        {
          path: '/side-quests/:id',
          element: <BlogPost />
        },
        {
          path: '/services',
          element: <Services />
        },
        {
          path: '/portfolio',
          element: <PortfolioPage />
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    }
  ])
  return (
    <main className="bg-black">
      {element}
    </main>
  )
}

export default App
