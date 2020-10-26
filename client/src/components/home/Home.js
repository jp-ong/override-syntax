import React, { Component } from "react";
import Container from "../Container";
import HomeIcon from "./HomeIcon";
import Spinner from "../Spinner";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchStatics } from "../../redux/actions/staticsActions";

class Home extends Component {
  static propTypes = {
    statics: PropTypes.object.isRequired,
    fetchStatics: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchStatics();
  }

  render() {
    const { statics, statics_loading } = this.props.statics;
    const { categories } = statics;

    return (
      <Container>
        {statics_loading ? (
          <Spinner />
        ) : (
          <div className="home">
            <div className="home-icons">
              {Object.values(categories || {}).map(({ icon, title }, index) => {
                return <HomeIcon key={index} icon={icon} title={title} />;
              })}
            </div>
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  statics: state.statics,
});

const mapDispatchToProps = {
  fetchStatics,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
