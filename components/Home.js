import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <header>
        <h1>Lokesh’s Dashboard</h1>
        <nav aria-label="Main navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section aria-labelledby="profile-title">
          <h2 id="profile-title">Name: Lokesh</h2>
          <article>
            <h3>Technology Stack</h3>
            <ul>
              <li><strong>UI:</strong> React</li>
              <li><strong>Backend:</strong> PHP (Laravel)</li>
              <li><strong>Database:</strong> MySQL</li>
            </ul>
          </article>

          <aside>
            <h3>Tools Used</h3>
            <ul>
              <li>Apache</li>
              <li>MySQL Server</li>
              <li>Node.js</li>
              <li>VS Code</li>
              <li>GitHub</li>
            </ul>
          </aside>
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Lokesh</p>
      </footer>
    </>
  );
}

export default Home;
