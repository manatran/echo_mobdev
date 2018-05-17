const passport = require('passport');
const bcrypt = require('bcryptjs')

const User = require('../models/user');
const errorHandler = require('../utilities/errorHandler');
const tokenUtils = require('../utilities/token');
const config = require('../../../config/config');

exports.get_user = function(req, res, next) {
	const id = req.params.userId;
	User.findOne({_id: id}).then(user => {
		if(user){
			res.json(user)
		}else{
			return res.status(401).json({
				error: 'User does not exist'
			})
		}
	})
}

exports.edit_user = function(req,res,next){
	const id = req.params.userId;

	User.findByIdAndUpdate(id, {
		bio: req.body.bio
	}, { new: true })
		.then(user => {
			if (!user) {
				return errorHandler.handleAPIError(404, `User not found with id: ${id}`, next);
			}
			res.send(user);
		}).catch(err => {
			console.log(err);
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `User not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not edit user with id: ${id}`, next);
		});
}


exports.user_create_post = function (req, res, next) {
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({
				'message': 'User Already Exists'
			});
		} else {
			const user = new User({
				username: req.body.username,
				email: req.body.email,
				picture: 'https://api.adorable.io/avatars/200/' + req.body.email + '.png',
				localProvider: {
					password: req.body.password
				}
			});
			user.save((err, post) => {
				if (err) return next(err);
				res.status(201).json(user);
			});
		}
	})
}

exports.user_auth_local_post = function (req, res, next) {

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }).then(user => {
		if (!user) {
			return res.status(401).json({
				error: 'User does not exist'
			})
		}

		bcrypt.compare(password, user.localProvider.password).then(isMatch => {
			if (isMatch) {
				// User Matched
				const payload = { id: user.id, username: user.username }; // Create JWT Payload

				const token = tokenUtils.createToken(payload)

				res.status(200).json({
					user: user,
					token: `Bearer ${token}`,
					strategy: 'local'
				});
			} else {
				errors.password = 'Password incorrect';
				return res.status(400).json(errors);
			}
		});
	})
}

exports.user_auth_facebook_post = function (req, res, next) {
	passport.authenticate('facebook-token', config.jwtSession, function (err, user, info) {
		if (err) { return next(err); }
		if (!user) {
			return res.status(401).json({
				'message': 'User Not Authenticated'
			});
		}
		req.auth = {
			id: user.id
		};
		const token = tokenUtils.createToken(req.auth);
		res.status(200).json({
			user: user,
			token: `Bearer ${token}`,
			strategy: 'facebook-token'
		});
	})(req, res, next);
}
