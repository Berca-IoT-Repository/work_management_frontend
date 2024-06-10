import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../helper/input";
import OptionManpower from "../../helper/optionManpower";

const UpdateRecomendation = () => {
  var url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_TOKEN;
  const orderId = useParams();
  const [workid, setWorkid] = useState("");
  const [workorders, setWorkorders] = useState([]);
  const [namaWorkorders, setNamaWorkorders] = useState("");
  const [numberWorkorders, setNumberWorkorders] = useState("");
  const [formValues, setFormValues] = useState([]);
  const [formManpower, setFormManpower] = useState([]);
  const [orderSelect, setOrderSelect] = useState([]);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  // const [selectedManpower, setSelectedManpower] = useState("");

  const handleChange = (e, index) => {
    const values = [...formValues];
    values[index].value = e.target.value;
    setFormValues(values);
  };

  const handleSelect = (dataManpower, dataDevice, index) => {
    console.log(dataManpower);
    console.log(dataDevice);
    const values = [...formManpower];
    // console.log(index);
    // console.log(values);
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
          url + "/api/v1/work/upsert-recomendation?wo_id=" + orderId.id,
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
          console.log(error.response.data);
          setErrors("DATA TIDAK BOLEH SAMA");
        }
      }
    }
  };

  const deleteManpower = (e, index) => {
    e.preventDefault();
    const values = [...formManpower];
    values.splice(index, 1);
    setFormManpower(values);
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

  const getWorkorder = async () => {
    try {
      const data = await axios
        // .get(url + "/api/v1/work/wo-info?filter=not-delegated", {
        .get(url + "/api/v1/work/wo-info?wo_id=" + orderId.id, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          //   console.log("WORK ORDER");
          //   console.log(res.data.data[0].number);
          //   console.log(res.data.data[0].part_name);
          setNamaWorkorders(res.data.data[0].part_name);
          setNumberWorkorders(res.data.data[0].number);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getOrder = async () => {
    try {
      const data = await axios
        // .get(url + "/api/v1/work/wo-info?filter=not-delegated", {
        .get(url + "/api/v1/work/get-recomendation?wo_id=" + orderId.id, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log("GET ORDER");
          // console.log(res.data.data[0].recomendation);
          setFormManpower(res.data.data[0].recomendation);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWorkorder();
    getOrder();
    console.log(workorders);
  }, []);

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card card-secondary">
          <div className="card-header">
            <h3 className="card-title">Form Update Recomendation</h3>
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
                  disabled
                >
                  <option>
                    {numberWorkorders} | {namaWorkorders}
                  </option>
                </select>
              </div>
              {formManpower.map((obj, index) => (
                <div className="form-group" key={index}>
                  <OptionManpower
                    key={index}
                    objValue={obj}
                    onChange={handleSelect}
                    index={index}
                    deleteField={deleteManpower}
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
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecomendation;
