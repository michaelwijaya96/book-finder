import Navbar from "./components/Navbar/index"
import { BrowserRouter, Route } from "react-router-dom"
import Home from "./components/Home"
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route path="/" component={Home} />
        <Route path="/" component={Home} />
        <Route path="/" component={Home} />
      </div>
    </BrowserRouter>
  )
}

export default App
