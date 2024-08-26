import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Pages/Header/Header'
import Dashboard from './Pages/Dashboard/Dashboard'
import NoMatch from './Pages/NoMatch/NoMatch'
import PostUser from './Pages/Employee/PostUser'
import UpdateUser from './Pages/Employee/UpdateUser'

function App() {
  return (
    <>
      <Header/>

      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/employee' element={<PostUser/>} />
        <Route path='/employee/:id' element={<UpdateUser/>} />
        <Route path='*' element={<NoMatch/>} />
      </Routes>
    </>
  )
}

export default App
