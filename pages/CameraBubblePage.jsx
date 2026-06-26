import React, { useEffect, useRef, useState } from "react";

const CameraBubblePage = ({ compact = false }) => {
  const videoRef = useRef(null);
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
  }, [isOn]);

  const content = (
    <>
      <h1 style={{ marginBottom: "0.35rem" }}>Camera Bubble</h1>
      <p style={{ marginBottom: "1.1rem", color: "#5b6d89" }}>
        Turn the camera on for a simple preview bubble.
      </p>

      <div
        style={{
          width: "220px",
          height: "220px",
          margin: "0 auto 1rem",
          borderRadius: "50%",
          overflow: "hidden",
          border: "4px solid #6c7cff",
          background: "#eef4ff",
          display: "grid",
          placeItems: "center",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <button type="button" onClick={() => setIsOn((previous) => !previous)}>
        {isOn ? "Turn off" : "Turn on"}
      </button>
    </>
  );

  return compact ? (
    <section style={{ background: "#fff", borderRadius: "20px", padding: "1.25rem", border: "1px solid rgba(108, 124, 255, 0.16)", textAlign: "center" }}>
      {content}
    </section>
  ) : (
    <main style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: "2rem 1rem" }}>
      <section
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "1.5rem",
          boxShadow: "0 16px 40px rgba(34, 58, 120, 0.08)",
          border: "1px solid rgba(108, 124, 255, 0.16)",
          textAlign: "center",
        }}
      >
        {content}
      </section>
    </main>
  );
};

export default CameraBubblePage;
