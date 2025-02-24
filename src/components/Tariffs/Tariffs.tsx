'use client';

import styles from './Tariffs.module.css';
import { useTranslations } from 'next-intl';
import { tariffsBanks } from '@/data/data';
import Icon from '@/helpers/Icon';
import Button from '../Button/Button';
import { Tariff, TariffItem, fetchData } from '@/api/getTariffs';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Tariffs() {
  const t = useTranslations();
  const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL || '';

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [tariffsData, setTariffsData] = useState<Tariff[]>([]);
  const [currencySymbol, setCurrencySymbol] = useState<string>('грн');
  const [currencyKey, setCurrencyKey] = useState<string>('Price');

  const pathname = usePathname();
  const getLocaleFromPath = (pathname: string): [string, boolean] => {
    const pathSegments = pathname.split('/');
    const locale = pathSegments[1] || 'uk';
    const hasUkr = pathname.includes('ukr');
    return [locale, hasUkr];
  };

  const [locale, hasUkr] = getLocaleFromPath(pathname || '');

  useEffect(() => {
    if (!locale) return;
    setLoading(true);
    setError(false);
    fetchData(locale, hasUkr)
      .then(({ tariffs, currencySymbol, currencyKey }) => {
        setTariffsData(tariffs);
        setCurrencySymbol(currencySymbol);
        setCurrencyKey(currencyKey);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [locale]);

  if (loading || error) {
    return (
      <div className={styles.dots_loading}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    );
  }

  const sortedTariffs =
    !error && tariffsData.length
      ? [...tariffsData].sort(
          (a, b) =>
            Number(a[currencyKey as keyof Tariff]) -
            Number(b[currencyKey as keyof Tariff])
        )
      : [];

  return (
    <section id="tariffs" className={styles.tariffs}>
      <h2 className={styles.tariffsHeader}>{t('Tariffs.header')}</h2>

      <ul className={styles.tariffsList}>
        {sortedTariffs.map((item, index) => {
          return (
            <li key={index} className={styles.tariffsListItem}>
              <div className={styles.tariffsListItemHeaderWrap}>
                <h3 className={styles.tariffsListItemHeader}>{item.Name}</h3>
              </div>
              <span className={styles.tariffsListItemPrice}>
                {currencySymbol === 'грн'
                  ? `${item[currencyKey as keyof Tariff]} ${currencySymbol}`
                  : `${currencySymbol} ${item[currencyKey as keyof Tariff]}`}
              </span>

              <ul className={styles.tariffsSubList}>
                {item.TariffsItems?.map((tariffItem: TariffItem, i: number) => (
                  <li className={styles.tariffsSubListItem} key={i}>
                    <div className={styles.tariffsSubListItemIconWrap}>
                      <Icon
                        name="icon-check"
                        width={12}
                        height={9}
                        color="#575FF2"
                      />
                    </div>
                    <p className={styles.tariffsSubListItemText}>
                      {tariffItem.TariffsItem}
                    </p>
                  </li>
                ))}
              </ul>

              <div className={styles.tariffsButtonWrap}>
                <Button
                  width="100%"
                  link={CHAT_URL}
                  text={t('Main.buttonTariffs')}
                  showArrow={false}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.tariffsBankWrap}>
        <div className={styles.tariffsMoneyBox}></div>
        <p className={styles.tariffsBankText}>
          {t('Tariffs.bank.first')}
          <span className={styles.tariffsBankHighlight}>
            {t('Tariffs.bank.second')}
          </span>
        </p>
        <ul className={styles.tariffsBankList}>
          {tariffsBanks.map((bank, index) => (
            <li key={index} className={styles.tariffsBankListItem}>
              <Icon name={bank} width={48} height={48} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
