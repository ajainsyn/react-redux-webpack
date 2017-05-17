import React, {Component} from 'react';


// import { connect } from "react-redux";
// import { getTemprature, getAllTemprature } from "../../../redux/actions/iotAction";

// @connect((store) => {
//   return {
//     data: store
//   };
// })

class DeviceRegistration extends Component {
  // constructor() {
  //   super();
  //   this.dispatchAction = this.dispatchAction.bind(this);
  // }

  // dispatchAction() {
  //   this.props.dispatch(getAllTemprature());
  // }

  render() {
    // const { data } = this.props;
    
    return (
      <div className="container">
        
        <section className="text-center">
          <h1 className="page-title">Event Processing from Devices</h1>
          <p>Recognize Live Temprature</p>
        </section>
      </div>
        
    );
  }
}

export default DeviceRegistration;