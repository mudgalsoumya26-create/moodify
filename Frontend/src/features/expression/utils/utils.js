 import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";



  export const initializeFaceLandmarker = async ({faceLandmarkerRef,videoRef,streamRef}) => {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
      );

      const faceLandmarker =
        await FaceLandmarker.createFromOptions(
          vision,
          {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            },

            runningMode: "VIDEO",

            numFaces: 1,

            outputFaceBlendshapes: true,

            minFaceDetectionConfidence: 0.5,
            minFacePresenceConfidence: 0.5,
            minTrackingConfidence: 0.5,
          }
        );

      faceLandmarkerRef.current = faceLandmarker;

      console.log("MediaPipe loaded successfully");

      startCamera({videoRef,streamRef});

    } catch (error) {
      console.error(
        "MediaPipe initialization error:",
        error
      );
    }
  };

   export const startCamera = async ({videoRef,streamRef}) => {
    try {
       streamRef.current =
        await navigator.mediaDevices.getUserMedia({
          video: {
            width: 640,
            height: 480,
            facingMode: "user",
          },
          audio: false,
        });

      videoRef.current.srcObject = streamRef.current;

      videoRef.current.onloadeddata = () => {
        console.log("Camera started");

        
      };

    } catch (error) {
      console.error("Camera error:", error);
    }
  };
 
export const getScore = (blendshapes, name) => {
    
    const shape = blendshapes.find(
      (item) => item.categoryName === name
    );

    return shape ? shape.score : 0;
  };

  export  const detectExpression = (blendshapes) => {
        
          
        
      // -------------------------------
      // Smile
      // -------------------------------
  
      const smileLeft = getScore(
        blendshapes,
        "mouthSmileLeft"
      );
  
      const smileRight = getScore(
        blendshapes,
        "mouthSmileRight"
      );
  
      const smile =
        (smileLeft + smileRight) / 2;
  
  
      // -------------------------------
      // Frown
      // -------------------------------
  
      const frownLeft = getScore(
        blendshapes,
        "mouthFrownLeft"
      );
  
      const frownRight = getScore(
        blendshapes,
        "mouthFrownRight"
      );
  
      const frown =
        (frownLeft + frownRight) / 2;
  
  
      // -------------------------------
      // Jaw / mouth open
      // -------------------------------
  
      const jawOpen = getScore(
        blendshapes,
        "jawOpen"
      );
    
  
      // -------------------------------
      // Eyebrows
      // -------------------------------
  
      const browInnerUp = getScore(
        blendshapes,
        "browInnerUp"
      );
  
      const browDownLeft = getScore(
        blendshapes,
        "browDownLeft"
      );
  
      const browDownRight = getScore(
        blendshapes,
        "browDownRight"
      );
  
      const browDown =
        (browDownLeft + browDownRight) / 2;
  
  
      // -------------------------------
      // Eyes wide
      // -------------------------------
  
      const eyeWideLeft = getScore(
        blendshapes,
        "eyeWideLeft"
      );
  
      const eyeWideRight = getScore(
        blendshapes,
        "eyeWideRight"
      );
  
      const eyesWide =
        (eyeWideLeft + eyeWideRight) / 2;
  
      const eyeLookUp=getScore(blendshapes,"eyeLookUp")
      const sadScore=(browDown+eyeLookUp)/2
  
  
      // =================================
      // EXPRESSION CLASSIFICATION
      // =================================
      let expression="Neutral"
      let confidence=0;
  
      // HAPPY
      if (smile > 0.40) {
  
        return {
          expression: "happy",
          confidence: Math.round(
            Math.min(smile * 100, 99)
          ),
        };
  
      }
  
  
      // SURPRISED
      if (
        jawOpen > 0.05 &&
        browInnerUp > 0.05 
       
      ) {
  
        const score =
          (jawOpen +
            browInnerUp 
          ) /
          2;
  
        return {
          expression: "surprised",
          confidence: Math.round(
            Math.min(score * 100, 99)
          ),
        };
  
      }
  
  
      // SAD
      if (sadScore > 0.10) {
  
        return {
          expression: "sad",
          confidence: Math.round(
            Math.min(frown * 100, 99)
          ),
        };
  
      }
  
  
      // ANGRY
      if (browDown > 0.35) {
  
        return {
          expression: "angry",
          confidence: Math.round(
            Math.min(browDown * 100, 99)
          ),
        };
  
      }
  
  
      // NEUTRAL
  
      return {
        expression: "😐 Neutral",
        confidence: 70,
      };
    
    };

    export  const detectFace = ({faceLandmarkerRef,isDetectingRef,videoRef,setConfidence,setFaceDetected,setExpression,animationRef}) => {
        if(!isDetectingRef.current)return;
        if (
          !videoRef.current ||
          !faceLandmarkerRef.current
        ) {
          return;
        }
        
    
        const video = videoRef.current;
    
        if (video.readyState >= 2) {
    
          const timestamp =
            performance.now();
    
          const result =
            faceLandmarkerRef.current.detectForVideo(
              video,
              timestamp
            );
    
    
          // -----------------------------------
          // No face
          // -----------------------------------
    
          if (
            !result.faceBlendshapes ||
            result.faceBlendshapes.length === 0
          ) {
    
            setFaceDetected(false);
            setExpression("No face detected");
            setConfidence(0);
    
          }
    
          // -----------------------------------
          // Face found
          // -----------------------------------
    
          else {
    
            setFaceDetected(true);
    
            const blendshapes =
              result.faceBlendshapes[0]?.categories;
    
            const resultExpression =
              detectExpression(blendshapes);
    
            setExpression(
              resultExpression.expression
            );
    
            setConfidence(
              resultExpression.confidence
            );
            
          }
        }
    
    
        animationRef.current =
          requestAnimationFrame(
            detectFace
          );
      };