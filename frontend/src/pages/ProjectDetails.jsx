import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Plus, ArrowLeft, Clock, CheckCircle2, CircleDashed } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const { user } = useContext(AuthContext);

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');
    const [assignedTo, setAssignedTo] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        fetchProjectData();
        if (user.role === 'Admin') fetchUsers();
    }, [id]);

    const fetchProjectData = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const projRes = await axios.get(`${API_URL}/projects/${id}`, config);
            setProject(projRes.data);
            
            const tasksRes = await axios.get(`${API_URL}/tasks?projectId=${id}`, config);
            setTasks(tasksRes.data);
        } catch (error) {
            console.error('Error fetching project data:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const res = await axios.get(`${API_URL}/auth/users`, config);
            setUsers(res.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post(`${API_URL}/tasks`, {
                title, description, status, assignedTo, dueDate, projectId: id
            }, config);
            setShowTaskModal(false);
            fetchProjectData();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`${API_URL}/tasks/${taskId}/status`, { status: newStatus }, config);
            fetchProjectData();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    if (!project) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

    const getStatusBadge = (status) => {
        switch(status) {
            case 'Done': return <span className="badge badge-done flex items-center gap-2 w-max"><CheckCircle2 size={14}/> Done</span>;
            case 'In Progress': return <span className="badge badge-progress flex items-center gap-2 w-max"><Clock size={14}/> In Progress</span>;
            default: return <span className="badge badge-todo flex items-center gap-2 w-max"><CircleDashed size={14}/> To Do</span>;
        }
    };

    return (
        <div>
            <Link to="/" className="btn btn-secondary mb-4"><ArrowLeft size={16} /> Back to Projects</Link>
            
            <div className="card mb-8">
                <h1 className="text-2xl mb-2">{project.title}</h1>
                <p className="text-muted">{project.description}</p>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl">Tasks</h2>
                {(user.role === 'Admin' || user._id === project.owner._id) && (
                    <button onClick={() => setShowTaskModal(true)} className="btn">
                        <Plus size={18} /> Add Task
                    </button>
                )}
            </div>

            <div className="grid">
                {tasks.map(task => (
                    <div key={task._id} className="card">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold">{task.title}</h3>
                            {getStatusBadge(task.status)}
                        </div>
                        <p className="text-muted mb-4">{task.description}</p>
                        
                        <div className="flex flex-col gap-2 mb-4 text-sm">
                            <div><strong>Assignee:</strong> {task.assignedTo ? task.assignedTo.name : 'Unassigned'}</div>
                            <div><strong>Due:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</div>
                        </div>

                        <select 
                            value={task.status} 
                            onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                            className="input w-full"
                            style={{ padding: '0.5rem', fontSize: '0.875rem' }}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                ))}
            </div>

            {showTaskModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
                    <div className="card glass-panel" style={{ width: '100%', maxWidth: '500px' }}>
                        <h2 className="text-xl mb-4">Add New Task</h2>
                        <form onSubmit={handleCreateTask}>
                            <div className="input-group">
                                <label>Task Title</label>
                                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="input" />
                            </div>
                            <div className="input-group">
                                <label>Description</label>
                                <textarea value={description} onChange={e => setDescription(e.target.value)} className="input" rows="2"></textarea>
                            </div>
                            <div className="input-group">
                                <label>Assign To</label>
                                <select value={assignedTo} onChange={e => setAssignedTo(e.target.value)} className="input">
                                    <option value="">Select a user...</option>
                                    {users.map(u => (
                                        <option key={u._id} value={u._id}>{u.name} ({u.role})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Due Date</label>
                                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="input" />
                            </div>
                            <div className="input-group mb-8">
                                <label>Status</label>
                                <select value={status} onChange={e => setStatus(e.target.value)} className="input">
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                            <div className="flex justify-between">
                                <button type="button" onClick={() => setShowTaskModal(false)} className="btn btn-secondary">Cancel</button>
                                <button type="submit" className="btn">Create Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;
