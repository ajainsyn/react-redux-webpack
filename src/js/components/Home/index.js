import React, { Component } from 'react';
import _ from 'lodash';
// custom Component

import Hero from './partial/Hero';
import AccountList from './partial/AccountList';

import { connect } from "react-redux";

import { getAccountList, getTimelineList, showNewComponent, hideComponent } from "../../redux/actions/getAccountList";

@connect((store) => {
  console.log(store);
  return {
    timelineList: store.timelineList.timelineList,
    timeFetched: store.timelineList.fetched,
    

    accountList: store.accountList.accountList,
    err: store.accountList.err,
    fetching: store.accountList.fetching,

    showcomponent: store.componentReducer.showComponent
    
  };
})


class Home extends Component {
  constructor() {
    super();
    this._hideComponent = this._hideComponent.bind(this);
    this._showComponent = this._showComponent.bind(this);
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

  

  render() {
    const { accountList, timelineList, timeFetched, showcomponent } = this.props;

    let data = [];
    if (timeFetched) {
      _.map(accountList.accounts, account => {
        let obj = {
          'id': account.id,
          'timeline': [] 
        }
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

    return (
      <div>
        <Hero show={this._showComponent} hide={this._hideComponent} />
        {accountData}
      </div>
    );
  }
}

export default Home;