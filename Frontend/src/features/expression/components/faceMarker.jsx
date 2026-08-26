
import { useEffect, useRef, useState } from "react";
import { initializeFaceLandmarker,detectExpression,detectFace,getScore } from "../utils/utils";

 function FaceExpression({onClick=()=>{}}){
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const [expression, setExpression] = useState("Loading...");
  const [confidence, setConfidence] = useState(0);
  const [faceDetected, setFaceDetected] = useState(false);
  const isDetectingRef = useRef(false)
  const [isDetecting, setisDetecting] = useState(false)
  const streamRef=useRef(null)
    const detectFaceOnce=()=>{
    if(!faceLandmarkerRef.current||!videoRef.current)return
    const results=faceLandmarkerRef.current.detectForVideo(
      videoRef.current,
      performance.now()
    )
    if(results.faceBlendshapes&& results.faceBlendshapes.length>0){
      const blendshapes=results.faceBlendshapes[0].categories
      setFaceDetected(true);
      const result=detectExpression(blendshapes)
      setExpression(result.expression)
      
      setConfidence(result.confidence)
      return(result)

      
    }
    return null;
  }
  async function handleClick(){
    const expression=detectFaceOnce()
    if(!expression){
      console.log("no face detected yet")
      return;
    }
    onClick(expression.expression)
    console.log(expression)
  }

  const startDetecting=()=>{
    isDetectingRef.current=true;
    setisDetecting(true);
    detectFace();
  }
  const stopDetecting=()=>{
    isDetectingRef.current=false;
    setisDetecting(false)
    cancelAnimationFrame(animationRef.current)
  }


  // -----------------------------------------
  // Start everything
  // -----------------------------------------

  useEffect(() => {

    initializeFaceLandmarker({faceLandmarkerRef,videoRef,streamRef});

    return () => {

      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }

      if (videoRef.current?.srcObject) {

        videoRef.current.srcObject
          .getTracks()
          .forEach((track) =>
            track.stop()
          );
      }
    };

  }, []);


  // -----------------------------------------
  // UI
  // -----------------------------------------
 
  return (
    <div className="app">

      <h1>
        Face Expression Detector
      </h1>

      


      <div className="camera-container">

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
        />

      </div>


      <div className="status">

        <div className="face-status">

          {faceDetected
            ? "🟢 Face detected"
            : "🔴 Face not detected"}

        </div>


        <div className="expression">

          {expression}

        </div>


        <div className="confidence">

          Confidence: {confidence}%

        </div>
        <button onClick={handleClick}>DETECT</button>

      </div>

    </div>
  );
}

export default FaceExpression




