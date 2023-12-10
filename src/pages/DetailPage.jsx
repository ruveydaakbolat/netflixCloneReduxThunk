import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseImageURL, options } from "../constants/constants";
import Loading from "../components/Loading";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const DetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);

  axios.defaults.baseURL = "https://api.themoviedb.org/3";

  useEffect(() => {
    axios
      .get(`/movie/${id}`, options)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`/movie/${id}/credits`, options)
      .then((res) => setCast(res.data.cast))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="row">
      {!movie ? (
        <Loading />
      ) : (
        <>
          <div className="col-12 banner">
            <img
              className="w-100 h-100 object-fit-cover"
              src={baseImageURL.concat(movie.backdrop_path)}
            />
            <div className="banner-bg">
              <span>{movie.title}</span>
            </div>
          </div>

          <div className="col-md-6 mt-4 p-4">
            <h3>Yapımcı Şirketler</h3>
            <div className="d-flex flex-wrap gap-4">
              {movie.production_companies.map((comp) => (
                <div className="bg-white rounded p-2 d-flex align-items-center">
                  {comp.logo_path ? (
                    <img
                      className="object-fit-contain"
                      width={100}
                      height={50}
                      title={comp.name}
                      src={baseImageURL.concat(comp.logo_path)}
                    />
                  ) : (
                    <p
                      style={{ width: "100px", marginTop: "10px" }}
                      className="text-black"
                    >
                      {comp.name}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <h3 className="mt-4">Konuşulan Diller</h3>
            <div className="d-flex flex-wrap gap-4">
              {movie.spoken_languages.map((lang) => (
                <div className="bg-white rounded p-1 text-black">
                  <span>{lang.english_name}</span>
                </div>
              ))}
            </div>

            <h3 className="mt-4">Yapımcı Ülkeler</h3>
            <div className="d-flex flex-wrap gap-4">
              {movie.production_countries.map((country) => (
                <div className="bg-white rounded p-1 text-black">
                  <span>{country.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6 mt-4 p-4">
            <p className="lead">{movie.overview}</p>

            <p>
              <span className="fw-bold">Bütçe:</span> {movie.budget}
            </p>
            <p>
              <span className="fw-bold">Gelir:</span> {movie.revenue}
            </p>
          </div>

          <div className="col-12 p-4 mb-3">
            <h2>Oyuncular</h2>
            <Splide
              options={{
                height: "200px",
                gap: "10px",
                pagination: false,
                autoWidth: true,
              }}
              aria-label="My Favorite Images"
            >
              {cast?.map((actor) => (
                <SplideSlide key={actor.cast_id}>
                  <div className="actor-card h-100">
                    <img
                      className="movie"
                      src={baseImageURL.concat(actor.profile_path)}
                    />
                    <p>
                      <span>{actor.name}</span>
                    </p>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
