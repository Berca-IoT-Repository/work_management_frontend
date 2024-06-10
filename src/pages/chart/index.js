import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import xrange from "highcharts/modules/xrange";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import "./style.css";
xrange(Highcharts);

const ChartPage = () => {
  var url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_TOKEN;
  const [devices, setDevices] = useState([]);
  const [eventDatas, seteventDatas] = useState([]);
  const [pointDatas, setPointDatas] = useState([]);
  const [startDate, setStartDate] = useState(formatDate(new Date()));

  const start = Date.now();
  // var data_array = [];
  const oneHour = 3600000;

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
          // console.log(res.data);
          setDevices(res.data.data);
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

  var x = 0;

  // const getDataPoint = async () => {
  //   try {
  //     var i = 0;
  //     setPointDatas([]);
  //     eventDatas.map((data) => {
  //       data.records.map((e) => {
  //         const point = {
  //           x: epocUTC(e.from),
  //           x2: epocUTC(e.until),
  //           y: i,
  //           color: e.status == "START" ? blue : red,
  //         };
  //         setPointDatas((data) => [...data, point]);
  //       });
  //       i++;
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    getDevice();
    getEventData();
    // getDataPoint();
    console.log(startDate);
  }, [startDate]);

  const red = "#fa7d6f",
    green = "#93d594",
    blue = "#72baeb",
    data = [
      {
        value: blue,
        timeStamp: oneHour * 3,
      },
      {
        value: red,
        timeStamp: oneHour * 4,
      },
      {
        value: blue,
        timeStamp: oneHour,
      },
      {
        value: red,
        timeStamp: oneHour,
      },
      {
        value: green,
        timeStamp: oneHour * 2,
      },
      {
        value: red,
        timeStamp: oneHour,
      },
      {
        value: red,
        timeStamp: oneHour * 4,
      },
      {
        value: red,
        timeStamp: oneHour * 0.5,
      },
      {
        value: blue,
        timeStamp: oneHour * 2,
      },
    ];

  let lastDate = Date.UTC(2022, 10, 21);

  const processedDataX = data.map((el) => {
    const x = lastDate,
      x2 = lastDate + el.timeStamp,
      point = {
        x: x,
        x2: x2,
        y: 0,
        color: el.value,
      };
    lastDate = point.x2;

    return point;
  });

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

    console.log(point);
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
      minRange: 6,
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
      // {
      //   name: "Data",
      //   pointWidth: 20,
      //   data: point,
      //   dataLabels: {
      //     enabled: true,
      //   },
      // },
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
  );
};

export default ChartPage;
