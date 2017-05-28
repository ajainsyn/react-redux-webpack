import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// custom Component

import Hero from './partial/Hero';
import AccountList from './partial/AccountList';

import { connect } from 'react-redux';

import Util from '../../shared/Util';

import { getAccountList, getTimelineList, showNewComponent, hideComponent } from '../../redux/actions/getAccountList';

@connect((store) => {
  console.log(store);
  return {
    timelineList: store.timelineList.timelineList,
    timeFetched: store.timelineList.fetched,
    

    accountList: store.accountList.accountList,
    err: store.accountList.err,
    fetching: store.accountList.fetching,

    showcomponent: store.componentReducer.showComponent,
    
  };
})


class Home extends Component {
  constructor() {
    super();
    this._hideComponent = this._hideComponent.bind(this);
    this._showComponent = this._showComponent.bind(this);
    this._onNameChange = this._onNameChange.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);

    this.state = {
      userName: '',
      error: false,
    };

  }
  
  componentDidMount() {
    this.props.dispatch(getAccountList());
    this.props.dispatch(getTimelineList());
  }

  _showComponent() {
    this.props.dispatch(showNewComponent());
  }

  _hideComponent() {
    this.props.dispatch(hideComponent());
  }

  _onNameChange(e) {
    console.log(e.target.value);
    this.setState({ userName: e.target.value });
  }

  _onFormSubmit() {
    const isValild = Util.isValidEmail(this.state.userName);
    if (isValild) { 
      this.setState({ error: false });
    } else {
      this.setState({ error: true });
    }
  }

  

  render() {
    const { accountList, timelineList, timeFetched, showcomponent } = this.props;

    let data = [];
    if (timeFetched) {
      _.map(accountList.accounts, account => {
        let obj = {
          'id': account.id,
          'timeline': [], 
        };
        _.map(timelineList.hits.hits, timeline => {
          if (account.id === timeline._source.this_account.uuid) {
            obj.timeline.push(timeline);
          }
        });
        data.push(obj);
      });
    }

    console.log(data);
    
    let accountData = '';

    if (showcomponent) {
      accountData = <AccountList accounts={accountList} />;
    } else {
      accountData = 'account not found';
    }

    let errorMessage;

    if (this.state.error) {
      errorMessage = 'please enter valid email';
    }

    return (
      <div>
        <Hero show={this._showComponent} hide={this._hideComponent} />
        {accountData}
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
            
              <div className="thumbnail">
                <form className="form">
                  <div className="form-group">
                    <label htmlFor="name">User Name:</label>
                    
                    <input 
                      onChange={this._onNameChange}
                      value={this.state.userName}
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                    />

                    <button className="btn btn-primary" type="button" onClick={this._onFormSubmit} >Submit</button>
                    {errorMessage}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
Home.propTypes = {
  dispatch: PropTypes.func,
  accountList: PropTypes.array,
  timelineList: PropTypes.object,
  timeFetched: PropTypes.bool,
  showcomponent: PropTypes.bool,
};

export default Home;