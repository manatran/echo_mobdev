const async = require('async');

const Subcomment = require('../models/subcomment');
const errorHandler = require('../utilities/errorHandler');

/*
Get all subcomments
*/
exports.get_subcomments = function (req, res, next) {
	const query = Subcomment.find().populate('author');
	query.sort({ created_at: -1 });
	query.exec((err, subcomments) => {
		if (err) return errorHandler.handleAPIError(500, err.message || 'Some error occurred while retrieving subcomments', next);
		if (!subcomments) {
			return errorHandler.handleAPIError(404, `Subcomments not found`, next);
		}
		return res.json(subcomments);
	});
}

/*
Get a certain subcomment
*/
exports.get_subcomments_by_parent = function (req, res, next) {
	const id = req.params.parentId;
	const query = Subcomment.find({'parent_id': id}).populate('author');
	query.exec((err, subcomment) => {
		if (err) return errorHandler.handleAPIError(500, `Could not get the subcomment with id: ${id}`, next);
		if (!subcomment) {
			return errorHandler.handleAPIError(404, `Subcomment not found with id: ${id}`, next);
		}
		return res.json(subcomment);
	});
}

/*
Create a Subcomment
*/
exports.subcomment_create_subcomment = function (req, res, next) {
	console.log(req.body.type)
	if (!req.body || !req.body.parent_id || !req.body.author || !req.body.content) {
		return errorHandler.handleAPIError(400, `Subcomment must have a parent, author, content`, next);
	}

	const subcomment = new Subcomment(req.body);
	subcomment.save((err, subcomment) => {
		if (err) return errorHandler.handleAPIError(500, `Could not save the new subcomment ${err}`, next);
		subcomment.populate('author')
		res.status(201).json(subcomment);
	});
}

/*
Update a Subcomment
*/
exports.subcomment_update_put = function (req, res, next) {
	if (!req.body || !req.body.parent_id || !req.body.author || !req.body.content) {
		return errorHandler.handleAPIError(400, `Subcomment must have a title, synopsis, body`, next);
	}

	const id = req.params.subcommentId;

	Subcomment.findByIdAndUpdate(id, {
		content: req.body.content,
	}, { new: true })
		.then(subcomment => {
			if (!subcomment) {
				return errorHandler.handleAPIError(404, `Subcomment not found with id: ${id}`, next);
			}
			res.send(subcomment);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Subcomment not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not update subcomment with id: ${id}`, next);
		});
}

/*
Delete a Subcomment
*/
exports.subcomment_delete_delete = function (req, res, next) {
	const id = req.params.subcommentId;
	Subcomment.findByIdAndRemove(id)
		.then(subcomment => {
			if (!subcomment) {
				return errorHandler.handleAPIError(404, `Subcomment not found with id: ${id}`, next);
			}
			res.status(200).json({ action: 'DELETE', message: `Subcomment with id: ${id} deleted successfully!` });
		}).catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return errorHandler.handleAPIError(404, `Subcomment not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not delete subcomment with id: ${id}`, next);
		});
}

/*
Soft-delete a subcomment
*/
exports.subcomment_softdelete_patch = function (req, res, next) {
	const id = req.params.subcommentId;

	Subcomment.findByIdAndUpdate(id, {
		deleted_at: Date.now()
	}, { new: true })
		.then(subcomment => {
			if (!subcomment) {
				return errorHandler.handleAPIError(404, `Subcomment not found with id: ${id}`, next);
			}
			res.send(subcomment);
		}).catch(err => {
			console.log(err);
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Subcomment not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-delete subcomment with id: ${id}`, next);
		});
}

/*
Soft-undelete a subcomment
*/
exports.subcomment_softundelete_patch = function (req, res, next) {
	const id = req.params.subcommentId;

	Subcomment.findByIdAndUpdate(id, {
		deleted_at: null
	}, { new: true })
		.then(subcomment => {
			if (!subcomment) {
				return errorHandler.handleAPIError(404, `Subcomment not found with id: ${id}`, next);
			}
			res.send(subcomment);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return errorHandler.handleAPIError(404, `Subcomment not found with id: ${id}`, next);
			}
			return errorHandler.handleAPIError(500, `Could not soft-undelete subcomment with id: ${id}`, next);
		});
}