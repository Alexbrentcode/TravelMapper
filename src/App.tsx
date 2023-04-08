import { useEffect, useState } from 'react';
import './App.css'
import exifr, { parse } from 'exifr';

function App() {  
  const [uploadedImage, setUploadedImage] = useState<any>();
  const [imageURL, setImageUrl] = useState<any>();

  const processImage = async (image: any) => {
    const fileUrl = window.URL.createObjectURL(image.target.files![0]);
    setImageUrl(fileUrl);
    setUploadedImage(image);
    let {latitude, longitude} = await exifr.gps(fileUrl)

    console.log(`${latitude}, ${longitude}`)
  }

  return (
    <div className="App">
      <div style={{display: 'flex', width: '100vw', height: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{border: '1px solid black', width: 480, height: 480, flexDirection: 'inherit', display: 'flex', alignItems: 'inherit', justifyContent: 'inherit'}}>
          <h2>Upload your image</h2>
          <input type='file' name='imageTest' onChange={(e) => {processImage(e)}} />
          <img src={imageURL}style={{width: 240, height: 240, border: '1px solid black'}}/>
          <pre id="allMetaDataSpan"></pre>
        </div>

      </div>
    </div>
  )
}

export default App
