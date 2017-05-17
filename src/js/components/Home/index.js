import React, { Component } from 'react';
// custom Component

import Hero from './partial/Hero';
import AccountList from './partial/AccountList';

import { connect } from "react-redux";

import { getAccountList } from "../../redux/actions/getAccountList";

@connect((store) => {
  console.log(store);
  return {
    accountList: store.accountList.accountList,
    err: store.accountList.err,
    fetching: store.accountList.fetching
  };
})


class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getAccountList());
  }
  render() {
    const { accountList } = this.props;
    console.log(accountList);
    return (
      <div>
        <Hero />
        <AccountList accounts={accountList} />
      </div>
    );
  }
}

export default Home;