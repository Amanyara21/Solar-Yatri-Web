import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Swal from 'sweetalert2';

function HomePage() {
    const [user, setUser]= useState(null)
    const [activeTab, setActiveTab] = useState("company");
    const [companyProjects, setCompanyProjects] = useState([]);
    const [individualProjects, setIndividualProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const getUser=async()=>{
            const response = await axios.get('https://solar-yatri-backend.vercel.app/api/getuser', {
                    headers: { Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWMyNmVmNzI0NDk4ZDhiZjgxMzM4YiIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTcyOTg5OTY3NSwiZXhwIjoxNzYxNDM1Njc1fQ.4dxjIK2xMkBRB5mLbKQ6BmS95G2A6tDy5atHwaIv_g4" }
                });

            setUser(response.data);
           
        }
        getUser()
    },[])

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(
                    'https://solar-yatri-backend.vercel.app/api/projects',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWMyNmVmNzI0NDk4ZDhiZjgxMzM4YiIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTcyOTg5OTY3NSwiZXhwIjoxNzYxNDM1Njc1fQ.4dxjIK2xMkBRB5mLbKQ6BmS95G2A6tDy5atHwaIv_g4" 
                        }
                    }
                );
    
                const companyData = response.data.filter((project) => project.eventType === 'Company');
                const individualData = response.data.filter((project) => project.eventType === 'Community');
                
        
                setCompanyProjects(companyData);
                setIndividualProjects(individualData)
            } catch (err) {
                setError('Failed to load projects.');
            } finally {
                setLoading(false);
            }
        };
    
        if (user!=null) {
            fetchProjects();
        }
    }, [user]);
    

    if (loading) return <p>Loading projects...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">All Projects Listed</h1>
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setActiveTab("company")}
                        className={`px-4 py-2 mx-2 ${activeTab === "company"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            } rounded`}
                    >
                        Company Projects
                    </button>
                    <button
                        onClick={() => setActiveTab("individual")}
                        className={`px-4 py-2 mx-2 ${activeTab === "individual"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            } rounded`}
                    >
                        Individual Projects
                    </button>
                </div>

                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    {activeTab === "company"
                        ? companyProjects.map((project, index) => (
                            <ProjectCard key={index} project={project} type="company" />
                        ))
                        : individualProjects.map((project, index) => (
                            <ProjectCard key={index} project={project} type="individual" />
                        ))}
                </div>
            </div>
        </>
    );
}

function ProjectCard({ project }) {
    const handleInvest = async () => {
        const { value: investmentAmount } = await Swal.fire({
            title: 'Enter Investment Amount',
            input: 'number',
            inputAttributes: {
                min: 1,
                step: 1
            },
            showCancelButton: true,
            confirmButtonText: 'Buy Share',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value || value <= 0) {
                    return 'You need to enter a valid amount!';
                }
            }
        });

        if (investmentAmount) {
            try {
                const response = await axios.post('https://solar-yatri-backend.vercel.app/api/invest', {
                    projectId: project._id,
                    investmentAmount: parseFloat(investmentAmount)
                }, {
                    headers: { Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWMyNmVmNzI0NDk4ZDhiZjgxMzM4YiIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTcyOTg5OTY3NSwiZXhwIjoxNzYxNDM1Njc1fQ.4dxjIK2xMkBRB5mLbKQ6BmS95G2A6tDy5atHwaIv_g4" }
                });
                console.log(response);
                Swal.fire('Success', response.data.message, 'success');
            } catch (error) {
                // Handle errors (e.g., if investment fails)
                Swal.fire('Error', error.response?.data.message || 'Investment failed', 'error');
            }
        }
    };

    return (
        <div className="border-b border-gray-300 py-4 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {project.projectName}
                </h2>
                <p className="text-gray-700 dark:text-gray-400">Project Type: {project.projectType}</p>
                <p className="text-gray-700 dark:text-gray-400">Investment Required: ₹{project.totalCapacity}</p>
                <p className="text-gray-700 dark:text-gray-400">Invested Total: ₹{project.invested}</p>
            </div>
            <button 
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleInvest}
            >
                Invest
            </button>
        </div>
    );
}


export default HomePage;
