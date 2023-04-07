const JobController = require('../controllers/job.controller');


module.exports = function (app) {
    app.get('/api/jobs', JobController.allJobs);
    app.get('/api/jobs/:id', JobController.oneJob);
    app.post('/api/jobs', JobController.addJob);
    app.put('/api/jobs/:id', JobController.updateJob);
    app.delete('/api/jobs/:id', JobController.deleteJob);
};