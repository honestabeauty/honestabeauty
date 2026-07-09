-- Kang Zi Jian CMS (elsashop) — isolated table prefix: kz_cms_

create table if not exists public.kz_cms_site_settings (
  id text primary key default 'default',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.kz_cms_treatments (
  slug text primary key,
  name text not null,
  name_en text,
  tagline text not null default '',
  problems text[] not null default '{}',
  category text not null default '',
  price_type text not null default 'consult' check (price_type in ('fixed', 'consult')),
  price text,
  price_note text,
  image text,
  image_alt text,
  featured boolean not null default false,
  for_men boolean not null default false,
  sort_order int not null default 0,
  details jsonb not null default '{}'::jsonb,
  status text not null default 'published' check (status in ('draft', 'published')),
  updated_at timestamptz not null default now()
);

create table if not exists public.kz_cms_journal_posts (
  slug text primary key,
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  category text not null default '醫美知識',
  published_at date not null default current_date,
  image text,
  image_alt text,
  social_id text,
  slug_aliases text[] not null default '{}',
  status text not null default 'published' check (status in ('draft', 'published')),
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.kz_cms_faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  updated_at timestamptz not null default now()
);

create table if not exists public.kz_cms_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'editor' check (role in ('owner', 'editor')),
  created_at timestamptz not null default now()
);

create index if not exists kz_cms_journal_posts_status_idx
  on public.kz_cms_journal_posts (status, published_at desc);
create index if not exists kz_cms_treatments_status_idx
  on public.kz_cms_treatments (status, sort_order);
create index if not exists kz_cms_faqs_sort_idx
  on public.kz_cms_faqs (status, sort_order);

alter table public.kz_cms_site_settings enable row level security;
alter table public.kz_cms_treatments enable row level security;
alter table public.kz_cms_journal_posts enable row level security;
alter table public.kz_cms_faqs enable row level security;
alter table public.kz_cms_admins enable row level security;

create or replace function public.kz_cms_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.kz_cms_admins a
    where a.user_id = auth.uid()
  );
$$;

create policy "kz_cms_site_public_read" on public.kz_cms_site_settings
  for select using (true);
create policy "kz_cms_treatments_public_read" on public.kz_cms_treatments
  for select using (status = 'published' or public.kz_cms_is_admin());
create policy "kz_cms_journal_public_read" on public.kz_cms_journal_posts
  for select using (status = 'published' or public.kz_cms_is_admin());
create policy "kz_cms_faqs_public_read" on public.kz_cms_faqs
  for select using (status = 'published' or public.kz_cms_is_admin());

create policy "kz_cms_site_admin_write" on public.kz_cms_site_settings
  for all using (public.kz_cms_is_admin()) with check (public.kz_cms_is_admin());
create policy "kz_cms_treatments_admin_write" on public.kz_cms_treatments
  for all using (public.kz_cms_is_admin()) with check (public.kz_cms_is_admin());
create policy "kz_cms_journal_admin_write" on public.kz_cms_journal_posts
  for all using (public.kz_cms_is_admin()) with check (public.kz_cms_is_admin());
create policy "kz_cms_faqs_admin_write" on public.kz_cms_faqs
  for all using (public.kz_cms_is_admin()) with check (public.kz_cms_is_admin());

create policy "kz_cms_admins_self_read" on public.kz_cms_admins
  for select using (auth.uid() = user_id or public.kz_cms_is_admin());
create policy "kz_cms_admins_owner_manage" on public.kz_cms_admins
  for all using (
    exists (select 1 from public.kz_cms_admins o where o.user_id = auth.uid() and o.role = 'owner')
  ) with check (
    exists (select 1 from public.kz_cms_admins o where o.user_id = auth.uid() and o.role = 'owner')
  );

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('kz-cms', 'kz-cms', true, 10485760, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do nothing;

create policy "kz_cms_storage_public_read" on storage.objects
  for select using (bucket_id = 'kz-cms');
create policy "kz_cms_storage_admin_write" on storage.objects
  for all using (bucket_id = 'kz-cms' and public.kz_cms_is_admin())
  with check (bucket_id = 'kz-cms' and public.kz_cms_is_admin());


-- Phase 2: media library + shop videos

create table if not exists public.kz_cms_media (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  public_url text not null,
  filename text not null,
  alt text not null default '',
  folder text not null default 'general',
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

create table if not exists public.kz_cms_shop_videos (
  id integer primary key,
  title text not null,
  excerpt text not null default '',
  category text not null default '日常',
  duration_sec numeric not null default 0,
  poster text not null,
  src text not null,
  related_href text,
  sort_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  updated_at timestamptz not null default now()
);

create index if not exists kz_cms_media_folder_idx
  on public.kz_cms_media (folder, created_at desc);
create index if not exists kz_cms_shop_videos_status_idx
  on public.kz_cms_shop_videos (status, sort_order);

alter table public.kz_cms_media enable row level security;
alter table public.kz_cms_shop_videos enable row level security;

create policy "kz_cms_media_public_read" on public.kz_cms_media
  for select using (true);
create policy "kz_cms_media_admin_write" on public.kz_cms_media
  for all using (public.kz_cms_is_admin()) with check (public.kz_cms_is_admin());

create policy "kz_cms_shop_videos_public_read" on public.kz_cms_shop_videos
  for select using (status = 'published' or public.kz_cms_is_admin());
create policy "kz_cms_shop_videos_admin_write" on public.kz_cms_shop_videos
  for all using (public.kz_cms_is_admin()) with check (public.kz_cms_is_admin());


-- Reliable CMS admin check (bypasses RLS chicken-and-egg on kz_cms_admins)

create or replace function public.kz_cms_user_is_admin(target_user_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.kz_cms_admins a
    where a.user_id = target_user_id
  );
$$;

revoke all on function public.kz_cms_user_is_admin(uuid) from public;
grant execute on function public.kz_cms_user_is_admin(uuid) to authenticated;
grant execute on function public.kz_cms_user_is_admin(uuid) to service_role;
