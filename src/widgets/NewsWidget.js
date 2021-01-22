/*
Made by Atholos
The function returns the element NewsBrowseGrid and the data needed for it.
*/

import React from 'react';
import NewsBrowseGrid from "../fragments/NewsBrowseGrid";
import NewsHooks from '../hooks/NewsHooks';
import {useState, useEffect} from 'react'

const NewsBrowseWidget = () =>  {
    const { getNewsItems } = NewsHooks();
    const [tileData, setTileData] = useState(null);

    // fetching 10 freshed news
  const updateNews = async () => {
    const newsItems = await getNewsItems();
    console.log(newsItems);
    setTileData(newsItems);
  };

  useEffect(() => {
    updateNews()
  },[]); //eslint-disable-line

    return (
        <NewsBrowseGrid tileData={tileData} />
    );
};

export default NewsBrowseWidget;
