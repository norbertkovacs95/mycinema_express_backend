const express = require('express');
const bodyParser = require('body-parser');
const sectionRouter = express.Router();
const authenticate = require('../authentication/authenticate');
const cors = require('./cors');
const Sections = require('../models/sections');

sectionRouter.use(bodyParser.json());


// Configure '/'
sectionRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req,res,next) => {
        Sections.find().then((sections) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(sections);
;        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Sections.create(req.body).then((section) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(section);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /sections');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Sections.remove({}).then((resp) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });


// Configure '/sectionId'
sectionRouter.route('/:sectionId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req,res,next) => {
        Sections.findById(req.params.sectionId)
        .then((section) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(section);
        }, (err) => next(err))
        .catch((err) => next(err));
    }) 
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /sections/:' + req.params.sectionId);
    })
    .put(cors.corsWithOptions, (req, res, next) => {
        Sections.findByIdAndUpdate(req.params.sectionId, 
            { $set: req.body }, { new: true}).then((section) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(section);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Sections.findByIdAndDelete(req.params.sectionId)
            .then((resp) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
    
module.exports = sectionRouter;