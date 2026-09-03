import { useEffect } from "react";

/**
 * SEOHead - Zero-dependency dynamic meta tag, OpenGraph, Twitter, canonical, and Schema.org injector.
 * Tailored for localized SEO in Islamabad, Pakistan.
 */
export default function SEOHead({
  title = "Vital Physio Hub | Best Physical Therapy & Rehabilitation Clinic in Islamabad",
  description = "Vital Physio Hub offers premier physical therapy, sports rehabilitation, neurological recovery, and back pain treatments in Islamabad (Blue Area, F-8, DHA Phase 2). Book expert physiotherapists today.",
  keywords = "physical therapy clinic Islamabad, best physiotherapist in Islamabad, physical therapy Islamabad, stroke rehab Islamabad, sports injury physiotherapy Islamabad, back pain treatment Islamabad, vital physio hub Pakistan",
  canonicalUrl = "https://physiohub.com/",
  ogImage = "https://physiohub.com/og-image.jpg",
  ogType = "website",
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  schemaData = null,
}) {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // Helper to update or create <meta>
    const updateMetaTag = (selector, nameAttr, nameValue, contentValue) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(nameAttr, nameValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentValue);
    };

    // 2. Primary Meta Tags
    updateMetaTag('meta[name="description"]', "name", "description", description);
    updateMetaTag('meta[name="keywords"]', "name", "keywords", keywords);
    updateMetaTag('meta[name="robots"]', "name", "robots", robots);
    updateMetaTag('meta[name="author"]', "name", "author", "Vital Physio Hub Medical Team");

    // Geo-targeting Meta Tags for Islamabad, Pakistan
    updateMetaTag('meta[name="geo.region"]', "name", "geo.region", "PK-IS");
    updateMetaTag('meta[name="geo.placename"]', "name", "geo.placename", "Islamabad, Pakistan");
    updateMetaTag('meta[name="geo.position"]', "name", "geo.position", "33.7217;73.0551");
    updateMetaTag('meta[name="ICBM"]', "name", "ICBM", "33.7217, 73.0551");

    // 3. Open Graph Tags
    updateMetaTag('meta[property="og:title"]', "property", "og:title", title);
    updateMetaTag('meta[property="og:description"]', "property", "og:description", description);
    updateMetaTag('meta[property="og:image"]', "property", "og:image", ogImage);
    updateMetaTag('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    updateMetaTag('meta[property="og:type"]', "property", "og:type", ogType);
    updateMetaTag('meta[property="og:site_name"]', "property", "og:site_name", "Vital Physio Hub");
    updateMetaTag('meta[property="og:locale"]', "property", "og:locale", "en_PK");

    // 4. Twitter Card Tags
    updateMetaTag('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    updateMetaTag('meta[name="twitter:title"]', "name", "twitter:title", title);
    updateMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description);
    updateMetaTag('meta[name="twitter:image"]', "name", "twitter:image", ogImage);
    updateMetaTag('meta[name="twitter:site"]', "name", "twitter:site", "@physiohub_pk");

    // 5. Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 6. Schema.org Structured Data
    let schemaScript = document.getElementById("json-ld-schema");
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = "json-ld-schema";
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }

    const defaultSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MedicalClinic",
          "@id": "https://physiohub.com/#clinic",
          "name": "Vital Physio Hub Physical Therapy & Rehabilitation Clinic",
          "url": "https://physiohub.com",
          "logo": "https://physiohub.com/favicon.svg",
          "image": "https://physiohub.com/heroimage.jpg",
          "description": "Premier physical therapy, sports injury rehabilitation, pediatric physio, and neurological recovery center located in Islamabad, Pakistan.",
          "telePhone": "+923008786187",
          "priceRange": "$$",
          "medicalSpecialty": [
            "Physiotherapy",
            "PhysicalTherapy",
            "SportsMedicine",
            "NeurologicalRehabilitation",
            "PediatricRehabilitation",
            "OrthopedicRehabilitation"
          ],
          "address": [
            {
              "@type": "PostalAddress",
              "streetAddress": "2nd Floor Allegiance Tower, New Blue Area",
              "addressLocality": "Islamabad",
              "addressRegion": "ICT",
              "postalCode": "44000",
              "addressCountry": "PK"
            },
           
          ],
          "geo": [
            {
              "@type": "GeoCoordinates",
              "latitude": 33.7217,
              "longitude": 73.0551
            }
          ],
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ],
              "opens": "09:00",
              "closes": "21:00"
            }
          ],
          "sameAs": [
            "https://facebook.com/physiohub.pk",
            "https://instagram.com/physiohub.pk",
            "https://linkedin.com/company/physiohub"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://physiohub.com/#website",
          "url": "https://physiohub.com/",
          "name": "Vital Physio Hub",
          "description": "Advanced Physical Therapy & Rehabilitation Ecosystem in Islamabad",
          "publisher": {
            "@id": "https://physiohub.com/#clinic"
          },
          "inLanguage": "en-PK"
        }
      ]
    };

    schemaScript.textContent = JSON.stringify(schemaData || defaultSchema);

  }, [title, description, keywords, canonicalUrl, ogImage, ogType, robots, schemaData]);

  return null;
}
