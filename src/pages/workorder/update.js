import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

const UpdateWorkorder = ({ workorderId }) => {
  var url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_TOKEN;
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [start, setStart] = useState("");
  const [finish, setFinish] = useState("");
  const [dateStart, setDatestart] = useState(new Date());
  const [dateFinish, setDatefinish] = useState(new Date());

  function formatDate(date) {
    let datePart = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
      .map((n, i) => n.toString().padStart(i === 0 ? 4 : 2, "0"))
      .join("-");
    let timePart = [date.getHours(), date.getMinutes()]
      .map((n, i) => n.toString().padStart(2, "0"))
      .join(":");
    return datePart + "/" + timePart;
  }

  useEffect(() => {
    const getWorkorderById = async () => {
      console.log("________________");
      console.log(workorderId);
      try {
        const response = await axios.get(
          url + `/api/v1/work/wo-info?wo_id=${workorderId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setName(response.data.data[0].part_name);
        setNotes(response.data.data[0].notes);
        setDatestart(response.data.data[0].schedule_start);
        setDatefinish(response.data.data[0].schedule_finish);
      } catch (error) {
        if (error) {
          console.log(error.response.data.detail);
        }
      }
    };
    getWorkorderById();
  }, [workorderId]);

  const updateWorkorder = async (e) => {
    e.preventDefault();

    console.log(dateStart);
    console.log(dateFinish);

    var dataStart = dateStart;
    var dataFinsih = dateFinish;

    if (typeof dataStart === "string") {
      console.log("YA");
    } else {
      console.log("NO");
      dataStart = formatDate(dateStart);
    }

    if (typeof dataFinsih === "string") {
      console.log("YA");
    } else {
      console.log("NO");
      dataFinsih = formatDate(dateFinish);
    }

    const dataJSON = JSON.stringify({
      part_name: name,
      notes: notes,
      schedule_start: dataStart,
      schedule_finish: dataFinsih,
    });

    try {
      await axios.post(
        // "https://jsonplaceholder.typicode.com/posts",
        url + `/api/v1/work/update-wo?wo_id=${workorderId}`,
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
            <h4 className="modal-title">Update Work Order</h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form onSubmit={updateWorkorder}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="workorder">Nama Work Order</label>
                <input
                  type="text"
                  className="form-control"
                  id="workorder"
                  placeholder="Enter Work Order"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <input
                  type="text"
                  className="form-control"
                  id="notes"
                  placeholder="Notes"
                  onChange={(e) => setNotes(e.target.value)}
                  value={notes}
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="start">Start</label>
                <input
                  type="text"
                  className="form-control"
                  id="start"
                  placeholder="Date Start"
                  onChange={(e) => setStart(e.target.value)}
                  value={start}
                />
              </div>
              <div className="form-group">
                <label htmlFor="finish">Finish</label>
                <input
                  type="text"
                  className="form-control"
                  id="finish"
                  placeholder="Date Finish"
                  onChange={(e) => setFinish(e.target.value)}
                  value={finish}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="start">Start</label>
                <br />
                <DatePicker
                  showIcon
                  selected={dateStart}
                  onChange={(date) => setDatestart(date)}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy HH:mm"
                  showTimeInput
                />
              </div>
              <div className="form-group">
                <label htmlFor="finish">Finish</label>
                <br />
                <DatePicker
                  showIcon
                  selected={dateFinish}
                  onChange={(date) => setDatefinish(date)}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy HH:mm"
                  showTimeInput
                />
              </div>
            </div>
            <div className="modal-footer justify-content-between">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
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

export default UpdateWorkorder;
