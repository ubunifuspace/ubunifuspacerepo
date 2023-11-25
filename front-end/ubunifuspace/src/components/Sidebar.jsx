import React from 'react'
import PostAddIcon from '@mui/icons-material/PostAdd';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import SendRoundedIcon from '@mui/icons-material/SendRounded';



const Sidebar = () => {

    const [opened, { open, close }] = useDisclosure(false);

    function logout() {
        localStorage.removeItem('userdata');
        window.location.href = '/';
      }

    return (
        <>
            <>
                <div className="side_navigation">
                    <div className="center">
                        <p className="heavy_head">Menu</p>
                    </div>
                    <div className="sidenav_content">
                        <div className="sidenav_container center_div">
                            <PostAddIcon />
                        </div>
                        <div className='align_start '>
                            <p className="heavy_head align-start sidenav_text  " onClick={open}>Submit challenge</p>
                        </div>
                    </div>
                    <div className="sidenav_content">
                        <div className="sidenav_container center_div">
                            <ShowChartIcon />
                        </div>
                        <div className='align_start'>
                            <p className="heavy_head align-start sidenav_text">Track implementation</p>
                        </div>
                    </div>
                    <div className="sidenav_content">
                        <div className="sidenav_container center_div">
                            <HelpOutlineIcon />
                        </div>
                        <div>
                            <p className="heavy_head align-start sidenav_text">Help</p>
                        </div>
                    </div>
                    <div className="sidenav_content">
                        <div className="sidenav_container center_div">
                            <InfoIcon />
                        </div>
                        <div>
                            <p className="heavy_head align-start sidenav_text" >About</p>
                        </div>
                    </div>
                    <div className="sidenav_content">
                        <div className="sidenav_container center_div">
                            <PowerSettingsNewRoundedIcon style={{color: 'red'}} />
                        </div>
                        <div>
                            <p className="heavy_head align-start sidenav_text" onClick={logout}>Log out</p>
                        </div>
                    </div>
                </div>
            </>

            <div>
                <Modal className='grey-bg' opened={opened} onClose={close} size={700} title="Challenge details" centered>
                    <div>
                        <textarea rows={10} className='text_area'></textarea>
                    </div>

                    <h5 className='center'>Choose your challenge category</h5>

                    <div className='center deaprtment_continer'>

                        <p className='department'>Marketing</p>
                        <p className='department'>Information technology</p>

                        <p className='department'>Sales</p>

                        <p className='department'>Advertising</p>

                        <p className='department'>Administration</p>
                        <p className='department'>Human resources</p>
                        <p className='department'>Corporate</p>
                        <p className='department'>operations</p>

                    </div>

                    <div className='send_item'>
                        <SendRoundedIcon />
                    </div>

                </Modal>
            </div>

        </>



    )
}

export default Sidebar