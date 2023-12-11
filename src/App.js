import React, {useState, useEffect} from "react";

import {fetchDataFromApi} from './utils/api';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {getApiConfiguration, getGenres} from './store/homeSlice';

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./pages/home/home";
import Details from "./pages/details/details";
import ErrorPage from "./pages/404/errorPage";
import Explore from "./pages/explore/explore";
import SearchResult from "./pages/searchResult/searchResult";

export default function App(){

  const dispatch = useDispatch();

  const url = useSelector((state) => state.home);

  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[]);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      //console.log(res);
      const url = {
        backdrop : res.images.secure_base_url + "original",
        poster : res.images.secure_base_url + "original",
        profile : res.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url));
    })
  }
  const genresCall = async() => {
    let promises = [];
    let endPoints = ['tv','movie'];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({genres}) => {
      return genres.map((item) => (allGenres[item.id]=item))
    })
    
    dispatch(getGenres(allGenres));
  }
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/:mediaType/:id' element={<Details/>} />
        <Route path='/search/:query' element={<SearchResult/>} />
        <Route path='/explore/:mediaType' element={<Explore/>} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
      <Footer />
    </Router>
  )
}