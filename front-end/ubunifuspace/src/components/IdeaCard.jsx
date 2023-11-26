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

const IdeaCard = () => {

    const [opened, { open, close }] = useDisclosure(false);
    const [showContent, setShowContent] = useState(false);
    const [isExploding, setIsExploding] = useState(false);
    const [like, setIsLiked] = useState(false);
    const [likes, setLikes] = useState({});

    const [idea, setIdea] = useState('')

    const handleIdeaChange = (e) => {
        setIdea(e.target.value);
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
        }


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
                notifications.show({
                    title: 'SUCCESS',
                    message: 'Successfully created an Idea on a problem, btw your code is on 🔥🔥🔥',
                    color: 'green',
                    className: 'success-notification'
                })

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

    const data = [
        {
            "problem": {
                "problem_id": 3,
                "user_id": 3,
                "title": "Network instability",
                "description": "we can send a backup network lnk for you the arusha branch to use, to cover during unstable network times",
                "department": "IT department"
            },
            "ideas": [
                {
                    "idea_id": 3,
                    "user_id": 3,
                    "description": "we can send a backup network lnk for you the arusha branch to use, to cover during unstable network times"
                },
                {
                    "idea_id": 4,
                    "user_id": 3,
                    "description": "we can buy a starLink router it offers great connectivity regardless of your physical location"
                },
                {
                    "idea_id": 5,
                    "user_id": 3,
                    "description": "Hello naomba hella yangu"
                },
                {
                    "idea_id": 6,
                    "user_id": 3,
                    "description": "maokoto zombi sikutaji humu"
                }
            ]
        },
        {
            "problem": {
                "problem_id": null,
                "user_id": null,
                "title": "Poor sales in Mafinga ",
                "description": null,
                "department": "Sales department"
            },
            "ideas": []
        }
    ]


    return (
        <div>
            {data.map((problem) => (
                <div key={problem.problem.problem_id} className="grey-bg idea_container">
                    <div className="green_bg">
                        <p className="idea_title">{problem.problem.title}</p>
                        <p className={`idea_text ${showContent ? 'animate__animated animate__slideInDown' : 'hide'}`}>Description: {problem.problem.description}</p>
                    </div>

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

                    <div className="controls_container">
                        <p className="font_heavy position_center">Mon Nov 19 15:23</p>
                        <p className="font_heavy green_wrap pointer_cursor" onClick={toggleContent}>
                            {showContent ? 'Collapse' : 'Expand'} content
                        </p>
                        <div className="align-start position_center">
                            <WbIncandescentOutlinedIcon rotate={1} />
                            <p className="font_heavy position_center">4</p>
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
                        <textarea rows={10} className="text_area"></textarea>
                    </div>
                    <div className="send_item">
                        <SendRoundedIcon />
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default IdeaCard



