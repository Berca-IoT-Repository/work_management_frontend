import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateManpower = ({ manpowerId }) => {
  var url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_TOKEN;
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");

  useEffect(() => {
    const getManpowerById = async () => {
      console.log("________________");
      console.log(manpowerId);
      try {
        const response = await axios.get(
          url + `/api/v1/manpower/manpower-info?manpower_id=${manpowerId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setName(response.data.data[0].name);
        setNik(response.data.data[0].nik);
      } catch (error) {
        if (error) {
          console.log(error.response.data.detail);
        }
      }
    };
    getManpowerById();
  }, [manpowerId]);

  const updateManpower = async (e) => {
    e.preventDefault();
    const dataJSON = JSON.stringify({
      name: name,
      nik: nik,
    });

    try {
      await axios.post(
        // "https://jsonplaceholder.typicode.com/posts",
        url + `/api/v1/manpower/update-manpower?manpower_id=${manpowerId}`,
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
    <div className="modal fade" id="modal-update">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Update Manpower</h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form onSubmit={updateManpower}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="manpower">Nama Manpower</label>
                <input
                  type="text"
                  className="form-control"
                  id="manpower"
                  placeholder="Enter Manpower"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="serialnum">NIK Manpower</label>
                <input
                  type="text"
                  className="form-control"
                  id="serialnum"
                  placeholder="Serial Num"
                  onChange={(e) => setNik(e.target.value)}
                  value={nik}
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
              <button type="submit" className="btn btn-info">
                Update changes
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

export default UpdateManpower;
