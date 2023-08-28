const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res
    .status(200)
    .json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {tours},
    });
};

exports.createTour = (req, res) => {
    console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res
        .status(201)
        .json({
            tour: newTour
        });
    });
};

exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1; // multiply by 1 to make it numerical
    const tour = tours.find(el => el.id === id);

    if(!tour) {
        return res
            .status(404)
            .json({
                status: 'failed',
                message: 'Invalid tour ID'
            })
    }

    return res
        .status(200)
        .json({
            status: 'success',
            data: {
                tour
            }
        })
};

exports.updateTour = (req, res) => {
    if(req.params.id * 1 > tours.length) {
        return res
            .status(404)
            .json({
                status: 'failed',
                message: 'Invalid tour ID'
            });
    }

    res
    .status(200)
    .json({
        status: 'success',
        data: {
            tour: '<Update your tour here...>'
        }
    });
};

exports.deleteTour = (req, res) => {
    console.log(req.params.id);
    if(req.params.id*1 > tours.length) {
        return res
            .status(404)
            .json({
                status: 'failed',
                message: 'Invalid tour ID'
            });
    }

    res
        .status(204)
        .json({
            status: 'success',
            data: null
        });
};