-- Journal scheduled publishing
-- Run this migration in the existing Supabase project before deploying the cron route.

alter table public.kz_cms_journal_posts
  drop constraint if exists kz_cms_journal_posts_status_check;

alter table public.kz_cms_journal_posts
  add column if not exists scheduled_at timestamptz;

alter table public.kz_cms_journal_posts
  add constraint kz_cms_journal_posts_status_check
  check (status in ('draft', 'scheduled', 'published'));

alter table public.kz_cms_journal_posts
  drop constraint if exists kz_cms_journal_posts_scheduled_at_check;

alter table public.kz_cms_journal_posts
  add constraint kz_cms_journal_posts_scheduled_at_check
  check (status <> 'scheduled' or scheduled_at is not null);

create index if not exists kz_cms_journal_posts_scheduled_at_idx
  on public.kz_cms_journal_posts (scheduled_at)
  where status = 'scheduled';

create table if not exists public.kz_cms_publish_runs (
  id uuid primary key default gen_random_uuid(),
  triggered_by text not null default 'cron',
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  published_count integer not null default 0,
  published_slugs text[] not null default '{}',
  error_message text
);

alter table public.kz_cms_publish_runs enable row level security;

create policy "kz_cms_publish_runs_admin_read" on public.kz_cms_publish_runs
  for select using (public.kz_cms_is_admin());
