
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'

export default  function MovieDetails () {

  const { id } = useParams()

  function getMovie(id) {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=ec0aeb17bad86468772d36530290356c`)
  }
  const { isLoading, data } = useQuery('movie', () => getMovie(id))

  return (<>
    {isLoading ? <div className='loading-spinner-overlay d-flex flex-column  justify-content-center' >
      <div className='loading-spinner'>

      </div>
      <p>Loading...</p>
    </div> :
      <div className="container" >
        {data ?
          <div key={data?.data.id}  className="row my-4">

            < div className="col-md-4" >

              <img src={`https://image.tmdb.org/t/p/w500${data?.data.poster_path}`} alt={data.data.title} className="img-fluid" />
            </div >
            <div className="col-md-8">
              <h2>{data.data.title}</h2>
              <h3 >{data.data.tagline}</h3>
              <div className="my-2">
                {data.data.genres.map((item) => (
                  <span className="btn light-bg-color fw-semibold my-1  btn-primary ls mx-2  btn-sm">{item.name}</span>
                ))}
              </div>
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
                <p>releasedate : {data.data.release_date}</p>
              </div>
              <p className='text-white-50 '>releasedate : {data.data.overview}</p>
              <Link className="btn btn-primary w-100" >Watch Now</Link>
            </div>
          </div > : ''
        }
      </div>}
  </>
  );
}
