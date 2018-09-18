const express = require('express');
const router = express.Router();
const { Customer, customerValidation } = require('../models/customer');

router.get('/', async (req, res) => {
  const customer = await Customer.find();
  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('no genre with given ID');
  res.send(customer);
});

router.post('/', async (req, res) => {
  const { error } = customerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = customerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    },
    { new: true }
  );

  if (!customer) return res.status(404).send('no genre with given ID');

  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send('no genre with given ID');
  res.send(customer);
});

module.exports = router;
