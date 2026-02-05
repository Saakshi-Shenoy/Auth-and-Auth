import Navbar from "../components/Navbar";

export default function UserHome() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: 30 }}>
        <h1>User Home</h1>
        <p>Welcome! This is the normal user area.</p>
      </div>
    </div>
  );
}
