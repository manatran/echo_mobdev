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
	i: {
		paddingRight:8 + 'px',
		fontSize: 8
	}
};

class PostsList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			posts: null
		}
	}

	millisToMinutesAndSeconds(millis) {
		var minutes = Math.floor(millis / 60000);
		var seconds = ((millis % 60000) / 1000).toFixed(0);
		return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
	}

	componentDidMount() {
		fetch('/api/v1/posts')
			.then(response => response.json())
			.then((item) => {
				let posts = item;
				posts.sort(function(a,b) {return (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0);} ); 

				this.setState({ posts: posts })
			});
	}

	render() {
		const { classes } = this.props;
		if (this.state.posts) {
			return (
				<div className="row" style={{ paddingTop: '16px' }}>
					{this.state.posts.map((element, i) => (
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3" key={i}>
							<Card className={classes.card} key={element._id}>
								<CardMedia
									className={classes.media}
									image={(element.content && element.content.images) ? element.content.images[0].url : `https://api.adorable.io/avatars/128/${element.title}.png`}
									title="Contemplative Reptile"
								/>
								<CardContent>
									<Typography gutterBottom variant="headline" component="h2">
									{(() => {
											switch (element.type) {
												case 'song':
													return <i class="fas fa-music" styles={styles.i} />
												case 'artist':
													return <i class="fas fa-users" styles={styles.i} />
												case 'album':
													return <i class="fas fa-dot-circle" styles={styles.i} />
												default:
													null
											}
										})()}
										{element.content.title}
									</Typography>
									{element.type !== "song" &&
										<Typography variant="headline" component="p">
											{element.content.artist_name}
										</Typography>
									}
									{element.type === "song" &&
										<Typography component="p">
											{element.content.artist_name}
										</Typography>
									}
									<Typography component="p">
										{(element.author && element.author.username) ? element.author.username : ''}
									</Typography>
								</CardContent>
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