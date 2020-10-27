import React, { Component } from "react";
import Container from "../Container";
import HomeIcon from "./HomeIcon";
import Spinner from "../Spinner";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchStatics } from "../../redux/actions/staticsActions";
import { authUser } from "../../redux/actions/userActions";

class Home extends Component {
  static propTypes = {
    statics: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    fetchStatics: PropTypes.func.isRequired,
    authUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchStatics();
    this.props.authUser();
  }

  render() {
    const { statics, statics_loading } = this.props.statics;
    const { categories } = statics;

    return (
      <Container>
        <div className="home">
          {statics_loading ? (
            <div className="home-spinner">
              <Spinner />
            </div>
          ) : (
            <div className="home-icons">
              {Object.values(categories || {}).map(({ icon, title }, index) => {
                return <HomeIcon key={index} icon={icon} title={title} />;
              })}
            </div>
          )}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  statics: state.statics,
  user: state.user,
});

const mapDispatchToProps = {
  fetchStatics,
  authUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
