const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try {
        const { title, description, members } = req.body;
        const project = await Project.create({
            title,
            description,
            owner: req.user._id,
            members: members || []
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        // Admin sees all, Member sees only their projects
        let query = {};
        if (req.user.role !== 'Admin') {
            query = { $or: [{ owner: req.user._id }, { members: req.user._id }] };
        }
        const projects = await Project.find(query).populate('owner', 'name email').populate('members', 'name email');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('owner', 'name email').populate('members', 'name email');
        if (!project) return res.status(404).json({ message: 'Project not found' });
        
        // Ensure user has access
        if (req.user.role !== 'Admin' && project.owner._id.toString() !== req.user._id.toString() && !project.members.some(m => m._id.toString() === req.user._id.toString())) {
            return res.status(403).json({ message: 'Not authorized to access this project' });
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
