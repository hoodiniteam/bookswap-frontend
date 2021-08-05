import React, {useEffect, useState} from "react";
import Script from 'next/script'
export const Upload = ({getInfo}: any) => {
  const [upload, setUpload] = useState()
  const generateSignature = (callback:any, params_to_sign:any) => {
    fetch('https://bookswap-api-srnev.ondigitalocean.app/cloudinarySign', {
      method: "POST",
      body: JSON.stringify(params_to_sign),
      headers: {
          'Content-Type': 'application/json'
      },
    }).then((res)=>{
        return res.json();
    }).then(data => {
        callback(data);
    })
  }

  useEffect(() => {
      if(typeof window !== 'undefined'){
        (window as any).cloudinary.applyUploadWidget(
          document.getElementById('widget_bin'),
          {
            api_key : "928345763556839",
            uploadPreset: 'bookswap',
            cloudName: "dufogbndd",
            folder: 'bookswap',
            uploadSignature: generateSignature
          },
          (error:any, result:any) => {
            if(result.event === 'success'){
              setUpload(result.info)
            }
          }
        );
      }
  }, []);
    return(
        <div onClick={getInfo(upload)}>
          <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="beforeInteractive"/>
          <div
            id="widget_bin">
          </div>
        </div>
    )
}

export default Upload