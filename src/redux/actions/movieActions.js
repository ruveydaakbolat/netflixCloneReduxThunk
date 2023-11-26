import axios from "axios";
import { options } from "../../constants/constants";
import { actionTypes } from "../actionTypes";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const getPopular = () => (dispatch) => {
  axios
    .get("/movie/popular", options)
    .then((res) =>
      dispatch({ type: actionTypes.SET_MOVIES, payload: res.data.results })
    )
    .catch((err) => dispatch({type: actionTypes.SET_MOVIES_ERROR}));
};

export const getGenres = () => (dispatch) => {
    axios.get('/genre/movie/list?language=en', options)
    .then((res) => dispatch({type: actionTypes.SET_GENRES, payload: res.data.genres}))
    .catch(() => dispatch({type: actionTypes.SET_GENRES_ERROR}))
}
