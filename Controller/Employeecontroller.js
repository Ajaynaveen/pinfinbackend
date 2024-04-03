const Employee = require('../Model/Employee');

const employeeController = {
    createEmployee: async (req, res) => {
        try {
            const employee = new Employee(req.body);
            await employee.save();
            res.status(201).json(employee);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    getEmployeeList: async (req, res) => {
        try {
            const employeeList = await Employee.find({})
            .populate('reportingPerson', 'fullName');
        
            res.json(employeeList);
        } catch (error) {
            console.error('Error getting employee list', error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getEmployeeProfile: async (req, res) => {
        try {
            const employeeId = req.params.id;
            const employee = await Employee.findById(employeeId);
            res.json(employee);
        } catch (error) {
            console.error('Error fetching employee profile', error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    updateEmployeeProfile: async (req, res) => {
        try {
            const employeeId = req.params.id;
            const updatedEmployee = req.body;
            const employee = await Employee.findByIdAndUpdate(employeeId, updatedEmployee, { new: true });
            res.json(employee);
        } catch (error) {
            console.error('Error updating employee profile', error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    deleteEmployeeProfile: async (req, res) => {
        try {
            const employeeId = req.params.id;
            await Employee.findByIdAndDelete(employeeId);
            res.json({ message: "Employee profile deleted successfully" });
        } catch (error) {
            console.error('Error deleting employee profile', error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    getEmployeesWithNullReportingManager: async (req, res) => {
        try {
            const employeesWithNullReportingManager = await Employee.find({ reportingPerson: null });
            res.json(employeesWithNullReportingManager);
        } catch (error) {
            console.error('Error getting employees with null reporting manager', error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
};

module.exports = employeeController;
