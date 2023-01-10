import exampleLandPhoto from '../../images/3333214_105132040_big.jpg';
import { useContext, useEffect, useState } from 'react';
import { hostUrl } from '../../common/urls';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import './LandDetails.scss';

export default function LandDetails() {
    const params = new URLSearchParams(window.location.search);
    const landId = params.get('landId');
    const { user } = useContext(UserContext);
    const [landDetails, setLandDetails] = useState({});
    const [isOwner, setIsOwner] = useState(false);

    const fetchLandDetails = () => {
        fetch(`${hostUrl}/land/${landId}`)
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json,"ot json a");
                setLandDetails(json);
            });
    };

    useEffect(fetchLandDetails, [landId]);

    useEffect(() => {
        if (!landDetails.owner) {
            return;
        }        
        setIsOwner(landDetails.owner == user._id);
        console.log(isOwner,"pokaji mi ownera");
    },[landDetails]);

    return (
        <section className="home-details-container">
            <div className="home-details-image-container">
                <img src={exampleLandPhoto} alt="Land" />
            </div>
            <div className="home-details-text">
                <h2>{landDetails.name}</h2>
                <p>Location: {landDetails.place}</p>
                <p>Price: {landDetails.price}</p>
                <p>Owner: {landDetails.owner_names}</p>
                <p>Information: {landDetails.description}</p>
                {isOwner 
                   ? (
                      <>
                         <Link to={`/edit-land/${landId}`} className="land-details_edit">
                             Edit land informacion
                         </Link>
                      </>
                   ) 
                   : ""
                }
            </div>
        </section>
    );
}
