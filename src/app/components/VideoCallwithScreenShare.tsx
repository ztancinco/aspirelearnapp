import React, { useState, useRef, useEffect } from "react";

interface VideoCallWithScreenShareProps {
  courseVideoUrl: string;
}

const VideoCallWithScreenShare: React.FC<VideoCallWithScreenShareProps> = ({
  courseVideoUrl,
}) => {
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [isVideoCalling, setIsVideoCalling] = useState<boolean>(false);
  const [callStarted, setCallStarted] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);

  const callerVideoRef = useRef<HTMLVideoElement | null>(null);
  const receiverVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (screenStream) {
        screenStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream, screenStream]);

  const startCall = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(userStream);
      if (callerVideoRef.current) {
        callerVideoRef.current.srcObject = userStream;
      }
      setIsVideoCalling(true);
      setCallStarted(true);
    } catch (error) {
      console.error("Error starting video call:", error);
    }
  };

  const stopCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
    }
    setIsVideoCalling(false);
    setCallStarted(false);
    setStream(null);
    setScreenStream(null);
  };

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      if (screenStream) {
        screenStream.getTracks().forEach((track) => track.stop());
        setScreenStream(null);
      }
      setIsScreenSharing(false);
    } else {
      try {
        const newScreenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        setScreenStream(newScreenStream);
        if (receiverVideoRef.current) {
          receiverVideoRef.current.srcObject = newScreenStream;
        }
        newScreenStream.getVideoTracks()[0].onended = () =>
          setIsScreenSharing(false);
        setIsScreenSharing(true);
      } catch (error) {
        console.error("Error starting screen share:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl space-y-6">
        {/* Course Video before call starts */}
        {!isVideoCalling && !callStarted && courseVideoUrl && (
          <div className="w-full bg-gray-800 rounded-lg overflow-hidden">
            <video className="w-full h-auto" src={courseVideoUrl} controls />
          </div>
        )}

        {/* Call Controls */}
        <div className="flex justify-center space-x-4">
          {!isVideoCalling && !callStarted && (
            <button
              onClick={startCall}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Start Call
            </button>
          )}
          {isVideoCalling && (
            <>
              <button
                onClick={stopCall}
                className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition"
              >
                End Call
              </button>

              <button
                onClick={toggleScreenShare}
                className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
              >
                {isScreenSharing ? "Stop Screen Share" : "Start Screen Share"}
              </button>
            </>
          )}
        </div>

        {/* Video Call Layout */}
        {isVideoCalling && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* Caller Video */}
            <div className="relative">
              <p className="text-center text-lg font-semibold text-gray-800 mb-2">
                You
              </p>
              <video
                ref={callerVideoRef}
                autoPlay
                muted
                className="w-full h-auto rounded-lg border-4 border-blue-500 shadow-lg"
              />
            </div>

            {/* Screen Share or Receiver Video */}
            <div className="relative">
              <p className="text-center text-lg font-semibold text-gray-800 mb-2">
                {isScreenSharing ? "Screen Sharing" : "Receiver"}
              </p>
              <video
                ref={receiverVideoRef}
                autoPlay
                className="w-full h-auto rounded-lg border-4 border-green-500 shadow-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCallWithScreenShare;
