import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <h1>About Log Analyzer</h1>

      <p className="about-intro">
        Log Analyzer is a full-stack web application designed to simplify the
        analysis of application and system log files. It helps users quickly
        identify and manage error-level logs through an intuitive interface.
      </p>

      <section>
        <h2>What the Application Does</h2>
        <p>
          The application allows users to upload log files, automatically
          extracts ERROR-level logs, and displays them on a centralized
          dashboard. This reduces manual log inspection and speeds up the
          debugging process.
        </p>
      </section>

      <section>
        <h2>Key Features</h2>
        <ul>
          <li>Upload and process log files</li>
          <li>Automatic error detection</li>
          <li>Dashboard view of error data</li>
          <li>Export error reports in CSV format</li>
        </ul>
      </section>

      <section>
        <h2>Technologies Used</h2>
        <p>
          React.js for the frontend, Spring Boot for the backend, MySQL for data
          storage, and GitHub for version control.
        </p>
      </section>

      <section>
        <h2>Purpose</h2>
        <p>
          Log Analyzer is built to improve efficiency in application monitoring
          by providing a fast, reliable, and automated way to analyze logs and
          generate structured error reports.
        </p>
      </section>
    </div>
  );
}
