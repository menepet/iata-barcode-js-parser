import React from 'react';

class Ribbon extends React.Component {

  render() {
    return (
      <a
        style={{ position: "absolute", right: 0, top: 0 }}
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/menepet/iata-barcode-js-parser">

        <img
          width="149"
          height="149"
          src={process.env.PUBLIC_URL + '/github-ribbon.svg'}
          alt="Fork me on GitHub"
        />
      </a>
    )
  }
}

export default Ribbon;
