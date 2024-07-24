const expense = require('../Models/expenseModel')

exports.addExpense = async (req, res) => {
  const { amount, category, date, description } = req.body
  const userId = req.payload
  try {
    const newExpense = new expense({ amount, category, date, description, userId })
    await newExpense.save()
    res.status(200).json(newExpense)

  } catch (err) {
    res.status(406).json(err)
    console.log(err)
  }
}

exports.getExpense = async (req, res) => {
  const userId = req.payload
  try {
    const result = await expense.find({ userId })
    if (result) {
      res.status(200).json(result)
    } else {
      res.status(401).json("No Records")
    }
  } catch (err) {
    res.status(406).json(err)
  }
}

exports.editExpense = async (req, res) => {
  const userId = req.payload
  const { eid } = req.params
  const { amount, category, date, description } = req.body
  try {
    const result = await expense.findByIdAndUpdate({ _id: eid }, { amount, category, date, description, userId }, { new: true })
    await result.save()
    res.status(200).json(result)
  } catch (err) {
    res.status(406).json(err)
  }
}


exports.removeExpense = async (req, res) => {
  const { eid } = req.params
  try {
    const result = await expense.findByIdAndDelete({ _id: eid })
    res.status(200).json(result)
  } catch (err) {
    res.status(406).json(err)
  }
}