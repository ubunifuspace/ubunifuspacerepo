import React, { useState, useEffect } from 'react'
import { useDisclosure } from '@mantine/hooks';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ConfettiExplosion from 'react-confetti-explosion';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Menu, Button, Text, rem, Modal, ScrollArea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconTrash,
    IconArrowsLeftRight,
} from '@tabler/icons-react';
import CommentsCards from './CommentsCards';



const StickyControls = ({ idea }) => {

    const [opened, { open, close }] = useDisclosure(false);
    const [showContent, setShowContent] = useState(false);
    const [isExploding, setIsExploding] = useState(false);
    const [data, setData] = useState([]);
    const [comment, setComment] = useState('')
    const [menu, setMenu] = useState(false);
    const [like, setIsLiked] = useState(false);
    const [likes, setLikes] = useState({});
    const [loading, setLoading] = useState('');

    console.log(idea);
    console.log(idea?.idea_id);

    const userdata = localStorage.getItem('userdata');
    const parsedData = JSON.parse(userdata);

    useEffect(() => {
        console.log('we are in');
        const fetchData = async () => {
            try {
                console.log('in in in in in');
                const response = await fetch(`http://localhost:5000/api/commentsForIdea/${idea?.idea_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const retreivedComments = await response.json();
                setData(retreivedComments?.comments);
                console.log(retreivedComments?.comments);
            } catch (error) {
                console.error('An error occurred', error.message);
            } finally {
                setLoading(false);
            }
        };


        fetchData();
    }, [idea]);


    console.log(data);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
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

    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const commentsNumber = Math.floor(Math.random() * 100) + 1;
    const randomDecimal = (Math.floor(Math.random() * 31) + 20) / 10;


    const toggleContent = () => {
        setShowContent(!showContent);
    };

    const handleSubmitComment = async (e) => {

        // get the right id of the problem
        const body = {
            idea_id: idea?.idea_id,
            user_id: parsedData.id,
            comment: comment,
        }

        console.log(body);

        try {
            const response = await fetch('http://localhost:5000/api/insertComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            console.log(data);

            if (data.success) {
                setComment('')

                notifications.show({
                    title: 'SUCCESS',
                    message: 'Successfully created a comment on an idea, yeeesh your code is  🔥🔥🔥',
                    color: 'green',
                    className: 'success-notification'
                })

                // setTimeout(() => {
                //     window.location.reload();
                // }, 2000);

            } else {
                setComment('')
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
        <div className="sticky_idea_controls">
            {/* <p className="font_heavy">Mon Nov 19 15:23</p> 
            <div className="align-start position_center">
                <StarHalfRoundedIcon />
                <p className="font_heavy">{randomDecimal}</p>
            </div>
        */}
            <div className='align-start position_center' onClick={() => {
                handleFavoriteClick()
                setIsLiked(true);
            }
            }>

                <>{isExploding && <ConfettiExplosion force={0.1} duration={2200} />}</>

                {likes[idea.id] ? (
                    <FavoriteRoundedIcon fontSize="small" style={{ color: '#fc033d' }} />
                ) : (
                    <FavoriteBorderIcon fontSize="small" />
                )}
                <p className="font_heavy" >{randomNumber}</p>
            </div>
            <div className="align-start position_center">

                <Menu shadow="lg" width={200}>
                    <Menu.Target>
                        <MoreVertIcon fontSize="small" className='sticky_options' onClick={() => {

                        }} />
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>Idea</Menu.Label>
                        <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />} onClick={open} >
                            Comments
                        </Menu.Item>


                        <Menu.Divider />

                        <Menu.Label>Edit</Menu.Label>
                        <Menu.Item
                            color="red"
                            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                        >
                            Delete an idea
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>

            {/*
            <div className="align-start position_center">
                <CommentRoundedIcon width={10}  />
                <p className="font_heavy">{commentsNumber}</p>
            </div>
             */}
            <div>
                <Modal className="grey-bg" opened={opened} onClose={close} size={700} title="Comments" centered>
                    <div>

                        <ScrollArea h={250}>
                            {data.map((comment) => (
                                <div key={comment.id}>
                                    <CommentsCards key={comment?.id} date={comment?.date} commentText={comment?.comment} />
                                </div>
                            ))}
                        </ScrollArea>


                        <p>What your take on this ...?</p>

                        <textarea
                            rows={2}
                            className="text_area"
                            onChange={handleCommentChange}
                            value={comment} ></textarea>
                    </div>
                    <div className="send_item pointer_cursor" onClick={handleSubmitComment}>
                        <SendRoundedIcon />
                    </div>
                </Modal>
            </div>

        </div>
    )
}

export default StickyControls