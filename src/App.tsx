import { BrowserRouter, Route, Routes } from "react-router-dom"
import  Body  from "./components/Body"
import Notes from "./components/Notes"
import Login from "./components/Login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"



function App() {


  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
      <Route path="/" element={<Notes/>} />
      <Route path="/login" element={<Login/>} />
        </Route>
      </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
