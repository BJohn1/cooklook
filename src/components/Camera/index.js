import React, { useState } from 'react';
import 'react-html5-camera-photo/build/css/index.css';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import firebase from 'firebase'
import Firebase from '../Firebase/firebase'
import MunchieShow from '../MunchieShow'
import ImagePreview from '../ImagePreview'; // source code : ./src/demo/AppWithImagePreview/ImagePreview
 
function App (props) {
  const [dataUri, setDataUri] = useState('');
  const [pics, setPics] = useState([]);
  const[url,setUrl]=useState([]);
  const id = props.match.params.id;
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  if (user != null) {
    uid = user.uid;
    console.log(uid)//USER ID
  }
  function handleTakePhoto (dataUri) {
    var storage=firebase.storage()
    var ref=storage.ref()
    var imagesRef=ref.child("image")
    // firebase.database.collection('images').set({userid: userid, picture: 'url here', location: 'business id here'})
    //how to get the src for the image I just took VVVVVV
    ref.child("image").getDownloadURL().then(function(picUrl) {
      setUrl([...url,picUrl ])
      user && console.log(user.uid)//CURRENT USER OBJECT
      console.log("image urL: "+ picUrl);//IMAGE URL
      console.log("restaurant id: " + id)//RESTAURANT ID
      Firebase.database.collection('images').add({
        userId: user.uid,
        imageUrl: picUrl,
        businessId: id,
      })
      document.querySelector('img').src = url;
    }).catch(function(error) {
      console.log(error)
    });
    var message = dataUri;
    imagesRef.putString(message, 'data_url', {contentType:"image/jpg"}).then(function(snapshot) {
      //console.log('Uploaded a base64 string!');
    });
      setPics([...pics, dataUri])
      console.log("this is your "+url)
  }
 
  function handleTakePhotoAnimationDone (dataUri) {
    console.log('takePhoto');
    setDataUri(dataUri);
  }

  function handleCameraError (error) {
    console.log('handleCameraError', error);
  }
 
  function handleCameraStart (stream) {
    console.log('handleCameraStart');
  }
 
  function handleCameraStop () {
    console.log('handleCameraStop');
  }
 
  const isFullscreen = false;
  return (
    <div>
      {
        <>
          <Camera
          onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
          onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
          onCameraError = { (error) => { handleCameraError(error); } }
          idealFacingMode = {FACING_MODES.ENVIRONMENT}
          idealResolution = {{width: 640, height: 480}}
          imageType = {IMAGE_TYPES.JPG}
          imageCompression = {0.97}
          isMaxResolution = {true}
          isImageMirror = {false}
          isSilentMode = {false}
          isDisplayStartCameraError = {true}
          isFullscreen = {false}
          sizeFactor = {1}
          onCameraStart = { (stream) => { handleCameraStart(stream); } }
          onCameraStop = { () => { handleCameraStop(); } }
        />
        {/* <ul>
            {pics.map((p,i)=>(
                <li key={i}><img src={p} width='50' height='50'/></li>
            ))}
         </ul>  */} 
         <ul>
            {url.map((u,i)=>(
                <li key={i}><img src={u} width='50' height='50' alt={u}/></li>
            ))}
         </ul>  
         {/* <img src={url} width='100' height='100'/> */}
        </>
      }
    </div>
  );
}
 
export default App;

