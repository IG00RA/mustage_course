'use client';

import styles from './Confirm.module.css';
import { useTranslations } from 'next-intl';
import Button from '../Button/Button';
import Link from 'next/link';
import Icon from '@/helpers/Icon';
import { toast } from 'react-toastify';
import { sendMessage, sendToGoogleScript } from '@/api/sendData';
import { useEffect } from 'react';
import useStore from '@/store/useStore';

export default function Confirm() {
  const t = useTranslations();
  const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL || '';

  const { query, locale } = useStore();

  const handleSubmit = async () => {
    try {
      const message = {
        bot: true,
        message: 'Користувача перенаправлено в бот',
      };
      await Promise.all([sendToGoogleScript(message), sendMessage(message)]);
      window.location.href = CHAT_URL;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`${t('Form.errors.sendError')} ${error.message}`);
      } else {
        toast.error(t('Form.errors.sendError'));
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSubmit();
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.confirm}>
      <Link className={styles.logo_wrap} href={`/${locale}/${query}`}>
        <Icon name="icon-logo" width={58} height={48} />
        <span className={styles.logo_text}>{t('Confirm.logo')}</span>
      </Link>
      <h1 className={styles.header}>{t('Confirm.header')}</h1>
      <p className={styles.text}>{t('Confirm.text')}</p>
      <div className={styles.button_wrap}>
        <Button width="232px" link={`/${locale}/`} text={t('Confirm.button')} />
      </div>

      <div className={styles.background}></div>
    </section>
  );
}
