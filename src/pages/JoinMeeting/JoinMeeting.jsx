import React from "react";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";

const JoinMeeting = ({ signature }) => {
  const client = ZoomMtgEmbedded.createClient();
  let meetingSDKElement = document.getElementById("meetingSDKElement");

  client.init({ zoomAppRoot: meetingSDKElement, language: "en-US" });

  client.join({
    sdkKey: "iwVvncOBWw5iLsX85TbqRIr45U0zwkiDxJUy",
    signature: signature,
    meetingNumber: "388 903 1766",
    password: "testing",
    userName: "samran",
  });

  return <div id="meetingSDKElement"></div>;
};

export default JoinMeeting;
