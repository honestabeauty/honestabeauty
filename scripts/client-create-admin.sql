-- A) 建立 CMS owner
insert into public.kz_cms_admins (user_id, email, role)
values (
  '390d3c01-eb8a-40f2-b0d9-340359ec1bb4'::uuid,
  'Elsa.cheung@genstudents.org',
  'owner'
)
on conflict (user_id) do update
set email = excluded.email,
    role = excluded.role;

-- B) 修正 kz_cms_admins RLS 遞迴
create or replace function public.kz_cms_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.kz_cms_user_is_admin(auth.uid());
$$;

drop policy if exists "kz_cms_admins_self_read" on public.kz_cms_admins;
drop policy if exists "kz_cms_admins_owner_manage" on public.kz_cms_admins;

create policy "kz_cms_admins_self_read" on public.kz_cms_admins
  for select using (
    auth.uid() = user_id or public.kz_cms_user_is_admin(auth.uid())
  );

create policy "kz_cms_admins_owner_manage" on public.kz_cms_admins
  for all using (
    public.kz_cms_user_is_admin(auth.uid())
  ) with check (
    public.kz_cms_user_is_admin(auth.uid())
  );