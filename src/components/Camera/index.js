import React, { useState, useEffect} from 'react';
import 'react-html5-camera-photo/build/css/index.css';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import firebase from 'firebase'
import Firebase from '../Firebase/firebase'
import '../Camera/camera.css'



 
function App (props) {
  const [dataUri, setDataUri] = useState('');
  const [pics, setPics] = useState([]);
  const[url,setUrl]=useState([]);
  const[images,setImages]=useState([]);
  const id = props.match.params.id;
  var user = firebase.auth().currentUser;
  const imageRef = Firebase.database.collection('images')

  const fetchImg = async () => {
    try {
      const querySnapshot = await imageRef.where("businessId", "==", id )
      .onSnapshot(snap => {
        const imgArr = snap.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }))
        setImages(imgArr)
      })
      /* console.log(querySnapshot)
      querySnapshot.forEach(doc => {
        //console.log(doc.id, ' => ', doc.data())
        imgArr.push({...doc.data(), id: doc.id})
      }) 
      setImages([...imgArr])*/
      console.log(images)
    } catch (error) {
      console.log(error)
    }
  }
  
  function handleTakePhoto (dataUri) {
    var storage=firebase.storage()
    var ref=storage.ref()
    var imagesRef=ref.child("image")
    //how to get the src for the image I just took VVVVVV
    ref.child("image").getDownloadURL().then(function(picUrl) {
      setUrl([...url,picUrl ])
      user && console.log(user.uid)//CURRENT USER id
      console.log("image urL: "+ picUrl);//IMAGE URL
      console.log("restaurant id: " + id)//RESTAURANT ID
      Firebase.database.collection('images').add({
        userId: user.uid,
        imageUrl: picUrl,
        businessId: id,
      })
      //document.querySelector('img').src = url;
    }).catch(function(error) {
      console.log(error)
    });
    var message = dataUri;
    imagesRef.putString(message, 'data_url', {contentType:"image/jpg"}).then(function(snapshot) {
      //console.log('Uploaded a base64 string!');
    });
      setPics([...pics, dataUri])
      console.log("this is your urL: "+url)
      fetchImg()
      console.log(images)
  }
 
  function handleTakePhotoAnimationDone (dataUri) {
    //console.log('takePhoto');
    setDataUri(dataUri);
  }

  function handleCameraError (error) {
    console.log('handleCameraError', error);
  }
 
  function handleCameraStart (stream) {
    //console.log('handleCameraStart');
  }
 
  function handleCameraStop () {
    //console.log('handleCameraStop');
  }
 
 useEffect(()=>{
    console.log(images)
},[images])

useEffect(()=>{
  console.log('hit')
  fetchImg()
},[]) 

  const isFullscreen = false;
  return (
    <div>
      {
        <>
        <html>
    <head>
    <meta name="viewport" charset="utf-8" content="width=device-width, initial-scale=1.0"/>
        <title>JS Bin</title>
    </head>
    <body class='camera'>
        <header>Scrollable Kodak Moments</header>
        <div class='mouse'>
        <nav id="div_top_hypers"> 
            <ul id="ul_top_hypers">
            {images.map((u,i)=>(
                <li key={i}><img src={u.imageUrl} width='300' height='210' alt={i}/></li>
            ))}
            </ul>
        </nav>
        </div>
        <footer>Add Your Own Kodak Moment Below</footer>
    </body>
</html>
         {/* <ul>
            {images.map((u,i)=>(
                <li key={i}><img src={u.imageUrl} width='50' height='50' alt={i}/></li>
            ))}
         </ul>  */} 
         <Camera
          onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
          onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
          onCameraError = { (error) => { handleCameraError(error); } }
          idealFacingMode = {FACING_MODES.ENVIRONMENT}
          idealResolution = {{width: 640, height: 480}}
          imageType = {IMAGE_TYPES.JPG}
          imageCompression = {0.97}
          isMaxResolution = {true}
          isImageMirror = {true}
          isSilentMode = {false}
          isDisplayStartCameraError = {true}
          isFullscreen = {false}
          sizeFactor = {1}
          onCameraStart = { (stream) => { handleCameraStart(stream); } }
          onCameraStop = { () => { handleCameraStop(); } }
        />
        </>
      }
    </div>
  );
}
 
export default App;

