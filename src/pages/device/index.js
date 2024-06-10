import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import CreateDevice from "./create.js";
import UpdateDevice from "./update.js";

const DevicePage = () => {
  var url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_TOKEN;
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceid] = useState("");

  const getDevice = async () => {
    try {
      const data = await axios
        .get(url + "/api/v1/device/device-info", {
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

  const deleteDevice = async (id) => {
    await axios.post(
      url + "/api/v1/device/delete-device?device_id=" + id,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getDevice();
    console.log(id);
  };

  const updateDevice = async (id) => {
    setDeviceid(id);
  };

  useEffect(() => {
    getDevice();
    console.log(devices);
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title"></h3>
            <div className="card-tools">
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#modal-create"
              >
                Create Device
              </button>
              <CreateDevice />
              {/* <Link className="btn btn-primary">Create Device</Link> */}
            </div>
          </div>
          {/* /.card-header */}
          <div className="card-body p-0">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ width: 20 }}>NO</th>
                  {/* <th style={{ width: 20 }}>ID</th> */}
                  <th>Nama</th>
                  <th style={{ width: 200 }}>Serial Num</th>
                  <th style={{ width: 300 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    {/* <td>{device.id}</td> */}
                    <td>{device.name}</td>
                    <td>{device.serial_num}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-info"
                        data-toggle="modal"
                        data-target="#modal-update"
                        onClick={() => updateDevice(device.id)}
                        style={{ marginRight: 20 }}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteDevice(device.id)}
                        className="btn btn-danger"
                        style={{ marginRight: 20 }}
                      >
                        Delete
                      </button>
                      <Link
                        to={`/view-device/${device.id}`}
                        className="btn btn-dark"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
                <UpdateDevice deviceId={deviceId} />
              </tbody>
            </table>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
    </div>
  );
};

export default DevicePage;
