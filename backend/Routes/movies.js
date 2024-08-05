const express = require('express')
const router = express.Router()
const Movie = require('../Models/movieModels')
const MovieController = require('../controllers/moviecontrollers')

//showing all the movies from the mongo data base 
router.get('/',MovieController.ShowMovies)


//showing the movie in the data base that has that id
router.get('/:id',MovieController.ShowMovie)

//adding a movie into the database 
router.post('/',MovieController.AddMovie)

//deleting a movie from the database 
router.delete('/',MovieController.DeleteMovie)

//modifiing information about a movie from the database ( maybe the user wants a diffrent rating for the movie )
router.patch('/:id',MovieController.ModifieMovie)













module.exports=router ;