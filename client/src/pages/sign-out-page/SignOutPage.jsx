import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
State management
*/
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

/*
Component styles
*/
import './SignOutPage.css';

class SignOutPage extends Component {
  componentDidMount() {
		this.props.signOut();
		this.props.history.push('/login')
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
              SIGN OUT
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(logoutUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOutPage);