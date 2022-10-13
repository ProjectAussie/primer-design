import Create from "./pages/Create"
import Cart from "./pages/Cart"
import Search from "./pages/Search"
import Profile from "./pages/Profile"

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return <Router>
    <Routes>
      <Route exact path ='/' element={<Create/>} />
      <Route exact path='/cart' element={<Cart/>} />
      <Route exact path='/search' element={<Search/>} />
      <Route exact path='/profile' element={<Profile/>} />
    </Routes>
  </Router>
}

export default App
