import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewDevice = () => {
  var url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_TOKEN;
  const [devices, setDevices] = useState([]);

  const getDevice = async () => {
    try {
      const data = await axios
        .get(url + "/api/v1/device/device-stat", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setDevices(res.data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDevice();
    console.log(devices);
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title"></h3>
            <div className="card-tools"></div>
          </div>
          {/* /.card-header */}
          <div className="card-body p-0">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ width: 20 }}>NO</th>
                  {/* <th style={{ width: 20 }}>ID</th> */}
                  <th style={{ width: 200 }}>Device Name</th>
                  <th style={{ width: 300 }}>Device SN</th>
                  <th style={{ width: 300 }}>Device Status</th>
                  <th style={{ width: 300 }}>Manpower Name</th>
                  <th style={{ width: 300 }}>Start Time</th>
                  <th style={{ width: 300 }}>Today Usage</th>
                  <th style={{ width: 300 }}>WO Number</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{device.device_name}</td>
                    <td>{device.device_sn}</td>
                    <td>{device.device_status}</td>
                    <td>{device.man_power_name}</td>
                    <td>{device.start_time}</td>
                    <td>{device.today_usage}</td>
                    <td>{device.wo_number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* /.card-body */}
        </div>
      </div>
    </div>
  );
};

export default ViewDevice;
