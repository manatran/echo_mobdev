import React, { Component } from 'react';
import store from '../../store';

class NotFoundPage extends Component {

	componentDidMount() {
		if(!store.getState().auth.isAuthenticated){
			this.props.history.push('/login')
		}
  }

	render() {
		return (
			<main className="error-page">
				<div>
					<section className="card light" style={{flexDirection:'column'}}>
						<p>Sorry, we can't find this page right now! However, we have found a cool song you might like.</p>
					</section>
					
					<section className="card" style={{display:'flex',flexDirection:'row',justifyContent:'center',padding:16+'px'}}>
						<iframe title="YOUTUBE-embed" src="https://www.youtube.com/embed/53N99Nim6WE?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen style={{height: 360 +'px',width:640+'px',maxWidth:90+'vw'}}></iframe>
					</section>
					<section className="card" style={{padding: 16+"px",textAlign: 'center'}}>
						<a href="/" className="button">Not bad! Now take me back to the homepage please.</a>
					</section>
				</div>
			</main>
		)
	}
}

export default (NotFoundPage);