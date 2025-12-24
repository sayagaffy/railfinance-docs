import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)} style={{ background: 'linear-gradient(180deg, var(--ifm-color-primary-lightest) 20%, var(--ifm-color-primary) 100%)', color: 'white', padding: '4rem 0' }}>
      <div className="container">
        <img
          src="img/logo-kai.png"
          alt="KAI Logo"
          style={{ height: '80px', marginBottom: '1.5rem' }}
        />
        <Heading as="h1" className="hero__title" style={{ color: 'white', fontWeight: 800 }}>
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle" style={{ opacity: 0.9 }}>{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

function ModuleSelection() {
  return (
    <section className={styles.features} style={{ padding: '4rem 0' }}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Akses Dokumentasi Sistem</Heading>
          <p style={{ fontSize: '1.2rem', color: 'var(--ifm-color-emphasis-700)' }}>Silakan pilih lingkungan sistem yang ingin Anda akses</p>
        </div>

        <div className="row" style={{ justifyContent: 'center', gap: '2rem' }}>
          {/* Internal Module Card */}
          <div className={clsx('col col--5')}>
            <div className="card shadow--lg h-100" style={{
              borderRadius: '16px',
              border: '1px solid var(--ifm-color-primary-light)',
              padding: '2rem',
              transition: 'transform 0.2s',
              background: 'var(--ifm-card-background-color)'
            }}>
              <div className="card__header">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏢</div>
                <Heading as="h3" style={{ color: 'var(--ifm-color-primary)', fontSize: '1.5rem' }}>Internal System</Heading>
              </div>
              <div className="card__body">
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                  Dokumentasi lengkap untuk operasional unit internal RailFinance.
                  Mencakup modul Anggaran, Keuangan, Pajak, dan panduan teknis Unit.
                </p>
              </div>
              <div className="card__footer margin-top--md">
                <Link
                  className="button button--primary button--block button--lg"
                  to="/docs/category/internal-system"
                  style={{ borderRadius: '8px', fontWeight: 600 }}>
                  Akses Dokumentasi &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* External Module Card */}
          <div className={clsx('col col--5')}>
            <div className="card shadow--md h-100" style={{
              borderRadius: '16px',
              border: '1px dashed var(--ifm-color-emphasis-400)',
              padding: '2rem',
              background: 'var(--ifm-background-color)',
              opacity: 0.9
            }}>
              <div className="card__header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌐</div>
                  <span className="badge badge--warning" style={{ borderRadius: '4px', padding: '0.4rem 0.8rem' }}>ON GOING</span>
                </div>
                <Heading as="h3" style={{ color: 'var(--ifm-color-emphasis-700)', fontSize: '1.5rem' }}>External System</Heading>
              </div>
              <div className="card__body">
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                  Panduan integrasi dan penggunaan untuk mitra eksternal.
                  Modul ini sedang dalam tahap pengembangan aktif.
                </p>
              </div>
              <div className="card__footer margin-top--md">
                <Link
                  className="button button--secondary button--block button--lg"
                  to="/docs/external"
                  style={{ borderRadius: '8px' }}>
                  Lihat Preview &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="RailFinance Internal Documentation">
      <HomepageHeader />
      <main>
        <ModuleSelection />
      </main>
    </Layout>
  );
}
