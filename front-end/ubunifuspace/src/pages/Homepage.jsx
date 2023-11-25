import React from 'react'
import PostAddIcon from '@mui/icons-material/PostAdd';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';

const Homepage = () => {
    return (
        <div>
            <header>
                <nav className="navbar" >
                    <div>
                        <p className="title">Ubunifu space</p>
                    </div>
                    <div className="hamburger_menu">
                        <p>Sample text</p>
                    </div>
                </nav>
            </header>

            <section>
                <div className="main_content">


                    <div className="side_navigation">
                        <div className="center">
                            <p className="heavy_head">Menu</p>
                        </div>
                        <div className="sidenav_content">
                            <div className="sidenav_container center_div">
                                <PostAddIcon />
                            </div>
                            <div className='align_start'>
                                <p className="heavy_head align-start sidenav_text">Submit challenge</p>
                            </div>
                        </div>
                        <div className="sidenav_content">
                            <div className="sidenav_container center_div">
                                <ShowChartIcon/>
                            </div>
                            <div className='align_start'>
                                <p className="heavy_head align-start sidenav_text">Track implementation</p>
                            </div>
                        </div>
                        <div className="sidenav_content">
                            <div className="sidenav_container center_div">
                                <HelpOutlineIcon/>
                            </div>
                            <div>
                                <p className="heavy_head align-start sidenav_text">Help</p>
                            </div>
                        </div>
                        <div className="sidenav_content">
                            <div className="sidenav_container center_div">
                                <InfoIcon/>
                            </div>
                            <div>
                                <p className="heavy_head align-start sidenav_text">About</p>
                            </div>
                        </div>
                        <div className="sidenav_content">
                            <div className="sidenav_container center_div">
                                <PowerSettingsNewRoundedIcon/>
                            </div>
                            <div>
                                <p className="heavy_head align-start sidenav_text">Log out</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="center_column">

                        <div className="grey-bg idea_container">
                            <div className="green_bg">
                                <p className="idea_text">Transaction notifications delay for mobile money fund transfers</p>
                            </div>
                            <div className="controls_container">

                                <p className="font_heavy ">Mon Nov 19 15:23</p>

                                <p className="font_heavy green_wrap">Expand thread</p>

                                <p className="font_heavy">4</p>

                                <p className="font_heavy green_wrap"> + Add idea</p>

                            </div>
                        </div>

                        <div className="grey-bg idea_container">
                            <div className="green_bg">
                                <p className="idea_text">Transaction notifications delay for mobile money fund transfers</p>
                            </div>
                            <div className="controls_container">

                                <p className="font_heavy ">Mon Nov 19 15:23</p>
  
                                <p className="font_heavy green_wrap">Expand thread</p>

                                <p className="font_heavy">4</p>

                                <p className="font_heavy green_wrap"> + Add idea</p>
                            </div>
                        </div>


                    </div>

                    <div className="profile_column">
                        <div className="profile_card column">
                            <div className="center">
                                <img src="https://chingizpro.github.io/portfolio/img/person.png" className="avatar_image"/>
                            </div>
                            <div className="center">
                                <p className="faint-text">John Doe</p> <br/>
                            </div>

                            <div className="center text_below">
                                <p className="bolder-text">Marketing Department</p>
                            </div>

                            <div className="center">
                                <hr className="line-style"/>
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