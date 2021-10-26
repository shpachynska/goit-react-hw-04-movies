import errorImage from "./error.png";
import styles from "./ErrorView.module.css";

export default function ErrorView(message) {
  return (
    <div className={styles.notification} role="alert">
      <img src={errorImage} width="150" alt="Nothing found" />
      <p>Nothing found!</p>
    </div>
  );
}
