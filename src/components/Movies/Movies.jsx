import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Style from './Movies.module.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import logo from '../../assets/logo-dark.webp'

export default function Movies(pageNumber) {

    let headers = {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzBhZWIxN2JhZDg2NDY4NzcyZDM2NTMwMjkwMzU2YyIsInN1YiI6IjY1MzY5YjhjYzE0ZmVlMDBhZDlmMWRlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fCoe00-9bNx2equ_bLjBQwhcJCZ8bTO1Ade-rWAMxtk',
        accept: 'application/json'
    }

    let [movies, setMovies] = useState([])
    let [isLoading, setIsLoading] = useState(false)
    async function getMovies(pageNum) {
        setIsLoading(true)
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${pageNum}`, {
            headers
        })
        setMovies(data.results)
        setIsLoading(false)

    }

    async function searchMovies(name) {

        const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US`, { headers })
        setMovies(data?.results)
    }
    

    useEffect(() => {
        getMovies(1)
    }, [])
    return (
        <>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Movie</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="icon" href={logo} />
            </Helmet>

            {isLoading ? <div className='loading-spinner-overlay d-flex  flex-column  justify-content-center ' >
                <div className='loading-spinner'>

                </div>
                <p>Loading...</p>
            </div> :

                <div className="container my-5">
                    <input type="text" placeholder='Search by TV Movie name...' className="form-control fw-bold text-white bg-search mb-3 px-3 py-2 rounded-pill border-info"
                        onChange={(e) => {
                            e.target.value === '' ? getMovies(1) : searchMovies(e.target.value)
                        }} />
                    <div className="row mt-4">
                        {movies?.map((movie, index) => <div key={index} className='col-md-3 mb-3'>
                            <Link to={`/movieDetails/${movie.id}`} className='text-dark' >
                                <div className={Style["movie-cart-item"]}>
                                    <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt={movie.title} />
                                    <div className={Style["movie-details"]}>
                                        <h3 className='h6'>{movie.title.split(' ').splice(0, 4).join(' ')}</h3>
                                        <p>{movie.genre}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        )}
                    </div>
                    <div className='w-100 d-flex justify-content-center'>
                        <nav aria-label="Page navigation example">
                            <ul className='pagination'>
                                <li className='page-item'><button className='page-link' onClick={() => getMovies(1)} ><span aria-hidden="true">&laquo;</span></button></li>
                                <li className='page-item'><button className='page-link' onClick={() => getMovies(1)}>1</button></li>
                                <li className='page-item'><button className='page-link' onClick={() => getMovies(2)}>2</button></li>
                                <li className='page-item'><button className='page-link' onClick={() => getMovies(3)}>3</button></li>
                                <li className='page-item'><button className='page-link' onClick={() => getMovies(4)}>4</button></li>
                                <li className='page-item'><button className='page-link' onClick={() => getMovies(5)}>5</button></li>
                                <li className='page-item'><button className='page-link' onClick={() => getMovies(3)}><span aria-hidden="true">&raquo;</span></button></li>
                            </ul>
                        </nav>
                    </div>
                </div>




            }
        </>

    )
}
