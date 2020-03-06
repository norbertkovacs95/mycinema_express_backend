const express = require('express');
const bodyParser = require('body-parser');
const seatRouter = express.Router();
const authenticate = require('../authentication/authenticate');
const cors = require('./cors');
const Seats = require('../models/seats');

seatRouter.use(bodyParser.json());


// Configure '/'
seatRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req,res,next) => {
        Seats.find().then((seats) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(seats);
;        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Seats.create(req.body).then((seat) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(seat);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /seats');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Seats.remove({}).then((resp) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });


// Configure '/seatId'
seatRouter.route('/:seatId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req,res,next) => {
        Seats.findById(req.params.seatId)
        .then((seat) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(seat);
        }, (err) => next(err))
        .catch((err) => next(err));
    }) 
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /seats/:' + req.params.seatId);
    }) //Authentication removeed from post!!! --> .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    .put(cors.corsWithOptions, (req, res, next) => {
        Seats.findByIdAndUpdate(req.params.seatId, 
            { $set: req.body }, { new: true}).then((seat) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(seat);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Seats.findByIdAndDelete(req.params.seatId)
            .then((resp) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
    
module.exports = seatRouter;