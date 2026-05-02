import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(email, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="flex justify-center items-center" style={{ minHeight: '80vh' }}>
            <div className="card glass-panel" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="flex flex-col items-center mb-8">
                    <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                        <LogIn size={32} color="white" />
                    </div>
                    <h2 className="text-2xl">Welcome Back</h2>
                    <p className="text-muted">Sign in to continue to TeamTask</p>
                </div>
                
                {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '6px' }}>{error}</div>}
                
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input" placeholder="you@example.com" />
                    </div>
                    <div className="input-group mb-8">
                        <label>Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="input" placeholder="••••••••" />
                    </div>
                    <button type="submit" className="btn" style={{ justifyContent: 'center', padding: '0.75rem' }}>Sign In</button>
                </form>
                
                <div className="mt-4" style={{ textAlign: 'center' }}>
                    <p className="text-muted">Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
