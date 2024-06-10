import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

const CreateWorkorder = () => {
  var url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_TOKEN;
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startFinish, setStartFinish] = useState(new Date());

  function formatDate(date) {
    let datePart = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
      .map((n, i) => n.toString().padStart(i === 0 ? 4 : 2, "0"))
      .join("-");
    let timePart = [date.getHours(), date.getMinutes()]
      .map((n, i) => n.toString().padStart(2, "0"))
      .join(":");
    return datePart + "/" + timePart;
  }

  const createWorkorder = async (e) => {
    e.preventDefault();
    // console.log(formatDate(startDate));
    // console.log(formatDate(startFinish));
    // setStart(formatDate(startDate));
    // setFinish(formatDate(startFinish));

    // console.log(start);
    // console.log(finish);

    const dataJSON = JSON.stringify({
      part_name: name,
      notes: notes,
      schedule_start: formatDate(startDate),
      schedule_finish: formatDate(startFinish),
    });

    try {
      await axios.post(
        // "https://jsonplaceholder.typicode.com/posts",
        url + "/api/v1/work/create-wo",
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
            <h4 className="modal-title">Create Workorder</h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form onSubmit={createWorkorder}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="workorder">Nama Work Order</label>
                <input
                  type="text"
                  className="form-control"
                  id="workorder"
                  placeholder="Enter Work Order"
                  onChange={(e) => setName(e.target.value)}
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
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="start">Start</label>
                <br />
                <DatePicker
                  showIcon
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
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
                  selected={startFinish}
                  onChange={(date) => setStartFinish(date)}
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

export default CreateWorkorder;
