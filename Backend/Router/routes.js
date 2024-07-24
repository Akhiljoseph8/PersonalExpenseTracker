const express=require('express')
const router=express.Router()
const userController=require('../Contollers/userController')
const expenseController=require('../Contollers/expenseController')
const jwtMiddleware=require('../Middileware/jwtMiddileware')

router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)
router.post('/add-expense',jwtMiddleware,expenseController.addExpense)
router.get('/get-expense',jwtMiddleware,expenseController.getExpense)
router.put('/edit-expense/:eid',jwtMiddleware,expenseController.editExpense)
router.delete('/remove-expense/:eid',jwtMiddleware,expenseController.removeExpense)
module.exports=router