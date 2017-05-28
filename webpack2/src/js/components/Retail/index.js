import React, { Component } from 'react';
// custom Component
// import { wtts } from "../../redux/actions/watsonAction";


// import { connect } from "react-redux";

// @connect((store) => {
//   return {
//     data: store.retailReducer.data,
//     err: store.retailReducer.err.error,
//     fetching: store.retailReducer.fetching,
//     confirmTransfer: store.retailReducer.confirmTransfer,
//     thankYou: store.retailReducer.thankYou,
    
//     ttsAudio: store.wtts.data,
//     ttsFetching: store.wtts.fetching,
//     ttsFetched: store.wtts.fetched
//   };
// })

class Retail extends Component {
  // constructor() {
  //   super();
  //   this._onSpeek = this._onSpeek.bind(this);

  //   this.state = {
      
  //   }
  // }

  // _onSpeek() {
  //   const ttsUrl = "https://text-to-speech-demo.mybluemix.net/api/synthesize?voice=en-US_AllisonVoice&text";
  //   this.props.dispatch(wtts(ttsUrl));
  // }

 

  render() {
    
    return (
      <div className="retail">
        <header className="retail-header">
          <h4>helllo Retail Page </h4>
        </header>
      </div>
    );
  }
}

export default Retail;
