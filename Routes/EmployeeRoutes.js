const express = require('express');
const router = express.Router();
const employeeController = require('../Controller/Employeecontroller');


router.post('/', employeeController.createEmployee);


router.get('/', employeeController.getEmployeeList);

router.get('/reportingmanager',employeeController.getEmployeesWithNullReportingManager)


router.get('/:id', employeeController.getEmployeeProfile);


router.put('/:id', employeeController.updateEmployeeProfile);


router.delete('/:id', employeeController.deleteEmployeeProfile);



module.exports = router;
