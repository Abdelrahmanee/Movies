import React from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import About from './components/About/About'
import Conatact from './components/Contact/Contact'
import Notfound from './components/Notfound/Notfound'
import Movies from './components/Movies/Movies'
import MovieDetails from './components/MovieDetails/MovieDetails'
import Shows from './components/Shows/Shows'
import ShowDetails from './components/ShowDetails/ShowDetails'
import Person from './components/Persons/Person'
import PersonDetails from './components/PersonDetails/PersonDetails'


let routers = createHashRouter([
  {path : '' , element : <Layout/> , children : [
    {index :true , element : <Home/> },
    {path :'movies' , element : <Movies/> },
    {path :'people' , element : <Person/> },
    {path :'personDetails/:id' , element : <PersonDetails/> },
    {path :'movieDetails/:id' , element : <MovieDetails/> },
    {path :'showDetails/:id' , element : <ShowDetails/> },
    {path :'about' , element : <About/> },
    {path :'contact' , element : <Conatact/> },
    {path :'shows' , element : <Shows/> },
    {path :'*' , element : <Notfound/> },
  ]}

])

export default function App() {
  return <RouterProvider router={routers}/>
}
