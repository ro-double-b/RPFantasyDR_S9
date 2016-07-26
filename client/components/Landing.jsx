import React from 'react';

const Landing = (props) => (
  <div id="page-top" className="index landing">
    <nav id="mainNav" className="navbar navbar-default navbar-custom navbar-fixed-top">
      <div className="container">
        <div className="navbar-header page-scroll">
          <a className="navbar-brand page-scroll" href="#page-top">ReelTime</a>
        </div>
      </div>
    </nav>
    <header>
      <div className="container">
        <div className="intro-text">
          <div className="intro-lead-in">Watch TV with your friends</div>
          <div className="intro-heading">But in your underwear</div>
          <p className="landing-drop-text landing-circle">
            Drop Your Video File Here
            <input type="file" id="files" className="landing-circle drop-box" name="file" onChange={props.setFile} />
          </p>
        </div>
      </div>
    </header>
    <section id="services">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-heading">Services</h2>
            <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-4">
            <span className="fa-stack fa-4x">
              <i className="fa fa-circle fa-stack-2x text-primary"></i>
              <i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
            </span>
            <h4 className="service-heading">E-Commerce</h4>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
          </div>
          <div className="col-md-4">
            <span className="fa-stack fa-4x">
              <i className="fa fa-circle fa-stack-2x text-primary"></i>
              <i className="fa fa-laptop fa-stack-1x fa-inverse"></i>
            </span>
            <h4 className="service-heading">Responsive Design</h4>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
          </div>
          <div className="col-md-4">
            <span className="fa-stack fa-4x">
              <i className="fa fa-circle fa-stack-2x text-primary"></i>
              <i className="fa fa-lock fa-stack-1x fa-inverse"></i>
            </span>
            <h4 className="service-heading">Web Security</h4>
            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
          </div>
        </div>
      </div>
    </section>
    <section id="team" className="bg-light-gray">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-heading">Our Amazing Team</h2>
            <h3 className="section-subheading text-muted">Meet the ReelTime Greenfield Project Team</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 text-center">
            <p className="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <span className="copyright">Created at Hack Reactor</span>
          </div>
          <div className="col-md-4">
            <ul className="list-inline social-buttons">
              <li><a href="https://twitter.com/HackReactor?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"><i className="fa fa-twitter"></i></a>
              </li>
              <li><a href="https://www.facebook.com/hackreactor"><i className="fa fa-facebook"></i></a>
              </li>
              <li><a href="https://www.instagram.com/explore/locations/70325290/"><i className="fa fa-linkedin"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

Landing.propTypes = {
  setFile: React.PropTypes.func.isRequired,
};

export default Landing;
