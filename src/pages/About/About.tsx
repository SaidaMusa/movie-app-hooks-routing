import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        About App
      </h1>

      <p className={styles.text}>
        Movie app built with React +
        TypeScript.
      </p>

      <p className={styles.text}>
        Created by Saida
        Musakhonova
      </p>

      <a
        className={styles.link}
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
      >
        RS School React Course
      </a>
    </div>
  );
}

export default About;