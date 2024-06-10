import React, { useState, useEffect } from "react";
import axios from "axios";
import OptionDevice from "./optionDevice";

function OptionManpower({ objValue, onChange, index, deleteField }) {
  var url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_TOKEN;
  const { label, type, value } = objValue;
  const [formManpower, setFormManpower] = useState("");
  const [formDevice, setFormDevice] = useState([]);
  const [indexM, setIndexM] = useState();
  const [selectedDevice, setSelectedDevice] = useState("");
  const [manpower, setManpower] = useState([]);

  const deleteDevice = (e, index) => {
    e.preventDefault();
    const values = [...formDevice];
    values.splice(index, 1);
    setFormDevice(values);
  };

  const addSelectDevice = (e) => {
    e.preventDefault();
    const values = [...formDevice];
    values.push({
      device_id: "",
    });
    console.log(formDevice);
    setFormDevice(values);
    console.log("ADD");
  };

  const handleSelectDevice = (e, indexDevice) => {
    console.log(index);
    console.log(objValue.man_power_id);
    // setFormManpower(objValue.man_power_id);
    // console.log(formManpower);
    const values = [...formDevice];
    // // console.log(indexDevice);
    // // console.log(e.target.value);
    values[indexDevice].device_id = e.target.value;
    // // setSelectedDevice(values);
    setFormDevice(values);
    // // console.log(formDevice);
    // // console.log("SELECT");
    // // console.log(formManpower);
    onChange(objValue.man_power_id, formDevice, index);
  };

  const handleSelectManpower = (e, index) => {
    console.log(index);
    setFormManpower(e.target.value);
    // setIndexM(index);
    // console.log(e.target.value);
    onChange(e.target.value, formDevice, index);
  };

  const getManPower = async () => {
    try {
      const data = await axios
        .get(url + "/api/v1/manpower/manpower-info", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setManpower(res.data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getDevice = (e) => {
    setFormDevice(objValue.device_recomendation);
  };

  useEffect(() => {
    getManPower();
    getDevice();
    console.log("DATAAAA");
    console.log(objValue);
    // console.log(typeof objValue.man_power_name);
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <div className="form-group">
            <label htmlFor="manpower">ManPower</label>
            <select
              className="custom-select rounded-0"
              name="selectedManpower"
              onChange={(e) => handleSelectManpower(e, index)}
              // value={objValue.man_power_id}
              // defaultValue={objValue.man_power_id}
            >
              <option>-- PILIH MANPOWER --</option>
              {manpower.map((man, index) => (
                <option
                  value={man.id}
                  key={index}
                  selected={objValue.man_power_id == man.id}
                >
                  {man.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="adddevice" style={{ color: "#FFFFFF" }}>
              Add Device
            </label>
            <div className="row">
              <div className="col-md-8">
                <button
                  className="btn btn-primary btn-block"
                  onClick={addSelectDevice}
                >
                  Add Device
                </button>
              </div>
              <div className="col-md-4">
                <button
                  className="btn btn-dark btn-block"
                  onClick={(e) => deleteField(e, index)}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {formDevice.map((obj, index) => (
        <div className="form-group" key={index}>
          <OptionDevice
            key={index}
            objValue={obj}
            onChange={handleSelectDevice}
            index={index}
            deleteField={deleteDevice}
          />
        </div>
      ))}
    </>
  );
}

export default OptionManpower;
