import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../PlayBtn.jsx";
import {StreamIcon} from "../StreamBtn.jsx"
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import {fetchRandomMovieGenre} from '../../../utils/apiRandomGenre.js';

import { GlobalContext } from "../../../context/GlobalState";

const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const navigate = useNavigate();
    const RandomMovieId = useState("");
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);

    const { url } = useSelector((state) => state.home);

    const _genres = data?.genres?.map((g) => g.id);
    const year = dayjs(data?.release_date).format("YYYY");
    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const LinkUrl = `https://movie-web-me.vercel.app/media/tmdb-movie-${id}`

    const { addMovieToWatchlist, watchlist,} = useContext(GlobalContext);
    let StoredMovie = watchlist.find(o => o.id == id);

    const watchlistDisabled = StoredMovie ? true : false;

    const RandomQueryHandler = () => {

        RandomMovieId(
            fetchRandomMovieGenre(_genres[0]).then((result) => {
                navigate(`/movie/${result}`);
            }));            
    };




    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Img src={url.backdrop + data.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <Img
                                                className="posterImg"
                                                src={
                                                    url.backdrop +
                                                    data.poster_path
                                                }
                                            />
                                        ) : (
                                            <Img
                                                className="posterImg"
                                                src={PosterFallback}
                                            />
                                        )}

                                        

                                        <div className="btn1" >
                                            <div>
                                                
                                                <button className="kkrbtn" onClick={RandomQueryHandler} >
                                                    <span>
                                                        Un autre KoiKonRegarde du genre !
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${
                                                data.name || data.title
                                            } (${dayjs(
                                                data?.release_date
                                            ).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>

                                        <Genres data={_genres} />

                                        <div className="row">
                                            <CircleRating
                                                rating={data.vote_average.toFixed(
                                                    1
                                                )}
                                            />
                                            <div
                                                className="playbtn"
                                                onClick={() => {
                                                    setShow(true);
                                                    setVideoId(video.key);
                                                }}
                                            >
                                                <PlayIcon />
                                                <span className="text">
                                                    Voir la Bande-annonce
                                                </span>
                                            </div>
                                        {year<2024 &&
                                            <a href={LinkUrl} target="_blank">
                                                <div
                                                className="streambtn"    
                                                >
                                                <StreamIcon />
                                                <span className="text">
                                                    Voir le film
                                                </span>
                                            </div>
                                            </a> 
                                          } 
                                            <button
                                            className="watchCtlr"
                                            disabled={watchlistDisabled}
                                            onClick={() => addMovieToWatchlist(data)}
                                            >                         
                                            <span className="IconContainer">
                                            <svg viewBox="0 0 384 512" height="0.9em" className="icon">
                                            <path
                                            d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
                                            ></path>
                                            </svg>
                                            </span>
                                            <p className="textBtn">Watchlist</p>
                                        </button>

                                        </div>
                                        <div className="overview">
                                            <div className="heading">
                                                Résumé
                                            </div>
                                            <div className="description">
                                                {data.overview}
                                            </div>
                                        </div>

                                        <div className="info">
                                            {data.release_date && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Date de Sortie :{" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(
                                                            data.release_date
                                                        ).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Durée :{" "}
                                                    </span>
                                                    <span className="text">
                                                        {toHoursAndMinutes(
                                                            data.runtime
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {director?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Réalisé par {" "}
                                                </span>
                                                <span className="text">
                                                    {director?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {director.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Scénario:{" "}
                                                </span>
                                                <span className="text">
                                                    {writer?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {writer.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                    </div>
                                </div>
                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;