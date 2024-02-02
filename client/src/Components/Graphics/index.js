import React from 'react'
import doc from './doc.svg'
import potDoc from './potDoc.svg'
const DocGraphics = () => {
  return (
    <img src={doc} style={{"width":"100%","padding":"0px","height":"90vh"}} />
  )
}
const PotraitDoctorGraphics = ()=>{
    <img src={potDoc} style={{"width":"100%","padding":"0px","height":"100vh"}} />
}

export {DocGraphics,PotraitDoctorGraphics}