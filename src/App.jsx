import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import SplashScreen from './components/SplashScreen'

function allMediaLoaded() {
  const media = Array.from(document.querySelectorAll('img, video'));
  return media.every(el => (el.complete || el.readyState >= 3));
}

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    let timerDone = false;
    let mediaDone = false;
    const timer = setTimeout(() => {
      timerDone = true;
      if (mediaDone) setSplashVisible(false);
    }, 2000);

    function checkMedia() {
      if (allMediaLoaded()) {
        mediaDone = true;
        if (timerDone) setSplashVisible(false);
      } else {
        setTimeout(checkMedia, 100);
      }
    }
    checkMedia();

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!splashVisible) {
      setTimeout(() => setShowSplash(false), 700); // match fade duration
    }
  }, [splashVisible]);

  return (
    <>
      {showSplash && <SplashScreen visible={splashVisible} />}
      <div className="data-scroll-container" style={{visibility: showSplash ? 'hidden' : 'visible'}}>
        <NavBar/>
        <Home/>
      </div>
    </>
  )
}

export default App