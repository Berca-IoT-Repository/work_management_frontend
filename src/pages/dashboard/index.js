import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import xrange from "highcharts/modules/xrange";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import "./style.css";
xrange(Highcharts);

function getUser() {
  let user = sessionStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
}

const Index = () => {
  var url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_TOKEN;

  var nama = "";
  var x = 0;
  var data_array = [];
  const oneHour = 3600000;
  const start = Date.now();
  const navigate = useNavigate();

  const [device, setDevice] = useState(0);
  const [devices, setDevices] = useState([]);
  const [manpower, setManpower] = useState(0);
  const [recomendation, setRecomendation] = useState(0);
  const [workorder, setWorkorder] = useState(0);
  const [user, setUser] = useState(getUser());
  const [dataDevices, setdataDevices] = useState([]);
  const [deviceId, setDeviceid] = useState("");
  const [eventDatas, seteventDatas] = useState([]);
  const [pointDatas, setPointDatas] = useState([]);
  const [startDate, setStartDate] = useState(formatDate(new Date()));

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const getDevice = async () => {
    try {
      const data = await axios
        .get(url + "/api/v1/device/device-info", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data.total_data);
          setDevice(res.data.total_data);
          document.getElementById("highcharts_height").style.height =
            res.data.total_data * 55 + "px";
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getDevices = async () => {
    try {
      const data = await axios
        .get(url + "/api/v1/device/device-info", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log(res.data);
          setDevices(res.data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getManpower = async () => {
    try {
      const data = await axios
        .get(url + "/api/v1/manpower/manpower-info", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log(res.data);
          setManpower(res.data.total_data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getRecomendation = async () => {
    try {
      const data = await axios
        .get(url + "/api/v1/work/get-recomendation", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log(res.data);
          setRecomendation(res.data.total_data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getWorkorder = async () => {
    try {
      const data = await axios
        .get(url + "/api/v1/work/wo-info", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log(res.data);
          setWorkorder(res.data.total_data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getdataDevice = async () => {
    try {
      const data = await axios
        .get(url + "/api/v1/device/device-stat", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setdataDevices(res.data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getEventData = async () => {
    try {
      // console.log(
      //   url + "/api/v1/device/oneday-logs-usage?date=" + formatDate(startDate)
      // );
      const data = await axios
        .get(
          url +
            "/api/v1/device/oneday-logs-usage?date=" +
            formatDate(startDate),
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log(res.data);
          seteventDatas(res.data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDevice();
    getDevices();
    getManpower();
    getRecomendation();
    getWorkorder();
    getEventData();
    getHeight();

    if (user != null) {
      nama = user.user_id;
    }
  }, [startDate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getdataDevice();
    }, 2000);

    return () => clearInterval(intervalId);
  });

  const red = "#fa7d6f",
    blue = "#72baeb";

  const getHeight = async () => {
    try {
      var jumlah = devices.length;
      console.log(jumlah);
    } catch (e) {
      console.log(e);
    }
  };

  const processedDevice = devices.map((data) => {
    const nama = data.name;
    return data.name;
  });

  var point = [];
  const processedEvents = eventDatas.map((data) => {
    data.records.map((e) => {
      point.push({
        start: e.from,
        end: e.until,
        x: epocUTC(e.from),
        x2: epocUTC(e.until),
        y: x,
        color: e.status == "RUNNING" ? blue : red,
        status: e.status,
        wo: e.work_number,
      });
    });
    x++;

    // console.log(point);
    return point;
  });

  function epocUTC(tanggal) {
    var datum = Date.parse(tanggal);

    return datum;
  }

  const optionsHigh = {
    chart: {
      type: "xrange",
      zoomType: "x",
    },
    title: {
      text: "Device X-range",
    },
    time: {
      useUTC: false,
    },
    xAxis: {
      type: "datetime",
      minRange: 24,
    },
    yAxis: {
      title: {
        text: "",
      },
      categories: processedDevice,
      reversed: true,
    },
    series: [
      {
        name: "Data ",
        pointWidth: 25,
        data: point,
        dataLabels: {
          enabled: true,
        },
      },
    ],
    legend: { enabled: false },
    tooltip: {
      pointFormatter: function () {
        var WoN = this.wo;

        if (WoN == undefined) {
          WoN = "";
        } else {
          WoN = " and work order is <b>" + this.wo + "</b>";
        }

        return "The status is : <b>" + this.status + "</b> " + WoN;
      },
    },
  };

  function handleChange(event) {
    setStartDate(formatDate(event));
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-3">
            <div className="info-box">
              <span className="info-box-icon bg-info elevation-1">
                <i className="fa fa-tablet" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Device</span>
                <span className="info-box-number">{device}</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <div className="info-box mb-3">
              <span className="info-box-icon bg-danger elevation-1">
                <i className="fa fa-male" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Man Power</span>
                <span className="info-box-number">{manpower}</span>
              </div>
            </div>
          </div>
          <div className="clearfix hidden-md-up" />
          <div className="col-12 col-sm-6 col-md-3">
            <div className="info-box mb-3">
              <span className="info-box-icon bg-success elevation-1">
                <i className="fa fa-thumbs-up" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Recomendation</span>
                <span className="info-box-number">{recomendation}</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <div className="info-box mb-3">
              <span className="info-box-icon bg-warning elevation-1">
                <i className="fa fa-briefcase" />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Work Order</span>
                <span className="info-box-number">{workorder}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {dataDevices.map((device, index) => (
        <div className="col-md-4" key={index}>
          <div className="card">
            <div className="card-header">
              <h3
                className="card-title"
                style={{
                  fontSize: "18px",
                  marginTop: "5px",
                  fontWeight: "bold",
                }}
              >
                {device.device_name}
              </h3>
              <div className="card-tools">
                <Link
                  to={`/view-device/${device.device_id}`}
                  className="btn btn-primary"
                >
                  Detail
                </Link>
              </div>
            </div>
            <div className="card-body p-0">
              <table className="table table-border">
                <tbody>
                  <tr>
                    <th>Device SN</th>
                    <td>{device.device_sn}</td>
                  </tr>
                  <tr>
                    <th>Device Status</th>
                    <td>{device.device_status}</td>
                  </tr>
                  <tr>
                    <th>Manpower Name</th>
                    <td>{device.man_power_name}</td>
                  </tr>
                  <tr>
                    <th>Start Time</th>
                    <td>{device.start_time}</td>
                  </tr>
                  <tr>
                    <th>Today Usage</th>
                    <td>{device.today_usage}</td>
                  </tr>
                  <tr>
                    <th>WO Number</th>
                    <td>{device.wo_number}</td>
                  </tr>
                  <tr className="d-flex"></tr>
                </tbody>
              </table>
            </div>
            {/* /.card-body */}
          </div>
        </div>
      ))}

      <div className="col-md-12"></div>

      <div className="col-md-12">
        <div className="card" id="highcharts_height">
          <div className="card-header">
            <h3
              className="card-title"
              style={{
                fontSize: "18px",
                marginTop: "5px",
                fontWeight: "bold",
              }}
            >
              Chart Data
            </h3>
            <div className="card-tools"></div>
          </div>
          <div className="card-body">
            <div className="d-flex">
              <div>
                <form>
                  <div className="form-group row">
                    <label
                      className="col-sm-3 col-form-label"
                      style={{ fontSize: "18px" }}
                    >
                      Date
                    </label>
                    <div className="col-sm-9">
                      <DatePicker
                        showIcon
                        selected={startDate}
                        onChange={handleChange}
                        className="form-control"
                        dateFormat="dd-MM-yyyy"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="d-flex ml-auto">
                <div className="d-flex" style={{ marginRight: "10px" }}>
                  <span
                    className="dot-red"
                    style={{ marginRight: "4px", marginTop: "2px" }}
                  ></span>
                  <p>STOP</p>
                </div>
                <div className="d-flex">
                  <span
                    className="dot-blue"
                    style={{ marginRight: "4px", marginTop: "2px" }}
                  ></span>
                  <p>RUNNING</p>
                </div>
              </div>
            </div>
            <br />
            <HighchartsReact
              containerProps={{ style: { height: "100%" } }}
              highcharts={Highcharts}
              options={optionsHigh}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
