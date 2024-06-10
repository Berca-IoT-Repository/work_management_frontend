import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./style.css";

const RecomendationPage = () => {
  var url = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_TOKEN;
  const [recomendations, setRecomendations] = useState([]);
  const [recomendationId, setRecomendationId] = useState("");
  const [devices, setDevices] = useState([]);

  const getRecomendation = async () => {
    try {
      const data = await axios
        .get(url + "/api/v1/work/get-recomendation", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setRecomendations(res.data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  // const getPDF = async (e, id) => {
  //   try {
  //     // console.log(id);
  //     const data = await axios
  //       .get(url + "/api/v1/work/download-jobsheet?mp_recom_id=" + id, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       .then((res) => {
  //         // setRecomendations(res.data.data);

  //         const wordBytes = res.data;

  //         var blob = new Blob([wordBytes], {
  //           type: "application/octet-stream",
  //         });
  //         var link = document.createElement("a");
  //         link.href = URL.createObjectURL(blob);
  //         // set the name of the file
  //         link.download = "result.docx";
  //         // clicking the anchor element will download the file
  //         link.click();
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // async function getPDF(id) {
  //   // console.log(id);
  //   const data = await axios
  //     .get(url + "/api/v1/work/download-jobsheet?mp_recom_id=" + id, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       console.log(data);
  //     });
  //   return async function () {};
  // }

  useEffect(() => {
    getRecomendation();
    console.log(recomendations);
  }, []);

  return (
    <div className="row">
      <div className="col-md-12 d-flex">
        <div className="ml-auto">
          <Link to="/create-recomendation" className="btn btn-primary">
            CREATE
          </Link>
        </div>
      </div>
      {recomendations.map((dataOne, index) => (
        <div className="col-md-3">
          <div
            className={`card ${index % 2 ? "card-success" : "card-secondary"}`}
          >
            <div className="card-header">
              <h3 className="card-title">{dataOne.wo_number}</h3>
            </div>
            <div className="card-body">
              <strong>WO PART NAME</strong>
              <p>{dataOne.wo_part_name}</p>
              <hr />
              <strong>Delegated For</strong>
              <br />
              <br />
              <ol>
                {dataOne.recomendation.map((dataTwo, index) => (
                  <div className="mb-10">
                    <li className="d-flex">
                      <div>
                        {dataTwo.man_power_name}
                        <div style={{ marginLeft: "-30px" }}>
                          <ul>
                            {dataTwo.device_recomendation.map(
                              (dataThree, index) => (
                                <div className="d-flex mb-10">
                                  <li>
                                    {dataThree.device_sn} |{" "}
                                    {dataThree.device_name}
                                    {dataThree.id}
                                  </li>
                                </div>
                              )
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="ml-auto">
                        <Link
                          to={`${url}/api/v1/work/download-jobsheet?mp_recom_id=${dataTwo.id}`}
                          className="btn btn-dark btn-sm"
                          style={{ marginRight: "5px" }}
                        >
                          GET QR CODE
                        </Link>
                      </div>
                    </li>
                    <br />
                  </div>
                ))}
              </ol>
            </div>
            <div className="card-footer d-flex">
              <div className="ml-auto">
                <Link
                  to={`/update-recomendation/${dataOne.wo_id}`}
                  className="btn btn-info btn-sm"
                >
                  UPDATE
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const DeviceList = ({ deviceList }) => <li>{deviceList.device_id}</li>;

export default RecomendationPage;
