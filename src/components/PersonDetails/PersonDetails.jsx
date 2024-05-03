import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import {  useParams } from 'react-router-dom';

export default function PersonDetails() {
    const { id } = useParams()
    function getPerson(id) {
        return axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=ec0aeb17bad86468772d36530290356c`)
    }
    const { isLoading, data } = useQuery('show', () => getPerson(id))
    
    return (<>
        {isLoading ? 
        <div className='loading-spinner-overlay d-flex flex-column  justify-content-center ' >
            <div className='loading-spinner'>
            </div>
            <p>Loading...</p>
        </div> :
            <div  className="container my-5 ">
                {data ?
                    <div key={data?.data.id}  className="row my-5 mx-auto ">

                        < div className="col-md-4" >

                            <img className='w-75 mb-2' src={`https://image.tmdb.org/t/p/w500${data?.data.profile_path}`} alt={data.data.title} />
                        </div >
                        <div className="col-md-8  d-flex  justify-content-center  align-items-center ">
                            <div className="">
                            <h2>{data.data.name}</h2>
                            <p>Place of birth : {data.data.place_of_birth}</p>

                            <p>Birthday : {data.data.birthday}</p>
                            <h3 className='fw-light h6  '>{data.data.biography}</h3>
                            
                            
                            </div>
                        </div>
                    </div > : ''
                }
            </div>}
    </>
    );
}
