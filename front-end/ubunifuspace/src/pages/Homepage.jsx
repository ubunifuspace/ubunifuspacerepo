import React, { useState, useEffect } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { red } from '@mui/material/colors';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IdeaCard, Sidebar } from '../components';


const Homepage = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState('');

    const userdata = localStorage.getItem('userdata');
    const parsedData = JSON.parse(userdata);

    console.log(parsedData);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/problems', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                setData(responseData?.problemsWithIdeas);
                console.log(responseData?.problemsWithIdeas);
            } catch (error) {
                console.error('An error occurred', error.message);
            } finally {
                setLoading(false);
            }
        };


        fetchData();
    }, []);



    const [opened, { open, close }] = useDisclosure(false);

    return (
        <div id="homepage_dashboard">
            <header>
                <nav className="navbar" >
                    <div>
                        <p className="title animate__animated animate__pulse">Ubunifu space</p>
                    </div>
                    <div className="hamburger_menu">
                        <MenuRoundedIcon />
                    </div>
                </nav>
            </header>

            <section>
                <div className="main_content">

                    
                    <Sidebar />

                    <div className="center_column">

                        <IdeaCard data={data} />


                    </div>

                    <div className="profile_column">
                        <div className="profile_card column">
                            <div className="center">
                                <img src="https://chingizpro.github.io/portfolio/img/person.png" className="avatar_image" />
                            </div>
                            <div className="center flex-column">
                                <p className="faint-text no-spacing">{parsedData?.name}</p> <br />
                                <p className="bolder-text">{parsedData?.email}</p>
                            </div>

                            <div className="center">
                                <hr className="line-style" />
                            </div>

                            <div className="center text_below">
                                <p className="bolder-text">Your stats</p>
                            </div>

                            <div className="green_bg ">
                                <div className="center">
                                    <p className="bolder-text">Problems submitted</p>
                                </div>
                                <div className="center">
                                    <p className="stat_number">3</p>
                                </div>
                            </div>

                            <div className="green_bg ">
                                <div className="center">
                                    <p className="bolder-text">Ideas submitted</p>
                                </div>
                                <div className="center">
                                    <p className="stat_number">5</p>
                                </div>
                            </div>

                            <div className="green_bg ">
                                <div className="center">
                                    <p className="bolder-text">Monthly awards </p>
                                </div>
                                <div className="center">
                                    <p className="stat_number">4</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Homepage