import {useState} from "react";

/* Clock display options */
options = {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric'
};
/* Clock parameters */
const Clock = () => {
    dateTime.innerText=new
    Intl.DateTimeFormat('nl-NL', options).format(new Date())
    setInterval(Clock, 1000);
    return (
        <div>className="Clock"
            <h1>{Clock}</h1>
        </div>
    )
}

export default Clock;