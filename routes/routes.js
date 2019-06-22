const express = require('express')
const router = express.Router();


module.exports = function(queries){

	// redirect to admin add page on add
	router.post('/admin/add', (req, res) => {
		res.redirect('/admin/add')
	})
	// redirect to admin page on delete
	router.post('/admin/delete', (req, res) => {
		res.redirect('/admin')
	})
	// redirect to admin page on edit
	router.post('/admin/edit', (req, res) => {
		res.redirect('/admin')
	})

	// render admin page
	router.get('/admin', (req, res) => {
		res.render('pages/admin')
	})
	// render admin add page
	router.get('/admin/add', (req, res) => {
		res.render('pages/admin/add')
	})
	// render admin edit page
	router.get('/admin/edit', (req, res) => {
		res.render('pages/admin/edit')
	})
	// render restaurants page
	router.get('/restaurants', (req, res) => {
		res.render('pages/restaurants')	
	})
	
  return router;
}