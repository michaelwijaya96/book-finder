import Navbar from "./components/Navbar/index"
import { BrowserRouter, Route } from "react-router-dom"
import Home from "./components/Home/index"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MuiThemeProvider>
          <Navbar />
          <Route path="/" component={Home} />
        </MuiThemeProvider>
      </div>
    </BrowserRouter>
  )
}

export default App
