import React from 'react';
import './style.css';

type TCardProps = {
    title: string;
    imageUrl: string;
    description: string;
}

const Card: React.FC<TCardProps> = ({ title, imageUrl, description }) => {
    return (
        <div className="card">
            <img className="card-image" src={imageUrl} alt={title} />
            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <p className="card-description">{description}</p>
            </div>
        </div>
    );
};
export default Card;
