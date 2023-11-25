import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { red } from '@mui/material/colors';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IdeaCard, Sidebar } from '../components';


const Homepage = () => {

    const [ opened, { open, close }] = useDisclosure(false);

    return (
        <div>
            <header>
                <nav className="navbar" >
                    <div>
                        <p className="title">Ubunifu space</p>
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

                    <IdeaCard />
                    <IdeaCard />


                    </div>

                    <div className="profile_column">
                        <div className="profile_card column">
                            <div className="center">
                                <img src="https://chingizpro.github.io/portfolio/img/person.png" className="avatar_image" />
                            </div>
                            <div className="center">
                                <p className="faint-text">John Doe</p> <br />
                            </div>

                            <div className="center text_below">
                                <p className="bolder-text">Marketing Department</p>
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

            <div>
                <Modal className='grey-bg' opened={opened} onClose={close} size={700} title="What can be done...?" centered>
                    <div>
                        <textarea rows={10} className='text_area'></textarea>
                    </div>
                    <div className='send_item'>
                        <SendRoundedIcon />
                    </div>
                </Modal>
            </div>

        

        </div>
    )
}

export default Homepage