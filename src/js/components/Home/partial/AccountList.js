import React from 'react';
import _ from 'lodash';

const AccountList = ({...props}) => {
  const accounts = props.accounts.accounts;
  let accountList;

  accountList =  _.map(accounts, (account, i) => {
    return (
      <div className="card" key={i}>
        <div className="card-block">
          <h4 className="card-title">{account.product.name}</h4>
          <h5>{account.number}</h5>
          <a href="#" className="btn btn-primary">View Details</a>
        </div>
        <div className="card-footer">
          <small className="text-muted">{account.type}</small>
        </div>
      </div>
    )
  })

  return (
    <div className="container">
      <div className="card-columns">
        {accountList}
      </div>  
    </div>
    
  )
}

export default AccountList;