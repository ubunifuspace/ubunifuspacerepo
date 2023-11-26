import React, {useState} from 'react'
import { Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import ConfettiExplosion from 'react-confetti-explosion';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const IdeaCard = () => {

    const [opened, { open, close }] = useDisclosure(false);
    const [showContent, setShowContent] = useState(false);
    const [isExploding, setIsExploding] = useState(false);
    const [like, setIsLiked] = useState(false);

    const handleFavoriteClick = () => {
        setIsExploding(true);
    
        // Reset isExploding state after a delay (e.g., 1000 milliseconds)
        setTimeout(() => {
          setIsExploding(false);
        }, 100000);
      };
    
    const toggleContent = () => {
      setShowContent(!showContent);
    };

    return (
        <div>
            <div className="grey-bg idea_container">
                <div className="green_bg">
                    <p className="idea_text">Transaction notifications delay for mobile money fund transfers</p>
                </div>

                

                <div className={`center ${showContent ? 'animate__animated animate__slideInDown' : 'hide'}`}>
                    <div className='solution_card'>

                        <div className='solution_text_container'>
                            <p>Add email notifications for mobile money transfers</p>
                        </div>

                        <div className='controls_container'>
                            <p className="font_heavy">Mon Nov 19 15:23</p>
                            <div className='align-start position_center'>
                                <StarHalfRoundedIcon />
                                <p className="font_heavy">4.2</p>
                            </div>
                            <div className='align-start position_center' onClick={ () => {
                                handleFavoriteClick()
                                setIsLiked(true);
                            }
                            }>
                                <>{isExploding && <ConfettiExplosion force={0.1} duration={2200} />}</>
                                {like ? <FavoriteRoundedIcon style={{ color: '#fc033d' }} />: <FavoriteBorderIcon />}
                                <p className="font_heavy" >251</p>
                            </div>
                            <div className='align-start position_center'>
                                <CommentRoundedIcon />
                                <p className="font_heavy">6</p>
                            </div>
                            <div className='position_center'>
                                <DeleteRoundedIcon style={{ color: 'red' }} />
                            </div>
                        </div>

                    </div>
                </div>

                <div className={`center ${showContent ? 'animate__animated animate__slideInDown' : 'hide'}`}>
                    <div className='solution_card'>

                        <div className='solution_text_container'>
                            <p>Add email notifications for mobile money transfers</p>
                        </div>

                        <div className='controls_container'>
                            <p className="font_heavy">Mon Nov 19 15:23</p>
                            <div className='align-start position_center'>
                                <StarHalfRoundedIcon />
                                <p className="font_heavy">4.2</p>
                            </div>
                            <div className='align-start position_center' onClick={ () => {
                                handleFavoriteClick()
                                setIsLiked(true);
                            }
                            }>
                                <>{isExploding && <ConfettiExplosion force={0.1} duration={2200} />}</>
                                {like ? <FavoriteRoundedIcon style={{ color: '#fc033d' }} />: <FavoriteBorderIcon />}
                                <p className="font_heavy" >251</p>
                            </div>
                            <div className='align-start position_center'>
                                <CommentRoundedIcon />
                                <p className="font_heavy">6</p>
                            </div>
                            <div className='position_center'>
                                <DeleteRoundedIcon style={{ color: 'red' }} />
                            </div>
                        </div>

                    </div>
                </div>

                

                <div className="controls_container">
                    <p className="font_heavy position_center ">Mon Nov 19 15:23</p>
                    <p className="font_heavy green_wrap pointer_cursor" onClick={toggleContent}>{showContent ? 'Collapse' : 'Expand'} content</p>
                    <p className="font_heavy position_center">4</p>
                    <p className="font_heavy green_wrap pointer_cursor" onClick={open} > + Add idea</p>
                </div>
            </div>

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

export default IdeaCard