import React, { Component } from 'react';
import _ from 'lodash';
// custom Component

import Hero from './partial/Hero';
import AccountList from './partial/AccountList';

import { connect } from "react-redux";

import { getAccountList, getTimelineList } from "../../redux/actions/getAccountList";

@connect((store) => {
  console.log(store);
  return {
    timelineList: store.timelineList.timelineList,
    accountList: store.accountList.accountList,
    err: store.accountList.err,
    fetching: store.accountList.fetching,
    fetched: store.timelineList.fetched
  };
})


class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getAccountList());
    this.props.dispatch(getTimelineList());
  }
  render() {
    const { accountList, timelineList, fetched } = this.props;

    let data = [];
    if (fetched) {
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

    return (
      <div>
        <Hero />
        <AccountList accounts={accountList} />
      </div>
    );
  }
}

export default Home;