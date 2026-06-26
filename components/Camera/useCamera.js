import { useRef } from "react";

const useCamera = () => {
  const videoRef = useRef(null);

  // TODO: add getUserMedia setup, stream state, and cleanup
  return {
    videoRef,
    isCameraOn: false,
    toggleCamera: () => {},
  };
};

export default useCamera;
