import React, { Component } from 'react';
// import _ from 'lodash';
// import { connect } from "react-redux";

// import { sendEmail } from "../../redux/actions/sendEmailActions";

// custom Component
import Hero from './partial/Hero';


// @connect((store) => {
//   console.log(store);
//   return {
//     data: store,
//     err: store.sendEmail.err.error,
//     fetching: store.sendEmail.fetching
//   };
// })

class Email extends Component {

  // constructor() {
  //   super();
  //   this._sendEmail = this._sendEmail.bind(this);

  //   this.state = {
      
  //   }
  // }

  // _sendEmail() {
  //   this.props.dispatch(sendEmail({data, serviceUrl}));
  // }

  render() {
    // const { fetching } = this.props;

    return (
      <div>
        <Hero />
      </div>
    );
  }
}

export default Email;