import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://prowpdev.com';

export default function SEO({
  title,
  description,
  path = '',
  image = '/',
  noIndex = false,
}) {
  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <link
        rel="canonical"
        href={canonicalUrl}
      />

      {noIndex && (
        <meta
          name="robots"
          content="noindex,nofollow"
        />
      )}

      {/* Open Graph */}
      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      <meta
        property="og:image"
        content={`${SITE_URL}${image}`}
      />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={`${SITE_URL}${image}`}
      />
    </Helmet>
  );
}