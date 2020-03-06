const express = require('express');
const bodyParser = require('body-parser');
const cinemaHallRouter = express.Router();
const authenticate = require('../authentication/authenticate');
const cors = require('./cors');
const CinemaHalls = require('../models/cinemaHalls');

cinemaHallRouter.use(bodyParser.json());


// Configure '/'
cinemaHallRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req,res,next) => {
        CinemaHalls.find({}).then((cinemaHalls) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(cinemaHalls);
;        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        CinemaHalls.create(req.body).then((cinemaHall) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(cinemaHall);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /cinemaHalls');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        CinemaHalls.remove({}).then((resp) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });


// Configure '/cinemaHallId'
cinemaHallRouter.route('/:cinemaHallId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req,res,next) => {
        CinemaHalls.findById(req.params.cinemaHallId)
        .then((cinemaHall) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(cinemaHall);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /cinemaHalls/:' + req.params.cinemaHallId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        CinemaHalls.findByIdAndUpdate(req.params.cinemaHallId, 
            { $set: req.body }, { new: true}).then((cinemaHall) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cinemaHall);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        CinemaHalls.findByIdAndDelete(req.params.cinemaHallId)
            .then((resp) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
    
module.exports = cinemaHallRouter;