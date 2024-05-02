import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [myURLs, setMyURLs] = useState([]); // Array to hold URL and favicon info
  const [myFavicons, setMyFavicons] = useState([]); // Array to hold URL and favicon info
  const [showAddURLDialog, setShowAddURLDialog] = useState(false); // State for Add URL dialog
  const [newURL, setNewURL] = useState(''); // State for new URL input


  let nextID = 0;
  let faviconAPIURL = 'https://www.google.com/s2/favicons?domain=';
  let imgSize = 128;

  // useEffect(() => {
  //   // Simulate fetching favicons (replace with actual fetching logic)
  //   const fetchFavicons = async () => {
  //     const promises = myURLs.map(async (url) => {
  //       console.log("fetchFaviconsURL1: ", url);
  //       //Google API: https://www.google.com/s2/favicons?domain=${domain}&sz=${size}
  //       //const response = await fetch('https://www.google.com/s2/favicon?domain=',url,'&sz=512'); // Replace with actual favicon fetching logic
  //       let faviconImg = `${faviconAPIURL}${url}&sz=${imgSize}`;
  //       const response = await fetch(faviconImg);
  //       const favicon = response.ok ? await response.blob() : null;
  //       console.log("fetchFaviconsURL2: ", url, "FAV: ", favicon);
  //       return { url, favicon };
  //     });
  //     const updatedURLs = await Promise.all(promises);
  //     //setMyURLs(updatedURLs);
  //   };
  //   fetchFavicons();
  // }, [myURLs]); // Re-fetch favicons when myURLs changes


  const getTitle = (url) => {  
    return fetch(`https://crossorigin.me/${url}`)
      .then((response) => response.text())
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const title = doc.querySelectorAll('title')[0];
        return title.innerText;
      });
  };

  const handleAddURL = () => {
    console.log("handleAddURL URL: ", newURL);
    console.log("myURLs1: ", myURLs);
    setMyURLs([
      ...myURLs, { 
        id: nextID++, 
        url: newURL,
        favicon: `${faviconAPIURL}${newURL}&sz=${imgSize}`
      }
    ]); // Add new URL with placeholder favicon
    console.log("myURLs2: ", myURLs);
    setShowAddURLDialog(false);
    setNewURL(''); // Clear new URL input after adding
    
  };

  const handleURLChange = (event) => {
    setNewURL(event.target.value);
  };

  return (
    <div className="container">
      <input type="text" className="search-bar" placeholder="Search..." />
      <div className="grid-container">
        {myURLs.map((urlData, index) => (
          <button key={index} className="link-button" onClick={() => window.open(`https://${urlData.url}`, '_blank')}>
            {index !== myURLs.length  && urlData.favicon ? (
              <img src={urlData.favicon} alt={urlData.url} />
            ) : (
              <img src="./logo.svg" alt="Sample Favicon" /> // Replace with sample image path
            )}
            {index !== myURLs.length && (
              <a href={`https://${urlData.url}`} target="_blank" rel="noreferrer" className="link-button">
                {urlData.url}
              </a>
            )}
          </button>
        ))}
        <button key={myURLs.length} className="add-button" onClick={() => setShowAddURLDialog(true)}>
          Add
        </button>
      </div>
      {showAddURLDialog && (
        <div className="add-url-dialog">
          <div>
            <input type="text" placeholder="Enter URL" value={newURL} onChange={handleURLChange} />
          </div>
          <div>
            <button onClick={() => setShowAddURLDialog(false)}>Cancel</button>
            <button onClick={handleAddURL}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

