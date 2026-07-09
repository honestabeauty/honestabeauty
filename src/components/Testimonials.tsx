import { getTestimonials } from "@/lib/cms/site-content";

export async function Testimonials({ embedded = false }: { embedded?: boolean }) {
  const testimonials = await getTestimonials();

  const content = (
    <div className="moana-voices">
      {testimonials.map((t, i) => (
        <blockquote
          key={t.id}
          className={`moana-voice ${i % 2 === 1 ? "moana-voice--offset" : ""}`}
          style={{ ["--voice-index" as string]: i }}
        >
          <p className="moana-voice__index font-ui" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </p>
          <p className="moana-voice__text">「{t.quote}」</p>
          <footer className="moana-voice__footer font-ui">
            <cite className="moana-voice__author">{t.author}</cite>
            <span className="moana-voice__meta">{t.meta}</span>
          </footer>
        </blockquote>
      ))}
    </div>
  );

  if (embedded) {
    return (
      <section className="moana-home__chapter moana-home__wide--bordered moana-home__voices">
        <p className="moana-section-label">
          <span className="moana-section-label__rule" aria-hidden />
          Voices
        </p>
        <h2 className="moana-home__section-title">客人分享</h2>
        {content}
      </section>
    );
  }

  return (
    <section className="section-editorial">
      <div className="container-kz">{content}</div>
    </section>
  );
}
