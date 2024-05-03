import React, { useState, useEffect } from "react";

const DriverRoutes = ({ directions, setPosition }) => {
  const [nextStop, setNextStop] = useState("");
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState("0");
  const [timerDuration, setTimerDuration] = useState(1000);

  useEffect(() => {
    if (directions) {

      const steps = directions.routes[0].legs;
      setTimerDuration(()=>(parseInt(steps[0].duration.text.split(" ")[0])));

      const loopWithDelay = async () => {
        for (let i = 0; i < steps.length; i++) {
          const step = steps[i];
          setNextStop(`Next stop: ${step.end_address}`);
          setDistance(parseFloat(step.distance.text.split(" ")[0]));
          setDuration(step.duration.text.split(" ")[0]);
          setPosition({lat: step.start_location.lat(), lng: step.start_location.lng()});
          let currentTimerDuration = timerDuration;
          
          // Check if directions are not available
          if (step.duration.text === "Directions Not Available") {
            currentTimerDuration = 0; 
          } else {
            currentTimerDuration = parseInt(step.duration.text.split(" ")[0]) * timerDuration;
          }

          await new Promise(resolve => setTimeout(resolve, currentTimerDuration));
        }
        if (steps.length > 0) {
            const finalStep = steps[steps.length - 1];
            setNextStop("Final Destination: Kimirongo Bus Park");
            setDistance(0);
            setDuration(0);
            setPosition({ lat: finalStep.end_location.lat(), lng: finalStep.end_location.lng() });
          }
        
      };

      // Start the loop
      loopWithDelay();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }}, [ directions]);

  return (
    <div className="container info">
      <div className="firstInfo">
        <p>Nyabugogo - Kimironko </p>
      </div>
      <div>
        <p>{nextStop}</p>
      </div>
      <div className="lastInfo">
        <p>Distance: {distance.toFixed(1)} km</p>
        <p>Time: {duration} minutes</p>
      </div>
    </div>
  );
};

export default DriverRoutes;
