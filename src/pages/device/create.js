import React, { useState } from "react";
import axios from "axios";

const CreateDevice = () => {
  var url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_TOKEN;
  const [name, setName] = useState("");
  const [serial, setSerial] = useState("");

  const createDevice = async (e) => {
    e.preventDefault();
    const dataJSON = JSON.stringify({
      name: name,
      serial_num: serial,
    });

    try {
      await axios.post(
        // "https://jsonplaceholder.typicode.com/posts",
        url + "/api/v1/device/add-device",
        dataJSON,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload(true);
      // closeModal();
      // navigate("/admin/admin");
    } catch (error) {
      if (error) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className="modal fade" id="modal-create">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Create Devices</h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form onSubmit={createDevice}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="device">Nama Device</label>
                <input
                  type="text"
                  className="form-control"
                  id="device"
                  placeholder="Enter Device"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="serialnum">Serial Number Device</label>
                <input
                  type="text"
                  className="form-control"
                  id="serialnum"
                  placeholder="Serial Num"
                  onChange={(e) => setSerial(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer justify-content-between">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
  );
};

export default CreateDevice;
