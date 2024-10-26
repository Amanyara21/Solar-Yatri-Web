import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';

function DashPage() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('https://solar-yatri-backend.vercel.app/api/projects', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWMyNmVmNzI0NDk4ZDhiZjgxMzM4YiIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTcyOTg5OTY3NSwiZXhwIjoxNzYxNDM1Njc1fQ.4dxjIK2xMkBRB5mLbKQ6BmS95G2A6tDy5atHwaIv_g4",
                    },
                });
                setProjects(response.data); 
                setLoading(false);
            } catch (error) {
                setError(error.message || 'Error fetching projects');
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectClick = (project) => {
        navigate('/admin/detail', { state: { project } });
    };

    if (loading) {
        return <p>Loading projects...</p>;
    }

    if (error) {
        return <p>Error loading projects: {error}</p>;
    }

    return (
        <div className="flex h-screen">
            <Sidebar />
            <section className="flex-grow bg-gray-50 dark:bg-gray-900 p-8">
                <div className="w-max-[750px] ml-[250px] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Project Dashboard</h2>
                    <div className="flex flex-col gap-4">
                        {projects && projects.map((project, index) => (
                            <div
                                key={index}
                                onClick={() => handleProjectClick(project)}
                                className="p-4 bg-white shadow-md rounded-lg cursor-pointer hover:bg-blue-100 transition-all"
                            >
                                <h2 className="text-xl font-semibold">{project.projectName}</h2>
                                <p className="text-gray-700">Location: {project.projectLocation}</p>
                                <p className="text-gray-700">Type: {project.projectType}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DashPage;
