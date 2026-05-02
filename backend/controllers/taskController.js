const Task = require('../models/Task');
const Project = require('../models/Project');

exports.createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate, projectId, assignedTo } = req.body;
        
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        if (req.user.role !== 'Admin' && project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only Admin or Project Owner can create tasks' });
        }

        const task = await Task.create({
            title, description, status, dueDate, project: projectId, assignedTo
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const projectId = req.query.projectId;
        let query = {};
        
        if (projectId) {
            query.project = projectId;
        }

        const tasks = await Task.find(query).populate('assignedTo', 'name email').populate('project', 'title');
        
        // Filter tasks if not admin? Depending on requirements, we can show all tasks in a project the user belongs to.
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        task.status = req.body.status || task.status;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
