import './Profile.css';

export default function Profile() {
  return (
    <div className="profile-page">
      <h1>👤 My Profile</h1>

      <div className="profile-card">
        <p><strong>Name:</strong> Benasir</p>
        <p><strong>Email:</strong> user@email.com</p>
        <p><strong>Role:</strong> Log Analyst</p>
      </div>
    </div>
  );
}
