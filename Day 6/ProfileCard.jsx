import React from "react";

const ProfileCard = ({ user }) => {
  const { name, title, bio, imageUrl } = user;

  return (
    <div className="profile-card">
      <div className="card-content">
        <img
          className="profile-image"
          src={imageUrl}
          alt={`Profile picture of ${name}`}
        />
        <h2 className="profile-name">{name}</h2>
        <p className="profile-title">{title}</p>
        <p className="profile-bio">{bio}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
