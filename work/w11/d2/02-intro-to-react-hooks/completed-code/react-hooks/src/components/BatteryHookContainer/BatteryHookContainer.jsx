import React, {useState, useEffect} from "react";
import Battery from "../Battery/Battery";
import {register, unregister} from '../../utils/battery';

function BatteryHookContainer() {
  const [batteryData, setBatteryData] = useState({
    level: .55,
    charging: true
  });

  function updateBattery(data) {
    setBatteryData(data);
  }

  useEffect(() => {
    register(updateBattery);
    return () => {
      unregister(updateBattery);
    };
  }, []);

  return (
    <Battery level={batteryData.level} charging={batteryData.charging}/>
  );
}

export default BatteryHookContainer;