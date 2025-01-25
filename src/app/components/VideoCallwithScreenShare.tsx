import React, { useState, useRef, useEffect } from 'react';

interface VideoCallWithScreenShareProps {
  courseVideoUrl: string;
}

const VideoCallWithScreenShare: React.FC<VideoCallWithScreenShareProps> = ({ courseVideoUrl }) => {
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [isVideoCalling, setIsVideoCalling] = useState<boolean>(false);
  const [callStarted, setCallStarted] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCall = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(userStream);
      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
      }
      setIsVideoCalling(true);
      setCallStarted(true);
    } catch (error) {
      console.error('Error starting video call:', error);
    }
  };

  const stopCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setIsVideoCalling(false);
    setCallStarted(false);
    setStream(null);
  };

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      if (stream) {
        const videoTrack = stream.getVideoTracks()[0];
        videoTrack.stop();
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
      setIsScreenSharing(false);
    } else {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (stream && videoRef.current) {
          const videoTrack = stream.getVideoTracks()[0];
          screenStream.getVideoTracks()[0].onended = () => setIsScreenSharing(false);
          stream.removeTrack(videoTrack);
          stream.addTrack(screenStream.getVideoTracks()[0]);
          videoRef.current.srcObject = stream;
        }
        setIsScreenSharing(true);
      } catch (error) {
        console.error('Error starting screen share:', error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl space-y-6">
        {/* Course Video */}
        {!isVideoCalling && !callStarted && courseVideoUrl && (
          <div className="w-full bg-gray-800 rounded-lg overflow-hidden">
            <video className="w-full h-auto" src={courseVideoUrl} controls />
          </div>
        )}

        <div className="flex justify-center space-x-4">
          {/* Call Controls */}
          {!isVideoCalling && !callStarted && (
            <button
              onClick={startCall}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Start Call
            </button>
          )}
          {isVideoCalling && (
            <button
              onClick={stopCall}
              className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition"
            >
              End Call
            </button>
          )}

          {isVideoCalling && (
            <button
              onClick={toggleScreenShare}
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
            >
              {isScreenSharing ? 'Stop Screen Share' : 'Start Screen Share'}
            </button>
          )}
        </div>

        {/* Video Call */}
        {isVideoCalling && (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">
              Video Call Active
            </p>
            {isScreenSharing && (
              <p className="text-sm text-gray-500 mt-2">
                Screen Sharing Active
              </p>
            )}
            <div className="mt-6 relative">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-auto rounded-lg border-4 border-blue-500 shadow-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCallWithScreenShare;
