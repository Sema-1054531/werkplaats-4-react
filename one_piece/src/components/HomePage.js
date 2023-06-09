import React, {useState} from "react";
import Navbar from "./Navbar";

const Time = () => {
    let time = new Date().toLocaleTimeString();
    const [currentTime, setCurrentTime] = useState(time);

    const updateTime = () => {
        let time = new Date().toLocaleTimeString();
        setCurrentTime(time);
    }

    setInterval(updateTime, 1000);

    return (
        <div>
            <p>{currentTime}</p>
        </div>
    )
}


const HomePage = () => {
  return (
    <div className="container">
        <Navbar />
        <main>
            <h2 className="my-4">Welkom bij Enquêtemanager</h2>
            <p className="my-4">Klik op een item in de navigatiebalk.</p>
            <div className="time">
                <Time />
            </div>
        </main>
    </div>
  );
};

export default HomePage;
