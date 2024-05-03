import axios from 'axios'
import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo-dark.webp'
import { Link } from 'react-router-dom'
import styles from './Style.module.css'; // Import the CSS module
import { Helmet } from 'react-helmet'

export default function Person() {
    const [people, setPeople] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const headers = {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzBhZWIxN2JhZDg2NDY4NzcyZDM2NTMwMjkwMzU2YyIsInN1YiI6IjY1MzY5YjhjYzE0ZmVlMDBhZDlmMWRlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fCoe00-9bNx2equ_bLjBQwhcJCZ8bTO1Ade-rWAMxtk',
        accept: 'application/json'
    }


    async function getAllPeople(pageNum) {
        setIsLoading(true)
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/person/week?language=en-US&page=${pageNum}`, { headers })
        setPeople(data?.results)
        setIsLoading(false)
    }
    async function searchPoeple(name) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/search/person?query=${name}&include_adult=false&language=en-US&page=1`, {
            headers
        })
        setPeople(data?.results)
    }
    useEffect(() => {
        getAllPeople(1)
    }, [])




    return (

        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>People</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="icon" href={logo} />
            </Helmet>

            {isLoading ? <div className='loading-spinner-overlay d-flex align-items-center  flex-column ' >
                <div className='loading-spinner'>
                </div>
                <p>Loading...</p>
            </div> :
                <div className="container my-5">
                        <input type="text" placeholder='Search by People by name...' className="form-control fw-bold text-white bg-search mb-3 px-3 py-2 rounded-pill border-info" onChange={(e) => {
                            e.target.value === '' ? getAllPeople(1) : searchPoeple(e.target.value)
                        }} />

                        <div className="row mb-3">
                            {people?.map((person, index) => (
                                <div key={index} className="col-sm-4  col-md-3  my-2">
                                    <Link to={`/personDetails/${person.id}`}>
                                        <div className={`${styles.card}`}>
                                            <div className={styles.cardImgContainer}>
                                                <img
                                                    src={'https://image.tmdb.org/t/p/w500/' + person.profile_path}
                                                    className={`${styles.cardImg}`}
                                                    alt="TV person Image"
                                                />
                                                <div className={styles.cardImgOverlay}>
                                                    <h5 className={`${styles.cardTitle}`}>{person.original_name}</h5>
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
                                    <li className='page-item'><button className='page-link' onClick={() => getAllPeople(1)} ><span aria-hidden="true">&laquo;</span></button></li>
                                    <li className='page-item'><button className='page-link' onClick={() => getAllPeople(1)}>1</button></li>
                                    <li className='page-item'><button className='page-link' onClick={() => getAllPeople(2)}>2</button></li>
                                    <li className='page-item'><button className='page-link' onClick={() => getAllPeople(3)}>3</button></li>
                                    <li className='page-item'><button className='page-link' onClick={() => getAllPeople(4)}>4</button></li>
                                    <li className='page-item'><button className='page-link' onClick={() => getAllPeople(5)}>5</button></li>
                                    <li className='page-item'><button className='page-link' onClick={() => getAllPeople(3)}><span aria-hidden="true">&raquo;</span></button></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
            }
                </>
    )
}
