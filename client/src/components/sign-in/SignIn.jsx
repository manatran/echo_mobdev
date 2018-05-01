import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Libraries
*/
import { Field, reduxForm } from 'redux-form';
import FacebookLogin from 'react-facebook-login';

/*
State management
*/
import { connect } from 'react-redux';
import { signInActionFacebookStrategy, signInActionLocalStrategy } from '../../actions/authActions';

/*
Material UI
*/
import Button from 'material-ui/Button';
import {
  Checkbox,
  RadioGroup,
  Select,
  TextField,
  Switch,
} from 'redux-form-material-ui'

/*
Configuration
*/
import config from '../../config';

/*
Validation
*/
const validate = values => {
  const errors = {}
  const requiredFields = [
    'email',
    'password'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  return errors;
}

class SignIn extends Component {
  submit = (values) => {
    this.props.signIn(values, this.props.history);
  }

  errorMessage() {
    if (this.props.error) {
      return (
        <div className="info-red">
          {this.props.error.message}
        </div>
      );
    }
  }

  facebookResponse = (response) => {
    this.props.signInFacebook(response.accessToken, this.props.history);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-6">
          <form onSubmit={ handleSubmit(this.submit) } className="row">
            <div className="col-12">
              <Field name="email" 
                      component={TextField}
                      placeholder="Email"
                      fullWidth={true}
              />
            </div>
            <div className="col-12">
              <Field name="password" 
                      component={TextField}
                      type="password"
                      placeholder="Password"
                      fullWidth={true}
              />
            </div>
            <div className="col-12">
              <Button type="submit" variant="raised" color="primary" fullWidth={true}>
                Sign In
              </Button>
            </div>
          </form>
          <div className="row">
            <div className="col-12">
              {this.errorMessage()}
            </div>
          </div>
          
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-6">
          <FacebookLogin
            appId={config.FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={this.facebookResponse} />
        </div>
      </div>
    );  
  }
}

SignIn.propTypes = {
  authError: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (values, history) => dispatch(signInActionLocalStrategy(values, history)),
    signInFacebook: (accessToken, history) => dispatch(signInActionFacebookStrategy(accessToken, history))
  };
};

const reduxFormSignIn = reduxForm({
  form: 'signIn',
  validate
})(SignIn);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormSignIn);