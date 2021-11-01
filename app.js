const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const port = 3000;
const toursFileName = 'tours-simple.json';

const tours = readFileSync(toursFileName);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours }
  });
}

const getTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.find(tour => tour.id === +id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour }
  });
}

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.find(tour => tour.id === +id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour }
  });
}

const deleteTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.find(tour => tour.id === +id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
}

app.route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app.route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(port, () => {
  console.log(`Listening to requets on port ${port}...`);
});

function readFileSync(fileName) {
  return JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/${fileName}`)
  );
}
