
import React from 'react'

const Loader = () => {
  return (

    <div
        className="spinner-border"
        style={{
          width: "100px",
          height: "100px",
          margin: "auto",
          display: "block"
        }}
    >
        <output className="visually-hidden">Loading...</output>
    </div>

  )
};

export default Loader;