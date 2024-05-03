import React from 'react'
import Style from './Style.module.css'
import Slider from "react-slick";
import axios from 'axios';
import { useQuery } from 'react-query';


export default function MainSlider() {
     
    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 7,
        autoplaySpeed: 1000,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows:false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 7, // Display 6 slides on screens from 1200px and below
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 5, // Display 5 slides on screens from 992px to 1199px
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4, // Display 4 slides on screens from 768px to 991px
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 3, // Display 3 slides on screens from 576px to 767px
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    
    
    let headers = {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzBhZWIxN2JhZDg2NDY4NzcyZDM2NTMwMjkwMzU2YyIsInN1YiI6IjY1MzY5YjhjYzE0ZmVlMDBhZDlmMWRlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fCoe00-9bNx2equ_bLjBQwhcJCZ8bTO1Ade-rWAMxtk',
        accept: 'application/json'
    }
    function getLatestMovies() {
        return axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, { headers })
    }

    let { data } = useQuery('getLatestMovies', getLatestMovies)


    return <>
        {data?.data ? <div className={`${Style.header}`}>
            <p></p>
            <div className="h-100">
                <div className="px-5">
                    <h3 className={`${Style.heading} display-5`}>OUR LATEST MOVIES </h3>
                    <Slider {...settings}>
                        {data?.data.results.map((movie , index) =>
                         <img alt={movie.title} key={index} height={300} src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} />
                        //  {console.log('https://image.tmdb.org/t/p/w500/' + movie.poster_path)}
                         )}
                    </Slider>
                </div>
            </div>
        </div>
            : ''
        }
    </>
}