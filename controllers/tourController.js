const fs = require('fs');

const toursFileName = 'tours-simple.json';
const tours = readFileSync(toursFileName);

function readFileSync(fileName) {
  return JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/${fileName}`)
  );
}

exports.checkId = (req, res, next, id) => {
  const tour = tours.find(tour => tour.id === +id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  next();
}

exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }

  next();
}

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours }
  });
}

exports.getTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.find(tour => tour.id === +id);

  res.status(200).json({
    status: 'success',
    data: { tour }
  });
}

exports.createTour = (req, res) => {
  const newId = tours[tours.length -1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body );

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/${toursFileName}`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    });
}

exports.updateTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.find(tour => tour.id === +id);

  res.status(200).json({
    status: 'success',
    data: { tour }
  });
}

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
}
