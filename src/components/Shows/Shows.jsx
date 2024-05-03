import axios from 'axios';
import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo-dark.webp'
import styles from './Style.module.css'; // Import the CSS module
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Shows() {

    const [shows, setShows] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const headers = {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzBhZWIxN2JhZDg2NDY4NzcyZDM2NTMwMjkwMzU2YyIsInN1YiI6IjY1MzY5YjhjYzE0ZmVlMDBhZDlmMWRlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fCoe00-9bNx2equ_bLjBQwhcJCZ8bTO1Ade-rWAMxtk',
        accept: 'application/json'
    }


    async function getAllShows(pageNum) {
        setIsLoading(true)
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?language=en-US&page=${pageNum}`, { headers })
        setShows(data?.results)
        setIsLoading(false)
    }
    async function searchShows(name) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?query=${name}&include_adult=false&language=en-US&page=1`, {
            headers
        })
        setShows(data?.results)
    }
    useEffect(() => {
        getAllShows(1)
    }, [])
    return (
        <>

            <Helmet>
                <meta charSet="utf-8" />
                <title>TV Shows</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="icon" href={logo} />
            </Helmet>
            {isLoading ? <div className='loading-spinner-overlay d-flex align-items-center  flex-column ' >
                <div className='loading-spinner'>
                </div>
                <p>Loading...</p>
            </div> : <div className="container my-5">
                <input type="text" placeholder='Search by TV Show name...'className="form-control fw-bold text-white bg-search mb-3 px-3 py-2 rounded-pill border-info" 
                 onChange={(e) => {
                    e.target.value === '' ? getAllShows(1) : searchShows(e.target.value)
                }} />
                <div className="row mb-3">
                    {shows?.map((show, index) => (
                        <div key={index} className="col-sm-4  col-md-3  my-2">
                            <Link to={`/showDetails/${show.id}`}>
                                <div className={`${styles.card}`}>
                                    <div className={styles.cardImgContainer}>
                                        <img
                                            src={'https://image.tmdb.org/t/p/w500/' + show.poster_path}
                                            className={`${styles.cardImg}`}
                                            alt="TV Show Image"
                                        />
                                        <div className={styles.cardImgOverlay}>
                                            <h5 className={`${styles.cardTitle}`}>{show.original_name}</h5>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className='w-100 d-flex justify-content-center'>
                    <nav aria-label="Page navigation example">
                        <ul className='pagination'>
                            <li className='page-item'><button className='page-link' onClick={() => getAllShows(1)} ><span aria-hidden="true">&laquo;</span></button></li>
                            <li className='page-item'><button className='page-link' onClick={() => getAllShows(1)}>1</button></li>
                            <li className='page-item'><button className='page-link' onClick={() => getAllShows(2)}>2</button></li>
                            <li className='page-item'><button className='page-link' onClick={() => getAllShows(3)}>3</button></li>
                            <li className='page-item'><button className='page-link' onClick={() => getAllShows(4)}>4</button></li>
                            <li className='page-item'><button className='page-link' onClick={() => getAllShows(5)}>5</button></li>
                            <li className='page-item'><button className='page-link' onClick={() => getAllShows(3)}><span aria-hidden="true">&raquo;</span></button></li>
                        </ul>
                    </nav>
                </div>
            </div>
            }
        </>
    )
}
