import type { AdminListRow } from "@/app/admin/components/AdminListTable";

export function buildSearchText(parts: (string | null | undefined)[]) {
  return parts
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function journalToListRows(
  posts: {
    slug: string;
    title: string;
    category: string | null;
    status: string;
    published_at?: string | null;
    scheduled_at?: string | null;
  }[],
): AdminListRow[] {
  return posts.map((post) => ({
    id: post.slug,
    category: post.category,
    status:
      post.status === "draft"
        ? "draft"
        : post.status === "scheduled"
          ? "scheduled"
          : "published",
    editHref: `/admin/journal/${post.slug}`,
    previewHref: `/journal/${post.slug}`,
    searchText: buildSearchText([
      post.title,
      post.category,
      post.slug,
      post.published_at,
      post.scheduled_at,
    ]),
    sortValues: {
      title: post.title,
      category: post.category ?? "",
      date: post.scheduled_at ?? post.published_at ?? "",
    },
    values: {
      title: post.title,
      category: post.category ?? "—",
      date: post.scheduled_at ? `預定 ${post.scheduled_at}` : post.published_at ?? "—",
      status: post.status,
    },
  }));
}

export function treatmentsToListRows(
  items: {
    slug: string;
    name: string;
    category: string | null;
    price_type: string;
    price: string | null;
    status: string;
    featured?: boolean | null;
  }[],
): AdminListRow[] {
  return items.map((item) => {
    const price = item.price_type === "fixed" ? item.price ?? "—" : "諮詢報價";
    const name = item.featured ? `${item.name} · 精選` : item.name;
    const priceNum =
      item.price_type === "fixed"
        ? Number(String(item.price).replace(/[^\d.]/g, "")) || 0
        : -1;
    return {
      id: item.slug,
      category: item.category,
      status: item.status === "draft" ? "draft" : "published",
      editHref: `/admin/treatments/${item.slug}`,
      previewHref: `/treatments/${item.slug}`,
      searchText: buildSearchText([item.name, item.category, item.slug, price]),
      sortValues: {
        name: item.name,
        category: item.category ?? "",
        price: priceNum,
      },
      values: {
        name,
        category: item.category ?? "—",
        price,
        status: item.status,
      },
    };
  });
}

export function videosToListRows(
  videos: {
    id: number;
    title: string;
    category: string;
    status: string;
    sort_order?: number;
  }[],
): AdminListRow[] {
  return videos.map((video) => ({
    id: String(video.id),
    category: video.category,
    status: video.status === "draft" ? "draft" : "published",
    editHref: `/admin/videos/${video.id}`,
    previewHref: "/#shop-videos-title",
    deleteId: String(video.id),
    deleteLabel: `確定刪除「${video.title}」？`,
    searchText: buildSearchText([video.title, video.category, String(video.id)]),
    sortValues: {
      id: video.id,
      title: video.title,
      category: video.category,
    },
    values: {
      id: String(video.id),
      title: video.title,
      category: video.category,
      status: video.status,
    },
  }));
}

export function faqToListRows(
  items: {
    id: number;
    question: string;
    sort_order: number;
    status: string;
  }[],
): AdminListRow[] {
  return items.map((item) => ({
    id: String(item.id),
    status: item.status === "draft" ? "draft" : "published",
    editHref: `/admin/faq/${item.id}`,
    previewHref: "/faq",
    searchText: buildSearchText([item.question, String(item.sort_order)]),
    sortValues: {
      order: item.sort_order,
      question: item.question,
    },
    values: {
      order: String(item.sort_order),
      question: item.question,
      status: item.status,
    },
  }));
}
