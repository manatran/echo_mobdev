import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Material UI
*/
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

/*
Styles
*/
const styles = {
  card: {
  },
  media: {
    height: 200,
  },
};

class PostsList extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      posts: null
    }
  }

  componentDidMount() {
    fetch('/api/v1/artists')
      .then( response => response.json())
      .then( item => this.setState({ posts: item })); 
  }

  render() {
    const { classes } = this.props;
    if(this.state.posts) {
      return (
        <div className="row">
          {this.state.posts.map((element, i) => (
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3" key={i}>
              <Card className={classes.card} key={ element._id }>
								<CardMedia
                  className={classes.media}
                  image={(element.images[0]) ? element.images[0].url : `https://api.adorable.io/avatars/285/echo.png`}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    { element.title }
                  </Typography>
                  <Typography component="p">
                    { element.artist_name }
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    { element.release_date }
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>

        </div>
      )
    }   
  }
}

PostsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostsList);