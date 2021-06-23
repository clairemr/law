import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: <>Easy to Use</>,
    imageUrl: "img/undraw_docusaurus_mountain.svg",
    description: (
      <>
        CDK Cosmos is designed to get you started deploying applications with
        little effort. We provide you with good enterprise patterns out of the
        box.
      </>
    ),
  },
  {
    title: <>Build, Test, Deploy</>,
    imageUrl: "img/undraw_docusaurus_tree.svg",
    description: (
      <>
        Cosmos, lets you build, test and deploy your AWS Infrastructure. See
        what how changes results in different aws infrastructure.
      </>
    ),
  },
  {
    title: <>Powered by CDK</>,
    imageUrl: "img/undraw_docusaurus_react.svg",
    description: (
      <>Built on top of AWS CDK, means you can use all that cdk provides.</>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout title={siteConfig.title} description="CDK Cosmos Docs">
      <header className={classnames("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("guides/")}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        <div><p>isolated resources,
            sharable patterns. insert sales pitch here
          </p></div>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
