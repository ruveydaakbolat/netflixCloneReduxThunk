import { useEffect } from "react";
import Hero from "../components/Hero";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPopular } from "../redux/actions/movieActions";
import { actionTypes } from "../redux/actionTypes";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";

const MainPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);

  useEffect(() => {
    dispatch({ type: actionTypes.SET_MOVIES_LOADING });
    dispatch(getPopular());

    dispatch({ type: actionTypes.SET_GENRES_LOADING });
    dispatch(getGenres());
  }, []);

  return (
    <div>
      <Hero />

      {state.isGenresLoading ? (
        <Loading />
      ) : state.isGenresError ? (
        <p>Üzgünüz hata oluştu</p>
      ) : (
        state.genres.map((genre) => <MovieList key={genre.id} genre={genre} />)
      )}
    </div>
  );
};

export default MainPage;
