import React, { useContext } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { UserContext } from '../context/UserReducer';

Chart.register(...registerables);

const Dashboard = () => {
    const { user } = useContext(UserContext);

    const scores = [
        { examName: 'Math', value: 90 },
        { examName: 'Physics', value: 80 },
        { examName: 'Chemistry', value: 70 },
        { examName: 'Biology', value: 60 },
        { examName: 'History', value: 50 },
    ];

    const primaryColor = "#003366"; // כחול כהה
    const secondaryColor = "#666666"; // אפור כהה

    const dataBar = {
        labels: scores.map(score => score.examName),
        datasets: [
            {
                label: 'Score Distribution',
                data: scores.map(score => score.value),
                backgroundColor: primaryColor,
                borderColor: secondaryColor,
                borderWidth: 2,
            },
        ],
    };

    const dataPie = {
        labels: ['Pass', 'Fail'],
        datasets: [
            {
                label: 'Pass/Fail',
                data: [3, 2],
                backgroundColor: [primaryColor, secondaryColor],
            },
        ],
    };

    const dataLine = {
        labels: ['Semester 1', 'Semester 2', 'Semester 3'],
        datasets: [
            {
                label: 'Progress Over Time',
                data: [85, 90, 78],
                borderColor: primaryColor,
                backgroundColor: 'rgba(0, 51, 102, 0.2)',
                tension: 0.4,
            },
        ],
    };

    return (
        <Container 
            maxWidth="lg" 
            sx={{
                backgroundColor: '#fff', 
                color: secondaryColor, 
                minHeight: '100vh',
                padding: '30px'
            }}
        >
            <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ fontWeight: 'bold', textAlign: 'center', color: primaryColor }}
            >
                Welcome, {user?.firstName}!
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ border: `2px solid ${primaryColor}`, boxShadow: 'none' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ textAlign: 'center', color: primaryColor }}>
                                Score Distribution
                            </Typography>
                            <Bar data={dataBar} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ border: `2px solid ${primaryColor}`, boxShadow: 'none' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ textAlign: 'center', color: primaryColor }}>
                                Pass/Fail Ratio
                            </Typography>
                            <Pie data={dataPie} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ border: `2px solid ${primaryColor}`, boxShadow: 'none' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ textAlign: 'center', color: primaryColor }}>
                                Performance Over Time
                            </Typography>
                            <Line data={dataLine} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
