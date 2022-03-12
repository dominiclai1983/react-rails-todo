import React, { Children } from 'react'

const Layout = (props) => {
  return (
    <>
      <div className="container">
        <div className="row border border-dark rounded-sm py-2">
          <div className="col-12 col-md-6 text-center d-flex align-items-center justify-content-center">
            <h3>Welcome!!!</h3>
          </div>
          <div className="col-12 col-md-6 text-center text-md-left">
            {props.children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout;