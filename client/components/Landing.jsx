import React from 'react';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: false,
      file: '',
    };

    this.handleFileSelect = this.handleFileSelect.bind(this);
  }

  handleFileSelect(e) {
    this.setState({
      file: e.target.files[0],
      hidden: true,
    });
  }

  render() {
    if (this.state.hidden) {
      console.log(this.state);
      return (<div></div>);
    } else {
      return (
        <div id="landing">
          <div className="landing-left">
            <p className="landing-logo">ReelTime</p>
            <p className="landing-logo small">Watch tv with your friends in your underwear</p>
          </div>
          <div className="landing-right">
            <div className="landing-top-right ">
              <input type="file" id="files" className="landing-circle" name="file" onChange={this.handleFileSelect} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Landing;
