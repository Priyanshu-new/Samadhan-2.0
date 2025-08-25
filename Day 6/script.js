// ProfileCard component
function ProfileCard({ name, title, image, description }) {
  return (
    <div className="profile-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}

// App component
function App() {
  return (
    <div className="app-container">
      <ProfileCard 
        name="Ramesh Tiwari" 
        title="React Instructor" 
        image="https://imgs.search.brave.com/Rxs1mt1zLTHheeOlIAgOQ3Jsxuf40XrlnAgQm8lJmK4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTg4/Mzg5NTMwL3Bob3Rv/L3lvdW5nLWFuZC1o/YXBweS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9SGFYdmhS/VjBUSFdobDVsYlJQ/TkJHWEl0WVB6Wkpk/RnNwT2Q5Q3diWkdJ/UT0" 
        description="Teaches React with hands-on projects." 
      />
    </div>
  );
}

// Render the App component
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
