import React from "react";
import './style.scss';
import HeroBanner from './heroBanner/HeroBanner';
import Trending from "./trending/trending";
import Popular from "./popular/popular";
import TopRated from "./topRated/topRated";

export default function Home(){
    return (
        <div className="homePage">
          <HeroBanner /> 
          <Trending />
          <Popular />
          <TopRated />
        </div>
    )
}