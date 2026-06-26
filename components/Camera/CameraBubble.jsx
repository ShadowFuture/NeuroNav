import React, { useEffect, useRef, useState } from "react";

const CameraBubble = React.forwardRef((props, forwardedRef) => {
  const internalRef = useRef(null);
  const videoRef = forwardedRef || internalRef;
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    let stream = null;

    const stopStream = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };

    const startStream = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Camera access error:", error);
        setIsOn(false);
      }
    };

    if (isOn) {
      startStream();
    } else {
      stopStream();
    }

    return () => {
      stopStream();
    };
  }, [isOn, videoRef]);

  return (
    <div className="camera-bubble">
      <div className={`camera-bubble__preview ${isOn ? "active" : "inactive"}`}>
        <video
          ref={videoRef}
          className="camera-bubble__video"
          autoPlay
          muted
          playsInline
        />
        <span className="camera-bubble__status">{isOn ? "Live" : "Off"}</span>
      </div>
      <button type="button" onClick={() => setIsOn((prev) => !prev)}>
        {isOn ? "Turn off" : "Turn on"}
      </button>
      {/* TODO: expose videoRef for stress detection and live analysis */}
    </div>
  );
});

export default CameraBubble;
