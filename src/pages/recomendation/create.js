import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Input from "../../helper/input";
import OptionManpower from "../../helper/optionManpower";

const CreateRecomendation = () => {
  var url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_TOKEN;
  const [workid, setWorkid] = useState("");
  const [workorders, setWorkorders] = useState([]);
  const [formValues, setFormValues] = useState([]);
  const [formManpower, setFormManpower] = useState([]);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  // const [selectedManpower, setSelectedManpower] = useState("");

  const handleChange = (e, index) => {
    const values = [...formValues];
    values[index].value = e.target.value;
    setFormValues(values);
  };

  const handleSelect = (dataManpower, dataDevice, index) => {
    console.log(index);
    const values = [...formManpower];
    console.log(index);
    console.log(values);
    values[index].man_power_id = dataManpower;
    values[index].device_recomendation = dataDevice;
  };

  function allEqual(arr) {
    if (!arr.length) return true;
    let i = 0;
    while (i < arr.length) {
      var a = i;
      var b = i + 1;

      while (b <= arr.length) {
        if (arr[a] === arr[b]) {
          return false;
        }
        b++;
      }

      if (i > arr.length) {
        return true;
      }
      i++;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("SUBMIT");
    console.log(formManpower);
    var dataMan = [];

    formManpower.map((val, index) => {
      if (val.man_power_id == "") {
        setErrors("DATA MANPOWER TIDAK BOLEH KOSONG");
      }

      if (val.device_recomendation.length == 0) {
        setErrors("DATA DEVICE TIDAK BOLEH KOSONG");
      } else {
        {
          var dataDev = [];

          val.device_recomendation.map((device, subIndex) => {
            dataDev.push(device.device_id);
          });

          console.log("DATA DEVICEEEE");
          console.log(dataDev);
          console.log(allEqual(dataDev));
          if (allEqual(dataDev) == false) {
            setErrors("DATA DEVICE TIDAK BOLEH SAMA");
          }
        }
      }

      dataMan.push(val.man_power_id);
    });

    if (allEqual(dataMan) == false) {
      setErrors("DATA MANPOWER TIDAK BOLEH SAMA");
    }

    const dataJSON = JSON.stringify({
      recomendation: formManpower,
    });

    console.log("DATAAAA");
    console.log(dataJSON);
    console.log(workid);

    if (errors == "") {
      try {
        await axios.post(
          // "https://jsonplaceholder.typicode.com/posts",
          url + "/api/v1/work/upsert-recomendation?wo_id=" + workid,
          dataJSON,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // window.location.reload(true);
        // window.location.href("https://www.google.com/");
        navigate("/recomendation");
      } catch (error) {
        if (error) {
          console.log(error.response);
        }
      }
    }
  };

  const addSelectManpower = (e) => {
    e.preventDefault();
    console.log("SELECT");
    const values = [...formManpower];
    values.push({
      man_power_id: "",
      device_recomendation: [],
    });
    console.log(formManpower);
    setFormManpower(values);
  };

  const addClose = (e) => {
    e.preventDefault();
    setErrors("");
  };

  const handleWork = (e) => {
    e.preventDefault();
    setWorkid(e.target.value);
    console.log(workid);
    console.log(e.target.value);
  };

  const getWorkorder = async () => {
    try {
      const data = await axios
        .get(url + "/api/v1/work/wo-info?filter=not-delegated", {
          // .get(url + "/api/v1/work/wo-info", {
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

  useEffect(() => {
    getWorkorder();
    console.log(workorders);
  }, []);

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Form Create Recomendation</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              {errors != "" ? (
                <div className="alert alert-danger alert-dismissible">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-hidden="true"
                    onClick={addClose}
                  >
                    &times;
                  </button>
                  <h5>
                    <i className="icon fas fa-ban"></i> Alert!
                  </h5>
                  {errors}
                </div>
              ) : (
                <div></div>
              )}
              <div className="form-group">
                <label htmlFor="selectWO">WORK ORDER</label>
                <select
                  className="custom-select rounded-0"
                  id="selectWO"
                  onChange={(e) => handleWork(e)}
                >
                  <option>-- PILIH WORK ORDER --</option>
                  {workorders.map((order, index) => (
                    <option key={index} value={order.id}>
                      {order.number} - {order.part_name}
                    </option>
                  ))}
                </select>
              </div>
              {formManpower.map((obj, index) => (
                <div className="form-group" key={index}>
                  <OptionManpower
                    key={index}
                    objValue={obj}
                    onChange={handleSelect}
                    index={index}
                  />
                </div>
              ))}
              <div className="form-group">
                <button
                  className="btn btn-secondary btn-block add-btn"
                  onClick={addSelectManpower}
                >
                  Add Manpower
                </button>
              </div>
            </div>
            <div className="card-footer d-flex">
              <button type="submit" className="btn btn-primary ml-auto">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRecomendation;
