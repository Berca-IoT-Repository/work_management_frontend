import React, { useState, useEffect } from "react";
import axios from "axios";

import CreateManpower from "./create.js";
import UpdateManpower from "./update.js";

const ManPage = () => {
  var url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_TOKEN;
  const [manpowers, setManpowers] = useState([]);
  const [manpowerId, setManpowerId] = useState("");

  const getManpower = async () => {
    try {
      const data = await axios
        .get(url + "/api/v1/manpower/manpower-info", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setManpowers(res.data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteManpower = async (id) => {
    await axios.post(
      url + "/api/v1/manpower/delete-manpower?manpower_id=" + id,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getManpower();
    console.log(id);
  };

  const updateManpower = async (id) => {
    setManpowerId(id);
  };

  useEffect(() => {
    getManpower();
    console.log(manpowers);
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
                Create Manpower
              </button>
              <CreateManpower />
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
                  <th style={{ width: 100 }}>NIK</th>
                  <th style={{ width: 300 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {manpowers.map((manpower, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    {/* <td>{manpower.id}</td> */}
                    <td>{manpower.name}</td>
                    <td>{manpower.nik}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-info"
                        data-toggle="modal"
                        data-target="#modal-update"
                        onClick={() => updateManpower(manpower.id)}
                        style={{ marginRight: 20 }}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteManpower(manpower.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <UpdateManpower manpowerId={manpowerId} />
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

export default ManPage;
