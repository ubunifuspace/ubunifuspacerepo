import React, { useState } from 'react'
import PostAddIcon from '@mui/icons-material/PostAdd';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';
import icon from '../../public/UbunifuSpace.png'
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { notifications } from '@mantine/notifications';



const Sidebar = () => {

    const [opened, { open, close }] = useDisclosure(false);
    const [challenge, setChallenge] = useState('')
    const [title, setTitle] = useState('')
    // const [department, setDepartment] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');

    const handledescriptonChange = (e) => {
        setChallenge(e.target.value);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDepartmentClick = (department) => {
        setSelectedDepartment(department);
    };

    function logout() {
        localStorage.removeItem('userdata');
        window.location.href = '/';
    }

    const userdata = localStorage.getItem('userdata');
    const parsedData = JSON.parse(userdata);

    console.log(parsedData);

    const handleSubmit = async (e) => {

        const body = {
            description: challenge,
            department: selectedDepartment,
            title: title,
            user_id: parsedData.id,
        }


        try {
            const response = await fetch('http://localhost:5000/create-problem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            console.log(data);

            if (data.success) {
                setChallenge('')
                setTitle('')
                setSelectedDepartment('')
                notifications.show({
                    title: 'SUCCESS',
                    message: 'Successfully created a problem,btw your code is awesome! 🤥',
                    color: 'green',
                    className: 'success-notification'
                })
                //   window.location.href = '/home'

                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            } else {
                //   alert(`Failed to login: ${data.message}`);
                notifications.show({
                    color: 'red',
                    title: 'ERROR',
                    message: `Failed to login: ${data.message}`,
                })
            }
        } catch (error) {
            console.error('An error occurred', error);
            // Handle network or other errors here
        }
    }

    return (
        <>
            <>
                <div className="side_navigation">
                    <div className="center">
                        <img src={icon} width={40} height={40} />
                        <div className='hide_on_narrow side_text'>
                            <p className="sidenav_text">UbunifuSpace</p>
                        </div>

                    </div>

                    <hr className="line-style" />

                    <div className="sidenav_content">

                        <div className="sidenav_container sidenav_content_box" onClick={open}>
                            <div className='center_div'>
                                <PostAddIcon />
                            </div>
                            <div className='hide_on_narrow side_text'>
                                <p className="sidenav_text">Submit challenge</p>
                            </div>
                        </div>

                        <div className="sidenav_container sidenav_content_box">
                            <div className='center_div'>
                                <ShowChartIcon />
                            </div>
                            <div className='hide_on_narrow side_text'>
                                <p className="sidenav_text">Track implementation</p>
                            </div>
                        </div>

                        <div className="sidenav_container sidenav_content_box">
                            <div className='center_div'>
                                <HelpOutlineIcon />
                            </div>
                            <div className='hide_on_narrow side_text'>
                                <p className="sidenav_text">Help</p>
                            </div>
                        </div>

                        <div className="sidenav_container bottom_placed sidenav_content_box" onClick={logout}>
                            <div className='center_div'>
                                <PowerSettingsNewRoundedIcon style={{ color: 'red' }} />
                            </div>
                            <div className='hide_on_narrow side_text'>
                                <p className="sidenav_text">Log out</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>

            <div>
                <Modal className='grey-bg' opened={opened} onClose={close} size={700} title="Challenge details" centered>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <textarea
                                rows={2}
                                placeholder='TITLE'
                                className='text_area'
                                value={title}
                                onChange={handleTitleChange}
                            ></textarea>
                        </div>

                        <div>
                            <textarea
                                rows={6}
                                placeholder='Description'
                                className='text_area'
                                value={challenge}
                                onChange={handledescriptonChange}
                            ></textarea>
                        </div>


                        <h5 className='center'>Choose your challenge category</h5>

                        <div className='center deaprtment_continer'>

                            <p className={`department ${selectedDepartment === 'Marketing' ? 'selected' : ''}`} onClick={() => handleDepartmentClick('Marketing')}>
                                Marketing
                            </p>
                            <p className={`department ${selectedDepartment === 'Information technology' ? 'selected' : ''}`} onClick={() => handleDepartmentClick('Information technology')}>
                                Information technology
                            </p>
                            <p className={`department ${selectedDepartment === 'Sales' ? 'selected' : ''}`} onClick={() => handleDepartmentClick('Sales')}>
                                Sales
                            </p>
                            <p className={`department ${selectedDepartment === 'Advertising' ? 'selected' : ''}`} onClick={() => handleDepartmentClick('Advertising')}>
                                Advertising
                            </p>
                            <p className={`department ${selectedDepartment === 'Administration' ? 'selected' : ''}`} onClick={() => handleDepartmentClick('Administration')}>
                                Administration
                            </p>
                            <p className={`department ${selectedDepartment === 'Human resources' ? 'selected' : ''}`} onClick={() => handleDepartmentClick('Human resources')}>
                                Human resources
                            </p>
                            <p className={`department ${selectedDepartment === 'Corporate' ? 'selected' : ''}`} onClick={() => handleDepartmentClick('Corporate')}>
                                Corporate
                            </p>
                            <p className={`department ${selectedDepartment === 'operations' ? 'selected' : ''}`} onClick={() => handleDepartmentClick('operations')}>
                                Operations
                            </p>

                        </div>


                        <div className='send_item ' onClick={handleSubmit} >
                            <SendRoundedIcon className='pointer_cursor' />
                        </div>

                    </form>

                </Modal>
            </div>

        </>



    )
}

export default Sidebar