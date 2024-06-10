import React, { useState, useEffect } from "react";
import axios from "axios";

function OptionDevice({ objValue, onChange, index, deleteField }) {
  var url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_TOKEN;
  const [device, setDevice] = useState([]);
  const { label, type, value } = objValue;

  const getDevice = async () => {
    try {
      const data = await axios
        .get(url + "/api/v1/device/device-info", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log(res.data);
          setDevice(res.data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDevice();
    console.log("DATA DEVICEEEE");
    console.log(objValue);
  }, []);

  return (
    <div className="form-group row">
      <label htmlFor="lblDevice" className="col-sm-2 col-form-label">
        Device
      </label>
      <div className="col-sm-10">
        <select
          className="custom-select rounded-0"
          id=""
          onChange={(e) => onChange(e, index)}
        >
          <option>-- PILIH DEVICE --</option>
          {device.map((dev, index) => (
            <option
              key={index}
              value={dev.id}
              selected={objValue.device_id == dev.id}
            >
              {dev.name}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="col-sm-1">
        <button
          className="btn btn-warning btn-block"
          onClick={(e) => deleteField(e, index)}
        >
          X
        </button>
      </div> */}
    </div>
  );
}

export default OptionDevice;
