import React from "react";
import "./App.css";
import ProfileCard from "./ProfileCard";

const App = () => {
  const profile = {
    id: 1,
    name: "Ravi Kumar",
    title: "Full Stack Developer",
    bio: "Passionate about building scalable web applications and learning new technologies. I specialize in the Python and love solving complex problems.",
    imageUrl: "https://placehold.co/128x128/60a5fa/ffffff?text=Ravi",
    socials: {
      Github: "https://github.com/alex-j",
      Twitter: "https://twitter.com/alexjdev",
      Linkedin: "https://linkedin.com/in/alexjohnson",
    },
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Team Profiles</h1>
      <div className="card-wrapper">
        <ProfileCard user={profile} />
      </div>
    </div>
  );
};

export default App;
