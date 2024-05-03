import React from 'react'
import styles from './Style.module.css'; // Import the CSS module
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function TrendingPeople() {




    function getTrendingPeople() {
        return axios.get(`https://api.themoviedb.org/3/trending/person/week?api_key=ec0aeb17bad86468772d36530290356c`)
    }

    let { data, isLoading } = useQuery('getTrendingPeople', getTrendingPeople)
    return (
        <>
            {isLoading ? <div className='loading-spinner-overlay d-flex  flex-column  justify-content-center ' >
                <div className='loading-spinner'>

                </div>
                <p>Loading...</p>
            </div> : < div className="container my-5">
                <div className="row">
                    <div className="col-md-4 text-white d-flex align-items-center">
                        <div>
                            <h3 className="h2 fw-lighter">Trending People To Follow Right Now</h3>
                            <p className="Style_secondFontColor__Cuv4d lead">most watched people by weeks</p>
                        </div>
                    </div>
                    {data?.data?.results.map((person, index) =>

                        <div key={index} className="col-md-2  my-2">
                            <Link to={`/personDetails/${person.id}`}>
                                <div className={`${styles.card}`}>
                                    <div className={styles.cardImgContainer}>
                                        <img
                                            src={'https://image.tmdb.org/t/p/w500/' + person.profile_path}
                                            className={`${styles.cardImg}`}
                                            alt="TV person"
                                        />
                                        <div className={styles.cardImgOverlay}>
                                            <h5 className={`${styles.cardTitle}`}>{person.original_name}</h5>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                    <div className="col-md-4 text-white d-flex align-items-center">
                        <div>
                            <h3 className="h2 fw-lighter">Trending People To Follow Right Now</h3>
                            <p className="Style_secondFontColor__Cuv4d lead">most watched people by weeks</p>
                        </div>
                    </div>

                </div>
            </div>


            }



        </>
    )
}
