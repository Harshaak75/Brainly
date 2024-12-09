import './App.css'

import MainComponents from './Pages/mainComponents'
import { ShareDashboard } from './Pages/ShareDashboard'
import { SignIn } from './Pages/SignIn'
import { SignUp } from './Pages/SignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/dashboard' element={<MainComponents/>} />
      <Route path='/share/:shareLink' element={<ShareDashboard/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
