import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className={clsx('col')}>
            <div className="text--center">
              <img src='../../static/img/architecture.png' />
            </div>
            <div className="text--center padding-horiz--md">
              <h3>アーキテクチャ図</h3>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
