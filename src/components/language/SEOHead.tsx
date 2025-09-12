"use client";

export default function SEOHead({ locale }: { locale: string }) {
  const baseUrl = "http://localhost:3000/"; // change to your real domain

  return (
    <>
      <meta
        name="description"
        content="Find jobs in Bangladesh and abroad. Search and apply for jobs online."
      />
      <link rel="alternate" href={`${baseUrl}/en`} hrefLang="en" />
      <link rel="alternate" href={`${baseUrl}/bn`} hrefLang="bn" />
      <link rel="alternate" href={baseUrl} hrefLang="x-default" />
    </>
  );
}
