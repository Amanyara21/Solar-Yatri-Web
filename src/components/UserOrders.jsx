import { useEffect, useState } from 'react';
import axios from 'axios';

function UserOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://solar-yatri-backend.vercel.app/api/user/orders', {
                    headers: { Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWMyNmVmNzI0NDk4ZDhiZjgxMzM4YiIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTcyOTg5OTY3NSwiZXhwIjoxNzYxNDM1Njc1fQ.4dxjIK2xMkBRB5mLbKQ6BmS95G2A6tDy5atHwaIv_g4" }
                });
                console.log('====================================');
                console.log(response.data);
                console.log('====================================');
                setOrders(response.data);
            } catch (err) {
                setError('Failed to load orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Loading orders...</p>;
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                Your Investments
            </h1>
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div key={index} className="border-b border-gray-300 py-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                {order.companyName}
                            </h2>
                            <p className="text-gray-700 dark:text-gray-400">Invested Amount: ₹{order.investedAmount}</p>
                            <p className="text-gray-700 dark:text-gray-400">Share Percentage: {order.percentageShare}%</p>
                            <p className="text-gray-700 dark:text-gray-400">Energy Production Per Minute: {order.energy_production_per_minute}</p>
                            <p className="text-gray-700 dark:text-gray-400">Carbon Offset per minute: {order.co2_saved_per_minute}</p>
                        </div>
                    ))
                ) : (
                    <p className='text-black dark:text-white'>No Orders Available</p>
                )}
            </div>
        </div>
    );
}

export default UserOrders;
