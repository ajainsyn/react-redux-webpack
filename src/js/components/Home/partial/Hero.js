import React from 'react';

const Hero = ({...props}) => (
  <div className="jumbotron">
    <div className="container">
      <h1 className="display-3">Hello, World</h1>
      <p>
        This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.
      </p>
      <button className="btn btn-primary btn-lg" onClick={props.show} >Show Component...</button>
      <button className="btn btn-primary btn-lg" onClick={props.hide} >Hide component...</button>
    </div>
  </div>
);

export default Hero;