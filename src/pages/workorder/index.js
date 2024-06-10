import React, { useState, useEffect } from "react";
import axios from "axios";

import CreateWorkorder from "./create.js";
import UpdateWorkorder from "./update.js";

const WorkPage = () => {
  var url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_TOKEN;
  const [workorders, setWorkorders] = useState([]);
  const [workorderId, setWorkorderId] = useState("");

  const getWorkorder = async () => {
    try {
      const data = await axios
        .get(url + "/api/v1/work/wo-info", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setWorkorders(res.data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteWorkorder = async (id) => {
    await axios.post(
      url + "/api/v1/work/delete-wo?wo_id=" + id,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getWorkorder();
    console.log(id);
  };

  const updateWorkorder = async (id) => {
    setWorkorderId(id);
  };

  useEffect(() => {
    getWorkorder();
    console.log(workorders);
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
                Create Workorder
              </button>
              <CreateWorkorder />
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
                  <th>Number</th>
                  <th>Part Name</th>
                  <th>Notes</th>
                  {/* <th>Status</th> */}
                  <th>Shedule Start</th>
                  <th>Shedule Finish</th>
                  <th style={{ width: 300 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {workorders.map((workorder, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    {/* <td>{workorder.id}</td> */}
                    <td>{workorder.number}</td>
                    <td>{workorder.part_name}</td>
                    <td>{workorder.notes}</td>
                    {/* <td>{workorder.status}</td> */}
                    <td>{workorder.schedule_start}</td>
                    <td>{workorder.schedule_finish}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-info"
                        data-toggle="modal"
                        data-target="#modal-update"
                        onClick={() => updateWorkorder(workorder.id)}
                        style={{ marginRight: 20 }}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteWorkorder(workorder.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <UpdateWorkorder workorderId={workorderId} />
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

export default WorkPage;
