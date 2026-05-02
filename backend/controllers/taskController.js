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
        
        if (req.user.role !== 'Admin') {
            const userProjects = await Project.find({ $or: [{ owner: req.user._id }, { members: req.user._id }] }).select('_id');
            const projectIds = userProjects.map(p => p._id);
            if (projectId) {
                if (!projectIds.some(id => id.toString() === projectId)) {
                    return res.status(403).json({ message: 'Not authorized' });
                }
                query.project = projectId;
            } else {
                query.project = { $in: projectIds };
            }
        } else {
            if (projectId) query.project = projectId;
        }

        const tasks = await Task.find(query).populate('assignedTo', 'name email').populate('project', 'title');
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
