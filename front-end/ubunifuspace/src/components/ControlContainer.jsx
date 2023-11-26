import React, {useState} from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ConfettiExplosion from 'react-confetti-explosion';



const ControlContainer = ({idea}) => {

    const [showContent, setShowContent] = useState(false);
    const [isExploding, setIsExploding] = useState(false);
    const [like, setIsLiked] = useState(false);
    const [likes, setLikes] = useState({});

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

    return (
        <div className="controls_container">
            <p className="font_heavy">Mon Nov 19 15:23</p>
            <div className="align-start position_center">
                <StarHalfRoundedIcon />
                <p className="font_heavy">4.2</p>
            </div>
            <div className='align-start position_center' onClick={() => {
                handleFavoriteClick()
                setIsLiked(true);
            }
            }>
                
                <>{isExploding && <ConfettiExplosion force={0.1} duration={2200} />}</>
                               
                {likes[idea.id] ? (
                    <FavoriteRoundedIcon style={{ color: '#fc033d' }} />
                ) : (
                    <FavoriteBorderIcon />
                )}
                <p className="font_heavy" >251</p>
            </div>
            <div className="align-start position_center">
                <CommentRoundedIcon />
                <p className="font_heavy">6</p>
            </div>
            <div className="position_center">
                <DeleteRoundedIcon style={{ color: 'red' }} />
            </div>
        </div>
    )
}

export default ControlContainer