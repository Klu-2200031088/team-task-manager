import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LayoutDashboard, CheckSquare } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-link text-xl flex items-center gap-2" style={{ color: 'var(--primary)' }}>
                <CheckSquare size={24} />
                <b>TeamTask</b>
            </Link>
            
            <div className="nav-links">
                {user ? (
                    <>
                        <Link to="/" className="nav-link flex items-center gap-2"><LayoutDashboard size={18} /> Dashboard</Link>
                        <span className="text-muted">|</span>
                        <span style={{fontWeight: 600}}>Hi, {user.name} ({user.role})</span>
                        <button onClick={handleLogout} className="btn btn-secondary flex items-center gap-2">
                            <LogOut size={16} /> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="btn">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
