import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { BookingCTA } from "@/components/BookingCTA";
import { EditorialImage } from "@/components/EditorialImage";
import { JsonLd } from "@/components/JsonLd";
import {
  getJournalBody,
  getJournalPosts,
  resolveJournalPost,
} from "@/lib/cms/queries";
import { site } from "@/data/site";
import { buildPageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getJournalPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveJournalPost(slug);
  if (!resolved) return { title: "文章" };
  return buildPageMetadata({
    title: resolved.post.title,
    description: resolved.post.excerpt,
    path: `/journal/${resolved.canonicalSlug}`,
    image: resolved.post.image,
    type: "article",
    publishedTime: resolved.post.date,
  });
}

export default async function JournalDetailPage({ params }: Props) {
  const { slug } = await params;
  const resolved = await resolveJournalPost(slug);
  if (!resolved) notFound();

  const { post, canonicalSlug } = resolved;
  const normalizedParam = (() => {
    try {
      return decodeURIComponent(slug).normalize("NFC");
    } catch {
      return slug.normalize("NFC");
    }
  })();

  if (normalizedParam !== canonicalSlug) {
    redirect(`/journal/${canonicalSlug}`);
  }

  const paragraphs = await getJournalBody(canonicalSlug);
  const siteUrl = getSiteUrl();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: {
            "@type": "Organization",
            name: site.name,
          },
          publisher: {
            "@type": "Organization",
            name: site.name,
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl}/brand/icon-512.png`,
            },
          },
          image: post.image ? `${siteUrl}${post.image}` : undefined,
          mainEntityOfPage: `${siteUrl}/journal/${canonicalSlug}`,
        }}
      />
      <article className="section-kz">
        <div className="container-kz max-w-2xl">
          <Link
            href="/journal"
            className="font-ui text-sm text-kz-rose-strong no-underline hover:underline"
          >
            ← 返回醫美知識
          </Link>
          {post.image && (
            <div className="mt-8">
              <EditorialImage
                src={post.image}
                alt={post.imageAlt ?? post.title}
                aspect="promo"
                posterSize="sm"
              />
            </div>
          )}
          <span className="mt-6 inline-block tag-kz">{post.category}</span>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-kz-plum">
            {post.title}
          </h1>
          <time className="mt-4 block font-ui text-xs text-kz-plum-muted">
            {post.date}
          </time>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-kz-plum-muted">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </div>
      </article>
      <BookingCTA />
    </>
  );
}
