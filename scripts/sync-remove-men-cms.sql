-- Sync: remove men's care from client CMS (nwywuatgkrmiibysbwkw)
-- Run in Supabase SQL Editor, or via service_role.

begin;

-- Soft-remove / hard-delete men treatments
delete from public.kz_cms_treatments
where slug in ('men-facial', 'men-laser')
   or category = '男賓護理'
   or for_men = true;

-- FAQ about men's services
delete from public.kz_cms_faqs
where question ilike '%男賓%'
   or answer ilike '%男賓護理%專區%';

-- Hero marquee: 男賓護理 → 痛症理療
update public.kz_cms_site_settings
set data = jsonb_set(
  jsonb_set(
    jsonb_set(
      coalesce(data, '{}'::jsonb),
      '{hero,navHref3}',
      '"/wellness"'::jsonb
    ),
    '{hero,navLabel3}',
    '"痛症理療"'::jsonb
  ),
  '{hero,navNum3}',
  '"03"'::jsonb
),
updated_at = now()
where id = 'default';

-- Home section men-care → women-care (if present as key)
update public.kz_cms_site_settings
set data = (
  case
    when data ? 'homeSections' then
      jsonb_set(
        data,
        '{homeSections}',
        (
          select coalesce(jsonb_agg(
            case
              when elem->>'id' = 'men-care' then
                jsonb_set(elem, '{id}', '"women-care"'::jsonb)
              else elem
            end
          ), '[]'::jsonb)
          from jsonb_array_elements(coalesce(data->'homeSections', '[]'::jsonb)) elem
        )
      )
    else data
  end
),
updated_at = now()
where id = 'default';

commit;

-- Verify
select slug, name, category, for_men, status
from public.kz_cms_treatments
order by sort_order, slug;

select data->'hero'->>'navHref3' as nav_href3,
       data->'hero'->>'navLabel3' as nav_label3
from public.kz_cms_site_settings
where id = 'default';
