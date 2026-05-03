import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FolderPlus, Folder } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { user } = useContext(AuthContext);

    const fetchProjects = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const res = await axios.get(`${API_URL}/projects`, config);
            setProjects(res.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const fetchTasks = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const res = await axios.get(`${API_URL}/tasks`, config);
            setTasks(res.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
        fetchTasks();
    }, []);

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post(`${API_URL}/projects`, { title, description }, config);
            setShowModal(false);
            setTitle('');
            setDescription('');
            fetchProjects();
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl">Dashboard</h1>
                {user.role === 'Admin' && (
                    <button onClick={() => setShowModal(true)} className="btn">
                        <FolderPlus size={18} /> New Project
                    </button>
                )}
            </div>

            <div className="mb-8">
                <h2 className="text-xl mb-4">Tasks Overview</h2>
                <div className="grid">
                    <div className="card text-center">
                        <h3 className="text-2xl" style={{ color: 'var(--primary)' }}>{tasks.length}</h3>
                        <p className="text-muted">Total Tasks</p>
                    </div>
                    <div className="card text-center">
                        <h3 className="text-2xl" style={{ color: '#f59e0b' }}>{tasks.filter(t => t.status === 'In Progress').length}</h3>
                        <p className="text-muted">In Progress</p>
                    </div>
                    <div className="card text-center">
                        <h3 className="text-2xl" style={{ color: '#ef4444' }}>{tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'Done').length}</h3>
                        <p className="text-muted">Overdue</p>
                    </div>
                    <div className="card text-center">
                        <h3 className="text-2xl" style={{ color: '#10b981' }}>{tasks.filter(t => t.status === 'Done').length}</h3>
                        <p className="text-muted">Completed</p>
                    </div>
                </div>
            </div>

            <h2 className="text-xl mb-4">Projects</h2>

            {projects.length === 0 ? (
                <div className="card text-center text-muted" style={{ padding: '4rem' }}>
                    <Folder size={48} className="mx-auto mb-4" style={{ margin: '0 auto', opacity: 0.5 }} />
                    <p>No projects found. {user.role === 'Admin' ? 'Create one to get started!' : 'Ask an admin to add you to a project.'}</p>
                </div>
            ) : (
                <div className="grid">
                    {projects.map(project => (
                        <Link to={`/project/${project._id}`} key={project._id} style={{ textDecoration: 'none' }}>
                            <div className="card h-full flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl mb-2" style={{ color: 'var(--primary)' }}>{project.title}</h3>
                                    <p className="text-muted mb-4">{project.description}</p>
                                </div>
                                <div className="flex justify-between items-center text-sm text-muted" style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                    <span>Owner: {project.owner.name}</span>
                                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', zIndex: 100, padding: '2rem 1rem', overflowY: 'auto' }}>
                    <div className="card glass-panel" style={{ width: '100%', maxWidth: '500px', margin: 'auto' }}>
                        <h2 className="text-xl mb-4">Create New Project</h2>
                        <form onSubmit={handleCreateProject}>
                            <div className="input-group">
                                <label>Project Title</label>
                                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="input" />
                            </div>
                            <div className="input-group mb-8">
                                <label>Description</label>
                                <textarea value={description} onChange={e => setDescription(e.target.value)} className="input" rows="3"></textarea>
                            </div>
                            <div className="flex justify-between">
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
                                <button type="submit" className="btn">Create Project</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
