import React, { useEffect, useState } from "react";
import "./App.css";

import ZoomMtgEmbedded from "@zoomus/websdk/embedded";

import axios from "axios";

export default function AppRouter() {
  const client = ZoomMtgEmbedded.createClient();
  const [signature, setSignature] = useState();
  var sdkKey = "iwVvncOBWw5iLsX85TbqRIr45U0zwkiDxJUy";
  var meetingNumber = "83181982857";
  var role = 0;
  var userName = "samran";
  var userEmail = "samransam12@gmail.com";
  var passWord = "PT4Ebk";
  var registrantToken = "";
  const getSignature = async (e) => {
    e.preventDefault();

    try {
      console.log(" meeting id in get signature", meetingNumber);
      console.log(" role ", role);
      const res = await axios.post(
        "https://frozen-tundra-17691.herokuapp.com/",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          data: {
            meetingNumber: meetingNumber,
            role: role,
          },
        }
      );
      setSignature(res.data.signature);
      startMeeting(res.data.signature);
      console.log("signature", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const startMeeting = (signature) => {
    let meetingSDKElement = document.getElementById("meetingSDKElement");

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: "en-US",
      customize: {
        meetingInfo: [
          "topic",
          "host",
          "mn",
          "pwd",
          "telPwd",
          "invite",
          "participant",
          "dc",
          "enctype",
        ],
        toolbar: {
          buttons: [
            {
              text: "Custom Button",
              className: "CustomButton",
              onClick: () => {
                console.log("custom button");
              },
            },
          ],
        },
      },
    });

    console.log("full object of zoom join", {
      sdkKey: sdkKey,
      signature: signature,
      meetingNumber: meetingNumber,
      password: passWord,
      userName: userName,
      userEmail: userEmail,
      tk: registrantToken,
    });

    client.join({
      sdkKey: sdkKey,
      signature: signature,
      meetingNumber: meetingNumber,
      password: passWord,
      userName: userName,
      userEmail: userEmail,
      tk: registrantToken,
    });
  };

  return (
    <>
      <main>
        <h1>Zoom Meeting SDK Demo by VRTECHSOL</h1>

        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </>
  );
}
