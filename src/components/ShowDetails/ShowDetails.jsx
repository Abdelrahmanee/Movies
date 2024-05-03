import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'

export default function ShowDetails() {
    const { id } = useParams()
    function getShow(id) {
        return axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=ec0aeb17bad86468772d36530290356c`)
    }
    const { isLoading, data } = useQuery('show', () => getShow(id))
    return (<>
        {isLoading ? 
        <div className='loading-spinner-overlay d-flex flex-column  justify-content-center ' >
            <div className='loading-spinner'>
            </div>
            <p>Loading...</p>
        </div> :
            <div  className="container my-5 ">
                {data ?
                    <div key={data?.data.id}  className="row my-5 gap-5">

                        < div className="col-md-4" >

                            <img src={`https://image.tmdb.org/t/p/w500${data?.data.poster_path}`} alt={data.data.title} className="w-100" />
                        </div >
                        <div className="col-md-7">
                            <h2>{data.data.name}</h2>
                            <h3 className='h6'>{data.data.tagline}</h3>
                           
                            <p>{data.data.overview}</p>
                            <p>
                                <strong>Release Date:</strong> {data.data.release_date}
                            </p>
                            <p>
                                <strong>Vote Average:</strong> {data.data.vote_average}
                            </p>
                            <div className="">
                                <p>Vote : {data.data.vote_average}</p>
                                <p>Vote count : {data.data.vote_count}</p>
                                <p>popularity : {data.data.popularity}</p>
                            </div>
                            <Link className="btn btn-primary w-100" >Watch Now</Link>
                        </div>
                    </div > : ''
                }
            </div>}
    </>
    );
}
