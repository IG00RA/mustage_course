import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherProps {
  handleLanguageChange: (language: string) => void;
  locale: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  handleLanguageChange,
  locale,
}) => {
  return (
    <div className={styles.language}>
      <button
        className={`${styles.button} ${
          locale === 'ru' ? styles.buttonActive : ''
        }`}
        onClick={() => handleLanguageChange('ru')}
        type="button"
      >
        RU
      </button>
      <button
        className={`${styles.button} ${
          locale === 'ua' ? styles.buttonActive : ''
        }`}
        onClick={() => handleLanguageChange('ua')}
        type="button"
      >
        UA
      </button>
    </div>
  );
};

export default LanguageSwitcher;