import axios from 'axios'
import React from 'react'
import Style from './TrendingMovies.module.css'; // Import the CSS file

import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export default function TrendingMovies() {

    function getTrendingMovies() {
        return axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=ec0aeb17bad86468772d36530290356c`)
    }

    let { data, isLoading } = useQuery('getTrendingMovies', getTrendingMovies)
    return (
        <>
            {isLoading ? <div className='loading-spinner-overlay d-flex  flex-column  justify-content-center ' >
                <div className='loading-spinner'>

                </div>
                <p>Loading...</p>
            </div> :

                < div className="container my-5">
                    <div className="row">
                        <div className="col-md-4 text-white d-flex align-items-center"><div><h3 className="h2 fw-lighter">Trending Movies To Watch Right Now</h3>
                            <p className="Style_secondFontColor__Cuv4d lead">most watched movies by weeks</p>
                        </div>
                        </div>
                        {data?.data?.results.map((movie, index) =>
                            <div key={index} className="col-md-2 mb-4">
                                <Link to={`/movieDetails/${movie.id}`} className='text-dark' >
                                    <div className={Style["movie-cart-item"]}>
                                        <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt={movie.title} />
                                        <div className={Style["movie-details"]}>
                                            <h3 className='h6'>{movie.title.split(' ').splice(0, 1).join(' ')}</h3>
                                            <p>{movie.genre}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}

                        <div className="col-md-4 text-white d-flex align-items-center"><div>
                            <h3 className="h2 fw-lighter">Trending Movies To Watch Right Now</h3>
                            <p className="Style_secondFontColor__Cuv4d lead">most watched movies by weeks</p>
                        </div>
                        </div>
                    </div>

                </div>
            }
        </>

    )
}
