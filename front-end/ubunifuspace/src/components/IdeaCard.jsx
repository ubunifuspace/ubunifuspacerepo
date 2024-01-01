import React, { useState } from 'react'
import { Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import ConfettiExplosion from 'react-confetti-explosion';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
import { notifications } from '@mantine/notifications';
import ControlContainer from './ControlContainer';
import StickyControls from './StickyControls';

const IdeaCard = ({ data }) => {

    const [opened, { open, close }] = useDisclosure(false);
    const [showContent, setShowContent] = useState(false);
    const [isExploding, setIsExploding] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');
    const [like, setIsLiked] = useState(false);
    const [likes, setLikes] = useState({});
    const [idea, setIdea] = useState('');

    const handleIdeaChange = (e) => {
        setIdea(e.target.value);
    };

    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    const handleFavoriteClick = (ideaId) => {
        setIsExploding(true);

        // Set like status for the specific idea
        setLikes((prevLikes) => ({
            ...prevLikes,
            [ideaId]: !prevLikes[ideaId],
        }));

        // Reset isExploding state after a delay (e.g., 1000 milliseconds)
        setTimeout(() => {
            setIsExploding(false);
        }, 1000);
    };


    const toggleContent = () => {
        setShowContent(!showContent);
    };

    const userdata = localStorage.getItem('userdata');
    const parsedData = JSON.parse(userdata);

    console.log(parsedData);

    const handleSubmitIdea = async (e) => {

        // get the right id of the problem
        const body = {
            problem_id: 3,
            user_id: parsedData.id,
            description: idea,
            color: selectedColor
        }

        console.log(body);

        try {
            const response = await fetch('http://localhost:5000/create-idea', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            console.log(data);

            if (data.success) {
                setIdea('')
                setSelectedColor('')

                notifications.show({
                    title: 'SUCCESS',
                    message: 'Successfully created an Idea on a problem, btw your code is on 🔥🔥🔥',
                    color: 'green',
                    className: 'success-notification'
                })

                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            } else {
                setIdea('')
                notifications.show({
                    color: 'red',
                    title: 'ERROR',
                    message: `Failed to login: ${data.message}`,
                })
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    }



    return (
        <>
            <div className='white-bg '>
                <p className='bolder-text '>Explore challenges and ideas</p>
            </div>
            <div>
                {data.map((problem) => (
                    <div key={problem.problem_id} className="grey-bg idea_container">
                        <div className="green_bg">
                            <p className="idea_title">{problem.title}</p>
                            <p className={`idea_text ${showContent ? 'animate__animated animate__slideInDown' : 'hide'}`}>Description: {problem.description}</p>
                        </div>

                        {/*
                    {problem.ideas.map((idea) => (
                        <div key={idea.idea_id} className={`center ${showContent ? 'animate__animated animate__slideInDown' : 'hide'}`}>
                            <div className="solution_card">
                                <div className="solution_text_container">
                                    <p>{idea.description}</p>
                                </div>

                                <ControlContainer idea={idea} />

                            </div>
                        </div>
                    ))}
                        
                    */}

                        {/*
                    
                         <ControlContainer idea={idea} />
                    */}
                        <div className={` position_center ${showContent ? 'animate__animated animate__slideInDown' : 'hide'}`}>
                            <div className=' three_items'>
                                {problem.ideas.map((idea) => (

                                    <div key={idea.idea_id} class={`sticky_main selected-${idea.ideaColor}`}>

                                        <p className="sticky_idea"> {idea.description} </p>

                                        <StickyControls idea={idea} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="controls_container">
                            <p className="font_heavy position_center">Mon Nov 19 15:23</p>
                            <p className="font_heavy green_wrap pointer_cursor" onClick={toggleContent}>
                                {showContent ? 'Collapse' : 'Expand'} thread
                            </p>
                            <div className="align-start position_center">
                                <WbIncandescentOutlinedIcon rotate={1} />
                                <p className="font_heavy position_center">{problem.ideas.length}</p>
                            </div>
                            <p className="font_heavy green_wrap pointer_cursor" onClick={open}>
                                + Add idea
                            </p>
                        </div>
                    </div>
                ))}


                <div>
                    <Modal className="grey-bg" opened={opened} onClose={close} size={700} title="What can be done...?" centered>
                        <div>
                            <textarea
                                rows={10}
                                className="text_area"
                                onChange={handleIdeaChange}
                                value={idea} ></textarea>

                            <h5 className='center'>Choose your color</h5>

                            <div className='center deaprtment_continer'>

                                <p className={`yellow ${selectedColor === 'yellow' ? 'selected-yellow' : ''}`} onClick={() => handleColorClick('yellow')}>
                                    yellow
                                </p>
                                <p className={`light-blue ${selectedColor === 'light-blue' ? 'selected-light-blue' : ''}`} onClick={() => handleColorClick('light-blue')}>
                                    light blue
                                </p>
                                <p className={`Pink ${selectedColor === 'Pink' ? 'selected-Pink' : ''}`} onClick={() => handleColorClick('Pink')}>
                                    Pink
                                </p>
                                <p className={`Light-yellow ${selectedColor === 'Light-yellow' ? 'selected-Light-yellow' : ''}`} onClick={() => handleColorClick('Light-yellow')}>
                                    Light yellow
                                </p>
                                <p className={`Light-pink ${selectedColor === 'Light-pink' ? 'selected-Light-pink' : ''}`} onClick={() => handleColorClick('Light-pink')}>
                                    Light pink
                                </p>
                               

                            </div>
                        </div>
                        <div className="send_item pointer_cursor" onClick={handleSubmitIdea}>
                            <SendRoundedIcon />
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default IdeaCard



