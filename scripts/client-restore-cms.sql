-- CMS restore for honestabeauty
-- Remapped storage URLs to https://nwywuatgkrmiibysbwkw.supabase.co

begin;

-- kz_cms_site_settings (1)
insert into public.kz_cms_site_settings (id, data, updated_at) values ('default', '{"hero":{"image":"/images/promo/hero-welcome-editorial-v2.png","kicker":"HONG CHI KIN · Bespoke Skincare","slides":[{"image":"/images/promo/hero-welcome-editorial-v2.png","imageAlt":"康姿健歡迎你的蒞臨 — 屯門美容 · 皮膚管理 · 痛症理療"}],"navNum1":"01","navNum2":"02","navNum3":"03","navNum4":"04","imageAlt":"康姿健歡迎你的蒞臨 — 屯門美容 · 皮膚管理 · 痛症理療","navHref1":"/treatments","navHref2":"/skin-analysis","navHref3":"/men","navHref4":"/journal","navLabel1":"療程目錄","navLabel2":"量膚定制","navLabel3":"男賓護理","navLabel4":"醫美知識","watermark":"SKIN","credBadge1":"award","credBadge2":"device","credBadge3":"award","credLabel1":"IBDR 2025 金獎","credLabel2":"ITEC LV4 激光","credLabel3":"姊妹美容優秀","sellLabel1":"單次收費","sellLabel2":"絕無硬銷","sellLabel3":"醫美級儀器","titleLine1":"量膚","titleLine2":"定制","titleLine3":"更安心","taglineAria":"Your Skin is Your Best Accessory","railTagline1":"西班牙果酸","railTagline2":"IBDR 金獎","railTagline3":"屯門地舖","whatsappLabel":"WhatsApp 預約量膚","instagramLabel":"Instagram DM","taglineLine1Em":"Skin","secondaryLinkHref":"/skin-analysis","secondaryLinkLabel":"了解量膚流程","taglineLine1Script":"is Your","taglineLine2Accent":"Accessory","taglineLine1Whisper":"Your","taglineLine2Primary":"Best"},"hours":"每日 09:00 – 21:00","phone":"9770 9300","address":"屯門紅橋菁菱徑9號華利大廈12號（地舖）","threads":"https://www.threads.com/@hong_chi_kin","facebook":"https://www.facebook.com/profile.php?id=100066932628186","phoneTel":"85297709300","subtitle":"屯門美容 · 皮膚管理 · 痛症理療","instagram":"https://www.instagram.com/hong_chi_kin","description":"屯門溫馨美容一人工作室。皮膚管理、痛症理療、激光祛斑、膠原提升、等離子淨痘、退背。先量膚再建議，單次收費，唔綁套票。","xiaohongshu":"https://xhslink.com/m/7zoVvFMANdv"}'::jsonb, '2026-06-25T18:19:55.515+00:00')
on conflict do nothing;

-- kz_cms_treatments (11)
insert into public.kz_cms_treatments (slug, name, name_en, tagline, problems, category, price_type, price, price_note, image, image_alt, featured, for_men, sort_order, details, status, updated_at) values ('plaser-rf', 'PLASER 隔空離子熱能射頻再生儀', NULL, '德國 Flyzer 專利，等離子 + 射頻，殺菌、提亮、緊緻一齊做。', ARRAY['鬆弛','暗沉','毛孔']::text[], '射頻緊緻', 'consult', NULL, '諮詢報價 · 單次收費', '/images/promo/collazen-atoz.png', 'Air Plaser 等離子', true, false, 1, '{"features":["德國 Flyzer 專利等離子 + 射頻雙技術","隔空操作，減少表皮刺激","殺菌、美白、緊緻多效合一","非侵入式，恢復期短"],"aftercare":["24 小時內避免化妝與高溫環境","加強保濕防曬，暫停刺激性護膚品"],"suitableFor":"毛孔粗大、暗沉蠟黃、輕度鬆弛、反覆粉刺等。適合想同時改善膚質與緊緻度的客人。","processSteps":["清潔與膚況評估，調校儀器參數","分區進行等離子射頻護理","冰導或修復精華鎮靜收尾"]}'::jsonb, 'published', '2026-06-16T10:10:46.80421+00:00')
on conflict do nothing;
insert into public.kz_cms_treatments (slug, name, name_en, tagline, problems, category, price_type, price, price_note, image, image_alt, featured, for_men, sort_order, details, status, updated_at) values ('plasma-acne', '等離子抗痘煥膚療程', NULL, '抗炎控油、收細毛孔，針對暗瘡肌、油脂粒、毛囊炎。', ARRAY['暗瘡','油脂粒','毛孔']::text[], '等離子', 'fixed', '$680', '單次（可加 $300 Bioskin 精華）', '/images/promo/plasma-acne.png', '寒流襲港 · 爆拆護膚提示', true, false, 3, '{"features":["等離子技術抗炎控油、收細毛孔","針對暗瘡菌與過剩油脂","可加配 Bioskin 精華 ($300)","明碼單次 $680"],"aftercare":["避免用手擠壓痘痘","使用清爽保濕，避免厚重油分"],"suitableFor":"暗瘡肌、油脂粒、毛囊炎、毛孔粗大。想控油抗炎又唔想太刺激嘅客人。","processSteps":["深層清潔與粉刺清理（視膚況）","等離子抗痘模式分區護理","鎮靜修復與控油建議"]}'::jsonb, 'published', '2026-06-16T10:10:46.80421+00:00')
on conflict do nothing;
insert into public.kz_cms_treatments (slug, name, name_en, tagline, problems, category, price_type, price, price_note, image, image_alt, featured, for_men, sort_order, details, status, updated_at) values ('plasma-peel', '等離子煥膚療程', NULL, '溫和更新角質、改善粗糙乾紋，熟齡肌同敏感肌都適合。', ARRAY['敏感','乾燥','熟齡']::text[], '等離子', 'consult', NULL, '諮詢報價 · 單次收費', '/images/promo/plasma-peel.png', '藍光煥膚黑科技', false, false, 4, '{"features":["等離子溫和煥膚，熟齡肌與敏感肌皆可循序進行","改善粗糙觸感與細紋","配合修復步驟，減少泛紅","單次收費，量膚後建議療程間隔"],"aftercare":["加強保濕防曬","暫停家用酸類產品"],"suitableFor":"敏感肌、乾燥粗糙、熟齡乾紋、膚色不均。想溫和更新角質又不想太刺激。","processSteps":["清潔與膚況評估","等離子煥膚模式操作","修復精華與防曬提醒"]}'::jsonb, 'published', '2026-06-16T10:10:46.80421+00:00')
on conflict do nothing;
insert into public.kz_cms_treatments (slug, name, name_en, tagline, problems, category, price_type, price, price_note, image, image_alt, featured, for_men, sort_order, details, status, updated_at) values ('collazen', 'COLLAZEN 膠原美肌小旋風', NULL, '5 合 1 綜合護理：清潔、補濕、HIFU 拉提、RF 膠原、Cryo 修復。', ARRAY['鬆弛','暗沉','乾燥']::text[], '綜合儀器', 'consult', NULL, '諮詢報價 · 單次收費', '/images/promo/collazen-5in1.png', 'COLLAZEN 膠原美肌小旋風 5合1', true, false, 5, '{"features":["COLLAZEN Tornado 五合一：清潔、補濕、HIFU、RF、Cryo","一機多效，流程緊湊","針對輪廓與膠原流失","可按膚況調整探頭組合"],"aftercare":["療程後加強保濕","避免即日高溫桑拿或激烈運動"],"suitableFor":"鬆弛下垂、暗沉缺水、想一次過完成清潔、補濕、拉提、膠原、冷卻修復的客人。","processSteps":["卸妝清潔與膚況分析","依序使用多探頭進行綜合護理","Cryo 冷卻修復收尾"]}'::jsonb, 'published', '2026-06-16T10:10:46.80421+00:00')
on conflict do nothing;
insert into public.kz_cms_treatments (slug, name, name_en, tagline, problems, category, price_type, price, price_note, image, image_alt, featured, for_men, sort_order, details, status, updated_at) values ('hifu', 'HIFU 緊緻拉提', NULL, '非侵入式超聲波拉提，針對輪廓鬆弛、法令紋。', ARRAY['鬆弛','初老']::text[], 'HIFU', 'consult', NULL, '諮詢報價 · 單次收費', '/images/promo/collazen-5in1.png', '3-Way HIFU 逆齡 V 面', false, false, 6, '{"notes":["孕婦、金屬植入物或嚴重皮膚病請先告知"],"features":["高能聚焦超聲波直達 SMAS 層","刺激膠原收緊，無開刀恢復期","針對面部輪廓線條","效果循序顯現，建議量膚後規劃"],"aftercare":["少數人可能有輕微紅腫，一般數小時內消退","加強防曬與保濕"],"suitableFor":"輪廓鬆弛、法令紋、下顎線模糊、初老下垂。想非侵入式拉提的客人。","processSteps":["清潔與標定拉提區域","HIFU 探頭分層操作","修復鎮靜與居家護理建議"]}'::jsonb, 'published', '2026-06-16T10:10:46.80421+00:00')
on conflict do nothing;
insert into public.kz_cms_treatments (slug, name, name_en, tagline, problems, category, price_type, price, price_note, image, image_alt, featured, for_men, sort_order, details, status, updated_at) values ('laser-spot', '激光祛斑嫩膚', NULL, '針對色斑、膚色不均，改善整體透亮感。', ARRAY['色斑','暗沉']::text[], '激光', 'consult', NULL, '諮詢報價 · 單次收費', '/images/promo/air-plaser.png', 'Ruikd Genelux Lite 納秒激光', false, false, 7, '{"notes":["近期嚴重曬傷或服用感光藥物請先告知"],"features":["Genelux Lite 等醫療級激光設備","針對色素沉澱分層處理","改善整體透亮感","療程前需評估膚色與色斑類型"],"aftercare":["療程後嚴格防曬，避免紫外線","結痂期勿自行剝落"],"suitableFor":"色斑、曬斑、膚色不均、暗沉。持有 ITEC LV4 激光資歷，可安全操作醫療級激光。","processSteps":["量膚分析與色斑評估","清潔後進行激光嫩膚 / 祛斑","修復面膜與嚴格防曬提醒"]}'::jsonb, 'published', '2026-06-16T10:10:46.80421+00:00')
on conflict do nothing;
insert into public.kz_cms_treatments (slug, name, name_en, tagline, problems, category, price_type, price, price_note, image, image_alt, featured, for_men, sort_order, details, status, updated_at) values ('tegoder-peel', '西班牙 TEGODER 量膚定制果酸療程', NULL, '4 款專屬果酸配方，針對油性、敏感、暗沉、熟齡肌，量膚之後對症建議。', ARRAY['暗沉','敏感','熟齡','油性']::text[], '果酸煥膚', 'consult', NULL, '量膚分析後報價 · 單次收費', '/images/promo/tegoder-peel.png', 'TEGODER 量膚定制果酸', true, false, 0, '{"notes":["孕婦、活躍性疱疹或嚴重濕疹請先告知"],"features":["西班牙 TEGODER 醫學級果酸，4 款配方量膚後建議","量膚定制濃度與停留時間，敏感肌亦可循序進行","改善角質代謝、提亮膚色、疏通毛孔","單次收費，不綁套票"],"aftercare":["療程後 3–7 日加強防曬，避免高溫桑拿","暫停家用酸類與磨砂產品，按建議使用修復產品"],"suitableFor":"油性暗瘡、敏感泛紅、暗沉蠟黃、熟齡鬆弛等膚況。首次建議先量膚分析，再選擇專屬果酸配方。","processSteps":["卸妝清潔與 TEGODER 量膚分析","依膚況選擇果酸配方並進行煥膚","中和、鎮靜修復與防曬提醒"]}'::jsonb, 'published', '2026-06-16T10:10:46.80421+00:00')
on conflict do nothing;
insert into public.kz_cms_treatments (slug, name, name_en, tagline, problems, category, price_type, price, price_note, image, image_alt, featured, for_men, sort_order, details, status, updated_at) values ('microneedle-rf', '微針射頻膠原修復療程', NULL, 'Mesoestetic m.pen 智能微針，垂直進針更精準，收毛孔去凹凸洞。', ARRAY['毛孔','凹凸洞','初老']::text[], '微針射頻', 'fixed', '$880', '單次（可加 $300 Bioskin 精華）', '/images/promo/collazen-triple.png', 'm.pen 微針煥膚', true, false, 2, '{"notes":["活躍性暗瘡發炎期需先評估"],"features":["Mesoestetic m.pen 智能微針，垂直進針更精準","射頻能量直達真皮，收毛孔、撫平凹凸","可加配 Bioskin 精華加強修復","明碼單次 $880"],"aftercare":["24–48 小時避免沾水、化妝與運動出汗","嚴格防曬，使用建議修復產品"],"suitableFor":"毛孔粗大、凹凸洞、痘疤、初老鬆弛。希望以微針射頻促進膠原再生的客人。","processSteps":["清潔消毒，敷舒緩膏（視需要）","m.pen 微針射頻分區操作","修復面膜與居家護理建議"]}'::jsonb, 'published', '2026-06-16T10:10:46.80421+00:00')
on conflict do nothing;
insert into public.kz_cms_treatments (slug, name, name_en, tagline, problems, category, price_type, price, price_note, image, image_alt, featured, for_men, sort_order, details, status, updated_at) values ('exosome', '外泌體細胞修復', NULL, '深層細胞修復，改善膚質、促進膠原再生。', ARRAY['初老','暗沉','敏感']::text[], '細胞修復', 'consult', NULL, '諮詢報價 · 單次收費', '/images/promo/exosome.png', 'BSK9 EXOSOMES 爆髮療程', false, false, 8, '{"features":["外泌體成分促進細胞溝通與修復","改善整體膚質與光澤","可配合其他儀器加強滲透","適合術後或倦肌急救"],"aftercare":["加強保濕","避免即日刺激性護膚"],"suitableFor":"初老、暗沉、敏感修復、膚質粗糙。想從細胞層面促進修復與再生。","processSteps":["清潔與膚況評估","外泌體導入（可配合微針或電導）","修復鎮靜收尾"]}'::jsonb, 'published', '2026-06-16T10:10:46.80421+00:00')
on conflict do nothing;
insert into public.kz_cms_treatments (slug, name, name_en, tagline, problems, category, price_type, price, price_note, image, image_alt, featured, for_men, sort_order, details, status, updated_at) values ('men-laser', '男賓激光護理', NULL, '激光脫墨、脫疣、嫩膚等，獨立男賓私密空間。', ARRAY['色斑','脫疣']::text[], '男賓護理', 'consult', NULL, '諮詢報價 · 單次收費', 'https://nwywuatgkrmiibysbwkw.supabase.co/storage/v1/object/public/kz-cms/treatments/1781611588699-man-2.png', '男賓激光護理', true, true, 10, '{"features":["男賓專屬空間，私隱度高","ITEC LV4 激光專業操作","脫墨、脫疣、嫩膚等按需求評估","單次收費，先諮詢後建議"],"aftercare":[],"suitableFor":"男士色斑、脫墨、脫疣、膚色不均。想在私密環境進行激光護理的男賓。","processSteps":[]}'::jsonb, 'published', '2026-06-16T12:06:41.411+00:00')
on conflict do nothing;
insert into public.kz_cms_treatments (slug, name, name_en, tagline, problems, category, price_type, price, price_note, image, image_alt, featured, for_men, sort_order, details, status, updated_at) values ('men-facial', '男賓深層清潔護理', NULL, '針清、深層清潔，改善毛孔堵塞與油脂問題。', ARRAY['暗瘡','毛孔','油脂']::text[], '男賓護理', 'consult', NULL, '諮詢報價 · 單次收費', 'https://nwywuatgkrmiibysbwkw.supabase.co/storage/v1/object/public/kz-cms/treatments/1781610989128-man-1.png', '男賓深層清潔護理', true, true, 9, '{"features":["獨立男賓護理空間","針清 + 深層清潔，改善堵塞","單次收費，量膚後建議","可配合激光等進階護理"],"aftercare":[],"suitableFor":"男士毛孔堵塞、黑頭粉刺、油脂旺盛、背痘延伸面部問題。需要私密舒適環境的男賓。","processSteps":[]}'::jsonb, 'published', '2026-06-16T11:56:45.565+00:00')
on conflict do nothing;

-- kz_cms_journal_posts (55)
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2511-r2', '小知識', '皮膚敏感、泛紅係皮膚薄弱？醫學煥膚點樣處理？', '皮膚敏感、泛紅係皮膚薄弱？醫學煥膚點樣處理？', '護膚知識', '2025-11-15', '/images/social/2511-小知識.webp', '小知識', '2511-小知識', ARRAY['2511-小知識']::text[], 'published', 36, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2511-r3', '產品介紹', '產品介紹', '等離子微針射頻', '儀器療程', '2025-11-15', '/images/social/2511-產品介紹.webp', '產品介紹', '2511-產品介紹', ARRAY['2511-產品介紹']::text[], 'published', 37, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2511-r4', '品牌形象', '收費清楚透明，做你信得過的facial。', '收費清楚透明，做你信得過的facial。', '醫美知識', '2025-11-15', '/images/social/2511-品牌形象.webp', '品牌形象', '2511-品牌形象', ARRAY['2511-品牌形象']::text[], 'published', 38, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2511-r5', '優惠', '優惠', '介紹朋友', '醫美知識', '2025-11-15', '/images/social/2511-優惠.webp', '優惠', '2511-優惠', ARRAY['2511-優惠']::text[], 'published', 39, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2510-r2', 'PLASER 隔空離子熱能針射頻再生儀', 'PLASER 離子射頻再生儀  膠原再生抗痘煥膚 2合1', 'PLASER 離子射頻再生儀 🔬【 膠原再生＋抗痘煥膚 】2合1
一個儀器結合兩大尖端技術，真真正正全方位解決肌膚問題 💕  適合任何膚質人士！無論抗老、修復、滅痘通通都可以 ✨
🔹 等離子護理 PLASER AIR｜透過離子能量淨化殺菌、收緊毛孔、提亮膚色 
🔹 微針射頻 PLASER RF｜刺激真皮層膠原再生，提升修復力，肌膚回復年輕有彈性

✨ 從表皮到肌底，全層修復肌膚狀態 ✨
無創、無痛、高效～ 真正做到「見得見、摸得出」嘅效果！', '儀器療程', '2025-10-15', '/images/social/2510-PLASER-隔空離子熱能針射頻再生儀.webp', 'PLASER 隔空離子熱能針射頻再生儀', '2510-PLASER-隔空離子熱能針射頻再生儀', ARRAY['2510-PLASER-隔空離子熱能針射頻再生儀']::text[], 'published', 40, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2510-r4', '等離子抗痘煥膚療程', '等離子科技  抗痘煥膚肌膚重生回復細緻透亮', '【💥等離子科技 × 抗痘煥膚】肌膚重生回復細緻透亮✨

利用離子能量破壞細菌結構、抗菌抗炎、調理油脂分泌、同時改善毛孔粗大！
🎯 適合：暗瘡肌、油脂分泌旺盛、毛孔粗大、粉刺或毛囊炎

【等離子抗痘煥膚】療程｜只需$680
＋＄300 升級 Bioskin 精華💧
⭐️ 挑選專屬你膚質嘅配搭！對症下藥，功效倍增 ⭐️
➤ BSK8 抗菌修復｜鎮靜舒緩，爆瘡炎症、術後修復都適用
➤ BSK29 維他命激活｜即時提亮膚色，激活肌底重生
➤ BSK14 煥白精華｜改善色斑＆即時提亮回復光澤
➤ BSK7 提亮精華｜高效穀胱甘肽，想要光感透亮肌
❌ 無香精・無酒精・無刺激・敏感肌都安心使用', '儀器療程', '2025-10-15', '/images/social/2510-等離子抗痘煥膚療程.webp', '等離子抗痘煥膚療程', '2510-等離子抗痘煥膚療程', ARRAY['2510-等離子抗痘煥膚療程']::text[], 'published', 42, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2510-r5', 'Bioskin 品牌及產品', ' Bioskin 7 大精華搵出專屬你膚質嘅配搭！', '【 Bioskin 7️⃣ 大精華💧搵出專屬你膚質嘅配搭！】

Bioskin 係來自歐洲的「醫美級護膚品牌」！採用獨家醫學級專利成份，加上最頂級嘅用料，全方位改善肌膚問題！配合埋儀器導入，滲透力提升5️⃣ 倍！每滴精華直接滲透到肌底，保證效果最靚最有效 💕

〔  7️⃣ 大精華 〕搵出專屬你膚質嘅配搭 ✨ 
 ➤ BSK36 膠原賦活精華｜抗老補水、適合乾肌、鬆弛肌
 ➤ BSK3 抗皺精華｜放鬆動態紋、皺紋、頸紋
 ➤ BSK6 修復精華｜膠原重生，針對痘疤、初老肌
 ➤ BSK8 抗菌修復｜鎮靜舒緩，爆瘡炎症、術後修復都適用
 ➤ BSK29 維他命激活｜即時提亮膚色，激活肌底重生
 ➤ BSK14 煥白精華｜改善色斑＆即時提亮回復光澤
 ➤ BSK7 提亮精華｜高效穀胱甘肽，想要光感透亮肌
❌ 無香精・無酒精・無刺激・敏感肌都安心使用 🫶🏻', '護膚知識', '2025-10-15', '/images/social/2510-Bioskin-品牌及產品.webp', 'Bioskin 品牌及產品', '2510-Bioskin-品牌及產品', ARRAY['2510-Bioskin-品牌及產品']::text[], 'published', 43, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2508-09-r2', '品牌形象', '品牌形象', '效果至上，不硬銷', '醫美知識', '2026-01-15', '/images/social/2508-09-品牌形象.webp', '品牌形象', '2508-09-品牌形象', ARRAY['2508-09-品牌形象']::text[], 'published', 44, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2508-09-r3', '產品介紹', '產品介紹', '人手facial', '醫美知識', '2026-01-15', '/images/social/2508-09-產品介紹.webp', '產品介紹', '2508-09-產品介紹', ARRAY['2508-09-產品介紹']::text[], 'published', 45, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2508-09-r12', '產品介紹', '產品介紹', '等離子煥膚', '儀器療程', '2026-01-15', '/images/social/2508-09-產品介紹-3.webp', '產品介紹', '2508-09-產品介紹-3', ARRAY['2508-09-產品介紹-3']::text[], 'published', 54, '2026-06-16T10:15:56.048475+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2603-r6', '【養生排毒篇】唔止流汗咁簡單！ 坐住瘦？訓住排毒？原來流汗都有分等級！', '覺得身體好重、個人好攰，訓極都唔夠精神？ 這可能是「濕氣」和「毒素」積聚的警號！香港人常飲凍飲又長期吹冷氣，汗出唔到，毒素自然困住係身體裡面。', '覺得身體好重、個人好攰，訓極都唔夠精神？🥱 這可能是「濕氣」和「毒素」積聚的警號！香港人常飲凍飲又長期吹冷氣，汗出唔到，毒素自然困住係身體裡面。🌧️

康姿健用 Dr. Rainbow 醫療級遠紅外線焗倉，排嘅係身體累積嘅廢物！

🔥 真正「醫療級」遠紅外線 被稱為「生命之光」，可以產生 4-14微米的遠紅外線，深入皮下組織 50mm (5cm)，引發微血管擴張同細胞共振！ 唔係淨係熱表面，而係由內暖到外。

✨ 做一次焗倉幫你： ✅ 深層排毒： 透過深層排汗，排出積存嘅重金屬、化妝品殘留物同體內毒素。 ✅ 祛濕去腫： 改善香港人最常見嘅濕重問題，減輕身體沉重感。 ✅ 美肌亮白： 排毒後氣色會變到紅潤透亮，連護膚品都吸收得好啲。

🛡️ 信心保證： 獲 KFDA、美國 FDA、CE 等多國專利認證，安全高效。
只需 30 分鐘，就可以幫身體做個大掃除！🧹 做完 Facial 再焗一焗，效果 Double Up！

#康姿健 #DrRainbow #遠紅外線 #排毒 #去水腫 #懶人運動 #屯門美容 #養生 #KFDA認證 #祛濕', '養生排毒', '2026-03-15', '/images/social/2603-養生排毒篇-唔止流汗咁簡單-坐住瘦-訓住排毒-原來流汗都有分等級.webp', '【養生排毒篇】唔止流汗咁簡單！ 坐住瘦？訓住排毒？原來流汗都有分等級！', '2603-養生排毒篇-唔止流汗咁簡單-坐住瘦-訓住排毒-原來流汗都有分等級', ARRAY['2603-養生排毒篇-唔止流汗咁簡單-坐住瘦-訓住排毒-原來流汗都有分等級']::text[], 'published', 19, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2603-r7', '【素顏發光篇】自帶天然胭脂！唔洗化妝都面色紅潤？原來係靠「生命之光」', '有無發現，平時就算訓夠覺，面色都係暗暗沉沉，無咩精神？ 其實係面部氣血循環唔夠好！', '有無發現，平時就算訓夠覺，面色都係暗暗沉沉，無咩精神？😩 其實係面部氣血循環唔夠好！
康姿健推介 🇰🇷 韓國 Dr. Face 醫療級遠紅外線童顏機。 唔好以為佢只係普通照燈，佢釋放嘅遠紅外線能量，可以深入皮下 50mm (5cm)，比一般 HIFU 嘅 4.5mm 仲要深！

✨ 30分鐘．喚醒沉睡肌膚： ✅ 激活細胞： 令微血管擴張，加速血液循環，做完塊面即刻有種做完運動嘅白裡透紅感。 ✅ 深層排毒： 透過汗水排出積存喺毛孔深處嘅化妝品殘餘物同重金屬，比洗面更乾淨。 ✅ 去水腫： 促進代謝，改善包包面同下垂輪廓，做到瘦面效果。

🛡️ 韓國 KFDA 認證 安全、溫和、無痛。只需訓係度享受暖笠笠嘅護理，皮膚就由內到外靚返哂！
想素顏都咁自信？Inbox 我哋預約試做啦！💖

#康姿健 #DrFace #童顏機 #遠紅外線 #去黃 #美白 #氣血 #屯門美容 #素顏肌 #KFDA', '素顏發光', '2026-03-15', '/images/social/2603-素顏發光篇-自帶天然胭脂-唔洗化妝都面色紅潤-原來係靠-生命之光.webp', '【素顏發光篇】自帶天然胭脂！唔洗化妝都面色紅潤？原來係靠「生命之光」', '2603-素顏發光篇-自帶天然胭脂-唔洗化妝都面色紅潤-原來係靠-生命之光', ARRAY['2603-素顏發光篇-自帶天然胭脂-唔洗化妝都面色紅潤-原來係靠-生命之光']::text[], 'published', 20, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2508-09-r4', '優惠', '優惠', '新客體驗價', '醫美知識', '2026-01-15', '/images/social/2508-09-優惠.webp', '優惠', '2508-09-優惠', ARRAY['2508-09-優惠']::text[], 'published', 46, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2508-09-r5', '小知識', '小知識', '天熱更易爆暗瘡？', '護膚知識', '2026-01-15', '/images/social/2508-09-小知識.webp', '小知識', '2508-09-小知識', ARRAY['2508-09-小知識']::text[], 'published', 47, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2508-09-r6', '品牌形象', '品牌形象', '獎項回顧', '醫美知識', '2026-01-15', '/images/social/2508-09-品牌形象-2.webp', '品牌形象', '2508-09-品牌形象-2', ARRAY['2508-09-品牌形象-2']::text[], 'published', 48, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2508-09-r7', '產品介紹', '產品介紹', '激光袪斑', '儀器療程', '2026-01-15', '/images/social/2508-09-產品介紹-2.webp', '產品介紹', '2508-09-產品介紹-2', ARRAY['2508-09-產品介紹-2']::text[], 'published', 49, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2508-09-r8', '小知識', '小知識', '斑點你識分嗎', '醫美知識', '2026-01-15', '/images/social/2508-09-小知識-2.webp', '小知識', '2508-09-小知識-2', ARRAY['2508-09-小知識-2']::text[], 'published', 50, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2508-09-r9', '優惠', '優惠', '激光袪斑', '儀器療程', '2026-01-15', '/images/social/2508-09-優惠-2.webp', '優惠', '2508-09-優惠-2', ARRAY['2508-09-優惠-2']::text[], 'published', 51, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2508-09-r10', '品牌形象', '品牌形象', '品牌願景與目標', '醫美知識', '2026-01-15', '/images/social/2508-09-品牌形象-3.webp', '品牌形象', '2508-09-品牌形象-3', ARRAY['2508-09-品牌形象-3']::text[], 'published', 52, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2508-09-r11', '小知識', '小知識', '可能係濕氣太重！', '醫美知識', '2026-01-15', '/images/social/2508-09-小知識-3.webp', '小知識', '2508-09-小知識-3', ARRAY['2508-09-小知識-3']::text[], 'published', 53, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2602-r2', '新春營業時間', '  馬年迎春接福！康姿健同大家拜個早年！ ', '【 🧨🐴 馬年迎春接福！康姿健同大家拜個早年！🧧 】
🐴 馬年將至！✨ 感謝各位靚靚過去一年嘅支持同信任，放心將肌膚交俾我哋照顧 🫶🏻 新一年，康姿健祝願大家： 🌸 顏值爆燈，肌膚逆齡生長！ 💰 荷包滿滿，想要嘅都有！ 最重要係身體健康，日日都容光煥發 Keep 住最佳狀態！💃🏻

‼️ 新春營業時間安排 🔴 年廿九收爐 🟢 年初七啟市！唔好摸門釘呀 ～

大家逗利是、食年糕之餘，記住唔好捱太夜，都要做足保濕呀！💦 約定大家馬年見，一齊開個靚年！🍊
 
#康姿健 #HongChiKin #新春營業時間 #屯門美容 #懶人護膚', '護膚知識', '2026-02-15', '/images/social/2602-新春營業時間.webp', '新春營業時間', '2602-新春營業時間', ARRAY['2602-新春營業時間']::text[], 'published', 21, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2602-r4', '開工大吉', '  年初七人日快樂！康姿健開工大吉！ ', '【 🧧 年初七人日快樂！康姿健開工大吉！🍊 】
經過幾日連環拜年、食年糕、打牌通頂... 相信大家都過得好充實！😆 不過玩得盡興，都要照下鏡 Check 下有無「假期後遺症」找上門？😨

❌ 熬夜肌膚暗沉無光 ❌ 食太多煎炸嘢爆暗瘡 ❌ 飲多咗水腫包包面

放心！救星到啦！🫶🏻 康姿健今日正式啟市啦！🥳 美容師們已經叉足電⚡️隨時Ready幫你嘅肌膚做個徹底嘅「開年大掃除」！🧹 無論係想急救殘樣定深層補水，定係養生通淋巴，即刻幫你掃走倦容，以最佳狀態迎接新一年挑戰！✨

📅 新年後預約比較緊張，想快啲搵返個靚樣開工？ 👉🏻「馬」上快啲 DM 我哋預約啦！

#康姿健 #HongChiKin #急救肌膚 #新春啟市 #用心服務', '痛症理療', '2026-02-15', '/images/social/2602-開工大吉.webp', '開工大吉', '2602-開工大吉', ARRAY['2602-開工大吉']::text[], 'published', 23, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2602-r5', '膠原小旋風 
黃金鐵三角', '  護膚都要講效率！COLLAZEN 膠原美肌小旋風一打三」黑科技  ', '【 🚀 護膚都要講效率！COLLAZEN 膠原美肌小旋風一打三」黑科技 🌪️ 】
做機仲要逐個頭換？Out 啦！👋🏻 「COLLAZEN 膠原美肌小旋風 」獨有 「3-Way 同步輸出」 技術，一次過針對不同皮層，慳時間之餘效果仲更全面！

➡ 3-Way SONO 水滴超聲波提升｜同步輸出3個頻率！ 一次過滲透表皮層、真皮層、皮下脂肪深層。由內到外泵滿水，覆蓋99%肌膚問題！一機多效，打造真正「水滴肌」！
✅緊緻抗皺、治療痤瘡、激活再生  ✅敏感肌、痘痘肌、乾燥受損肌、老化肌

➡ 3-Way HIFU 全層逆齡提拉｜一槍打 3 層，唔洗換頭！ 突破性同時輸出能量直達 表皮層 (1.5mm) ➕ 真皮層 (3.0mm) ➕ 筋膜層 (4.5mm) 。 能量覆蓋更均勻，大大縮短療程時間，效果更全面！
✅ 針對改善：輪廓下垂、眼紋、魚尾紋、頸紋、雙下巴 

👉🏻 即刻 Inbox 預約，體驗「同步煥膚」威力！

#康姿健 #COLLAZENTornado #水滴提拉 #高效護膚 #屯門美容', '儀器療程', '2026-02-15', '/images/social/2602-膠原小旋風-黃金鐵三角.webp', '膠原小旋風 
黃金鐵三角', '2602-膠原小旋風-黃金鐵三角', ARRAY['2602-膠原小旋風-黃金鐵三角']::text[], 'published', 24, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2602-r6', '膠原小旋風 
逆齡效果 Double Up', '  一個完美嘅療程，前後功夫先係關鍵！ HIFU、RF 逆齡效果 Double Up 之秘密  ', '【 💎 一個完美嘅療程，前後功夫先係關鍵！⭐️ HIFU、RF 逆齡效果 Double Up 之秘密 🤫 】
做機唔係能量大就得‼️如果角質厚、毛色塞滿污糟嘢、做完唔修復，效果大打折扣 ‼️「COLLAZEN 膠原美肌小旋風 」強就強在佢係一套 「有頭有尾」嘅完整護膚療程 💆🏻‍♀️ 幾個功能相輔相成令「主菜」 HIFU、RF 發揮 200% 嘅功效！

1️⃣ 【SonoClean 毛孔大掃除】34KHz 超聲波無痛震走死皮、黑頭同油脂 ，打開皮膚通道令後續 HIFU/RF 能量精準直達深層，能量零浪費！
2️⃣ 【 3-Way Sono 水滴提拉】同時輸出三個頻率，將水分穿透淺、中、深層肌膚，覆蓋99%肌膚問題，加乘修復，打造飲飽水嘅「水光肌」
3️⃣ 【 3-Way HIFU 逆齡 V 面】突破性同時輸出能量直達表皮層 (1.5mm) ➕ 真皮層 (3.0mm) ➕ 筋膜層 (4.5mm)，全方位內到外重現輪廓線！
4️⃣ 【RF 膠原再生】喚醒膠原蛋白再生，增加皮膚彈性、改善膚質
5️⃣ 【Cryo 冰火修復 】冷暖交替 (-15°C~45°C) 配合離子滲透 ，將精華壓入肌底。 做完高熱能療程之後即時「鎮靜＋滋養」

📣 想體驗事半功倍嘅完整護膚？快啲 Inbox 嚟康姿健體驗啦！

#康姿健 #COLLAZENTornado #HIFU #毛孔大掃除 #屯門美容', '儀器療程', '2026-02-15', '/images/social/2602-膠原小旋風-逆齡效果-Double-Up.webp', '膠原小旋風 
逆齡效果 Double Up', '2602-膠原小旋風-逆齡效果-Double-Up', ARRAY['2602-膠原小旋風-逆齡效果-Double-Up']::text[], 'published', 25, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2601-r3', 'V-SANG 藍光煥膚療程', ' 咩話？28日更新週期縮短至 3日？拆解「藍光煥膚」黑科技！', '🧐 咩話？28日更新週期縮短至 3日？拆解「藍光煥膚」黑科技！🧬
👩🏻‍🏫一般肌膚更新週期要 28 日，但隨住年紀大，代謝慢，啲死皮就賴死唔走...
隆重介紹 💙 V-SANG 藍光奇蹟煥膚 💙 唔需要儀器就可以將能量滲透入毛孔深處！

✅ 99% 高純度微針： 比傳統海藻矽針更幼細、更純淨，大大減低痛感同刺激 。 
✅ SOS煥膚！將原本28日嘅更新週期縮短至最快 3日！

簡單講：好似幫皮膚做咗次「Reboot」，重現初生肌膚咁滑！👶🏻 重點係—— 過程溫和，唔會成塊面紅晒出唔到街！
👉🏻 想了解自己膚質啱唔啱做？DM 搵我哋傾下！

#康姿健 #BluePeel #藍光煥膚 #去角質 #屯門美容', '儀器療程', '2026-01-15', '/images/social/2601-V-SANG-藍光煥膚療程-2.jpeg', 'V-SANG 藍光煥膚療程', '2601-V-SANG-藍光煥膚療程-2', ARRAY['2601-V-SANG-藍光煥膚療程-2']::text[], 'published', 27, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2601-r5', '過年準備', ' 溫馨提示  仲有唔夠一個月就過年啦！想要靚住過就要而家開始準備啦你嘅毛孔大掃除咗未？', '🫶🏻 溫馨提示 🧧 仲有唔夠一個月就過年啦！想要靚住過就要而家開始準備啦🧹你嘅毛孔大掃除咗未？

諗下拜年時要見咁多親戚朋友，仲要影相打卡... 📸 如果滿面油光、黑頭粉刺，個妝幾厚都遮唔住！😩 新年前必做清單： 
1️⃣ 清走粉刺黑頭： 令皮膚平滑，上妝更貼服。 
2️⃣ 提亮膚色： 趕走「黃面婆」氣色，利是都逗多兩封！🧧 
3️⃣ 緊緻輪廓： 影相唔洗就角度，360度都咁靚。

無論係想做個簡單 Facial，定係爆瘡、想改善黑眼圈等等等等...所有嘅皮膚問題我哋都會幫你安排最適合嘅方案！ 趁過年前，快啲嚟康姿健幫塊面Get Ready！✨
👉🏻 年尾預約極度緊張，未 Book 嘅真係要快手啦！ 🏃🏻‍♀️

#康姿健 #深層清潔 #新年必備 #拜年妝  #屯門美容', '醫美知識', '2026-01-15', '/images/social/2601-過年準備.jpeg', '過年準備', '2601-過年準備', ARRAY['2601-過年準備']::text[], 'published', 29, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2601-r6', '週末 Me Time', '  星期日嘅約定：放低手機，享受 60 分鐘嘅寧靜平日返工衝衝衝，放假係咪應該要慢落嚟？ 喺康姿健，我哋最想俾你嘅，唔止係靚嘅皮膚，仲有一份放鬆', '【 🤙🏻 星期日嘅約定：放低手機，享受 60 分鐘嘅寧靜】平日返工衝衝衝，放假係咪應該要慢落嚟？🐢 喺康姿健，我哋最想俾你嘅，唔止係靚嘅皮膚，仲有一份"放鬆"～

🚫 絕無疲勞轟炸 🚫 絕無硬銷 Course 🚫無隱瞞收費
✅ 只有溫暖嘅美容床 ✅ 輕柔嘅純音樂 🎵 ✅ 美容師細心溫柔到位嘅手勢 💆🏻‍♀️

合埋眼，暫時忘記工作煩惱，專注享受屬於你嘅 Me Time。 做完 Facial 飲杯茶，照下鏡，你會發現笑容都甜美啲～ 🥰
👉🏻 下星期，約定你，好好善待自己。

#康姿健 #用心服務 #絕不硬銷 #MeTime #身心放鬆', '醫美知識', '2026-01-15', '/images/social/2601-週末-Me-Time.jpeg', '週末 Me Time', '2601-週末-Me-Time', ARRAY['2601-週末-Me-Time']::text[], 'published', 30, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('acne-peel', '【暗瘡粉刺篇】油光滿面、黑頭死纏爛打？「淨化平衡皮脂果酸」幫毛孔大掃除！', '天氣一笠，塊面就變「大油田」，黑頭粉刺唧完又生，仲要成日爆暗瘡？', '天氣一笠，塊面就變「大油田」，黑頭粉刺唧完又生，仲要成日爆暗瘡？😩

係時候幫毛孔做個深度大掃除啦！康姿健推介 TEGODER 淨化平衡皮脂果酸 30 (Salipure Peeling)。呢款配方專為油性、暗瘡同粉刺肌膚而設！

佢蘊含 30% 濃度嘅複合酸（水楊酸 + 杏仁酸），pH 值維持喺 2.0-2.2。點解揀佢？
✨ 清毛孔最強： 脂溶性嘅水楊酸可以鑽入皮脂底層，深層清潔兼溶解阻塞毛孔嘅粉刺。
✨ 溫和唔刺痛： 因為分子大、滲透慢，刺激感比一般果酸更低，但抗菌抗炎效果極佳！

做完一次，即刻覺得毛孔識得呼吸，平滑度大提升！唔想再同石頭瘡搏鬥？快啲黎體驗下零壓力嘅淨化療程啦 🌱。

#暗瘡護理 #去黑眼圈 #水楊酸 #深層清潔 #不硬銷', '暗瘡粉刺', '2026-06-15', '/images/social/2606-暗瘡粉刺篇-油光滿面-黑頭死纏爛打-淨化平衡皮脂果酸-幫毛孔大掃除.webp', '【暗瘡粉刺篇】油光滿面、黑頭死纏爛打？「淨化平衡皮脂果酸」幫毛孔大掃除！', '2606-暗瘡粉刺篇-油光滿面-黑頭死纏爛打-淨化平衡皮脂果酸-幫毛孔大掃除', ARRAY['2606-暗瘡粉刺篇-油光滿面-黑頭死纏爛打-淨化平衡皮脂果酸-幫毛孔大掃除','2606-r3']::text[], 'published', 1, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2512-r3', '新年優惠
- 紅外線焗倉', '新年開運 惠顧任何項目  即送 DrRainbow 遠紅外線焗倉面部 30分鐘 ', '🧧✨新年開運‼️ 惠顧任何項目 🆓 即送 Dr.Rainbow 遠紅外線焗倉｜面部 30分鐘 🔴
錯過咗聖誕優惠唔緊要～ 🤭 好嘢陸續有嚟！新一年緊係要面色紅潤善洋洋 ✨ 面部同身體一樣要養生！

「🌈 Dr Rainbow 醫療級遠紅外線童顏機有咩咁勁？」
做 Facial 配合埋童顏儀，效果Double 咁靚！童顏儀可以促進面膜的修護精華滲進肌底，同時抗老化、提升輪廓、緊緻美肌～
🔥 能量直達皮膚底層 5cm，喚醒細胞嘅再生能力！
🔥 排走面部瘀滯＋毒素，促進代謝循環，膚色由內到外紅潤透亮！
🔥 將 Facial 嘅精華推到肌膚深層，效果MAX！
🔥 抗衰老、緊緻輪廓、提升蘋果肌、減淡浮腫
‼️ 惠顧任何項目💥 即送 Dr Rainbow 醫療級遠紅外線童顏機｜面部照足30分鐘 ‼️


⭐️ 韓國KFDA、美國FDA、CE等專利認證 ⭐️ 安全高效 ⭐️ 
快啲 Follow 我哋唔好再錯過優惠啦 ‼️', '痛症理療', '2025-12-15', '/images/social/2512-新年優惠-紅外線焗倉.webp', '新年優惠
- 紅外線焗倉', '2512-新年優惠-紅外線焗倉', ARRAY['2512-新年優惠-紅外線焗倉']::text[], 'published', 32, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2512-r4', '年尾回顧 - 窩心小店', ' 轉眼又到年尾  2025 感恩有你哋  回望今年真心覺得好幸福好多客仔由嚟做 Facial 到後來變成熟客同朋友 ', '【 轉眼又到年尾 💜 2025 感恩有你哋 】 回望今年真心覺得好幸福🥹好多客仔由嚟做 Facial 到後來變成熟客同朋友 …
好多都話：「嚟到康姿健放鬆嘅感覺，係外面搵唔到 」
呢份信任，真係令我哋覺得做美容唔淨止係服務，而係一份陪伴 ✨

💕 多謝新客嘅信任，亦多謝熟客仔們一直陪住我哋 💪🏻
2026，我哋會繼續更努力，陪住大家變靚，更健康！', '醫美知識', '2025-12-15', '/images/social/2512-年尾回顧-窩心小店.webp', '年尾回顧 - 窩心小店', '2512-年尾回顧-窩心小店', ARRAY['2512-年尾回顧-窩心小店']::text[], 'published', 33, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2512-r5', '等離子微針射頻再生儀

暗瘡凹凸洞', ' 新一年告別凹凸洞！等離子微針射頻再生儀可以做到減淡凹凸洞同埋暗瘡印，而且效果比你想像更明顯', '😠 新一年告別凹凸洞！【等離子微針射頻再生儀】可以做到減淡凹凸洞同埋暗瘡印，而且效果比你想像更明顯🔥

✔ 暗瘡印明顯變淡
✔ 凹凸洞由鬆散 → 變緊緻
✔ 膚質平滑度大幅提升
✔ 改善毛孔粗大
🎯 適合：暗瘡肌、油脂分泌旺盛、毛孔粗大、粉刺或毛囊炎

利用離子能量破壞細菌結構、抗菌抗炎，刺激膠原再生，重生回復平滑細緻✨
⭐️ 加配埋 Bioskin 精華導入，多款唔同功效，按你肌膚對症下藥，功效倍增～

2026都嚟啦！快啲預約，早做早享受 🫢', '儀器療程', '2025-12-15', '/images/social/2512-等離子微針射頻再生儀-暗瘡-凹凸洞.webp', '等離子微針射頻再生儀

暗瘡凹凸洞', '2512-等離子微針射頻再生儀-暗瘡-凹凸洞', ARRAY['2512-等離子微針射頻再生儀-暗瘡-凹凸洞']::text[], 'published', 34, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2512-r6', '紅外線焗倉', ' 毛孔都要排毒   無錯！好多客人以為平時用洗面乳洗面就夠  但其實毛孔都會「塞毒素」！ ', '【 毛孔都要排毒 ⁉️ 】👩🏻‍⚕️ 無錯！好多客人以為平時用洗面乳洗面就夠  但其實…毛孔都會「塞毒素」😠！ 👾
化妝品殘留、皮脂氧化、瘀滯、重金屬通通可以困喺毛孔裡面，令皮膚暗啞、粗糙、生暗粒、吸收力低！

🌈 Dr.Rainbow 醫療級遠紅外線童顏機 ～ 就係專門用嚟做毛孔深層排毒＋喚醒細胞再生 🔥
✔ 能量直達皮膚底層 5cm，配合精華滲到肌膚底層，加倍吸收
✔ 加速代謝循環 → 經汗水排出毒素、化妝品殘留、油脂塵垢
一部機就做到紅潤、透亮、收毛孔、緊緻輪廓、激活細胞再生同自癒力，幫皮膚真正由內到外變得更靚！
⭐️ 韓國KFDA、美國FDA、CE等專利認證 ⭐️ 安全高效 ⭐️', '痛症理療', '2025-12-15', '/images/social/2512-紅外線焗倉.webp', '紅外線焗倉', '2512-紅外線焗倉', ARRAY['2512-紅外線焗倉']::text[], 'published', 35, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2606-r5', '【抗老去斑篇】歲月留痕？「真皮更新複合酸」直達肌底逆轉肌齡！', '照鏡見到色斑越來越深，細紋又跑晒出黎，望落成個人老咗幾年？ 表面嘅保養已經滿足唔到你！', '照鏡見到色斑越來越深，細紋又跑晒出黎，望落成個人老咗幾年？🥀 表面嘅保養已經滿足唔到你！

康姿健強勢推介 TEGODER 真皮更生複合酸 26 (PMP Peeling)，專治色素沉澱同光老化肌膚（皺紋、下垂）！
呢款配方絕對係抗老天花板，蘊含 26% 濃度嘅三氯乙酸 (TCA)、AHA 及 BHA，能夠穿透表皮層，直達深層同步進行煥膚！

🌟 強效細胞更新： 促進組織再生，緊緻提升，增加肌膚彈性。
🌟 褪斑提亮： 配合傳明酸同維他命 B5，強力抑制黑色素，改善暗黃。
❄️ 清涼舒適： 特別加入薄荷醇，大大減低療程中嘅不適感，舒緩鎮靜。

即刻預約，重拾年輕輪廓啦！

#抗衰老 #去斑美白 #真皮更新 #熟齡肌保養 #屯門美容店', '抗老去斑', '2026-06-15', '/images/social/2606-抗老去斑篇-歲月留痕-真皮更新複合酸-直達肌底-逆轉肌齡.webp', '【抗老去斑篇】歲月留痕？「真皮更新複合酸」直達肌底逆轉肌齡！', '2606-抗老去斑篇-歲月留痕-真皮更新複合酸-直達肌底-逆轉肌齡', ARRAY['2606-抗老去斑篇-歲月留痕-真皮更新複合酸-直達肌底-逆轉肌齡']::text[], 'published', 3, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2606-r7', '【量膚定制液態黃金篇】乾到甩皮定輪廓下垂？兩款西班牙頂級精油幫你對症下藥！', '天氣同作息反覆，皮膚狀態好唔穩定？有時乾到嚡澀澀，有時又覺得塊面暗沉鬆弛 ？護膚唔可以一成不變，康姿健「面部精油撥筋療程」幫你量膚定制！', '天氣同作息反覆，皮膚狀態好唔穩定？有時乾到嚡澀澀，有時又覺得塊面暗沉鬆弛 😩？護膚唔可以一成不變，康姿健「面部精油撥筋療程」幫你量膚定制！

我哋特選西班牙 TEGODER 嘅「肌膚液態黃金」精油系列，為肌膚帶嚟超越一般精華嘅深度滋養！美容師會根據你當日嘅膚況，為你挑選最合適嘅專屬護理：

🌸 山茶花精油 (Glow Dry Oil) —— 補水發光神器：
專拯救沙漠乾肌同粗糙肌！臨床實證能改善皮膚粗糙 +90%、改善膚乾 +90%。做完之後亮白光澤度即時提升 +45%，幫你趕走暗黃，還原滑溜溜水光肌 ✨！

🌺 黑蘭花精油 (Orchid Essence) —— 逆齡緊緻天花板：
蘊含珍貴嘅催眠紅門蘭花萃取，主打細胞長壽！配合維他命E同甜杏仁油，做到潤澤抗敏兼對抗氧化。有效令彈性緊緻度增加 +39%、抗氧化度高達 +51%，幫你重塑緊緻輪廓！

配合美容師專業溫柔嘅提拉撥筋手勢，將滴滴精華完全滲透入肌底。康姿健堅持單次收費、絕不硬銷，放假一於嚟享受下專屬你嘅零壓力 Me Time 啦 🥰！

#液態黃金 #面部撥筋 #山茶花精油 #抗老緊緻 #單次收費', '量膚定制・液態黃金', '2026-06-15', '/images/social/2606-量膚定制-液態黃金篇-乾到甩皮定輪廓下垂-兩款西班牙頂級精油幫你對症下藥.webp', '【量膚定制液態黃金篇】乾到甩皮定輪廓下垂？兩款西班牙頂級精油幫你對症下藥！', '2606-量膚定制-液態黃金篇-乾到甩皮定輪廓下垂-兩款西班牙頂級精油幫你對症下藥', ARRAY['2606-量膚定制-液態黃金篇-乾到甩皮定輪廓下垂-兩款西班牙頂級精油幫你對症下藥']::text[], 'published', 5, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2604-r2', '【秋冬保養篇】塊面乾到「爆拆」？ 天氣急降皮膚又紅又痕必學3招轉季急救護膚秘笈！', '天文台話氣溫急降，唔少客人都話塊面紅卜卜、那那地，甚至乾到甩皮！ 小編溫馨提提你幾個轉季護膚貼士：', '你塊面有冇發出「爆拆」警告？❄️
天文台話氣溫急降，唔少客人都話塊面紅卜卜、那那地，甚至乾到甩皮！ 小編溫馨提提你幾個轉季護膚貼士：

1️⃣ 切忌用太熱嘅水洗面：水溫太高會洗走天然油脂，令皮膚更乾！
2️⃣ 加強保濕鎖水：精華唔好慳，面霜要搽厚少少 。
3️⃣ 暫停磨砂：皮膚脆弱時，千祈唔好做強烈去角質 。

如果覺得皮膚真係好乾、好痕，推介黎康姿健做個人手保濕導入 。幫皮膚起個防護罩，暖笠笠做 Facial 絕對係一種享受！🥰

#康姿健 #護膚小貼士 #轉季保濕 #乾燥肌 #敏感肌', '秋冬保養', '2026-04-15', '/images/social/2604-秋冬保養篇-塊面乾到-爆拆-天氣急降皮膚又紅又痕-必學3招轉季急救護膚秘笈.webp', '【秋冬保養篇】塊面乾到「爆拆」？ 天氣急降皮膚又紅又痕必學3招轉季急救護膚秘笈！', '2604-秋冬保養篇-塊面乾到-爆拆-天氣急降皮膚又紅又痕-必學3招轉季急救護膚秘笈', ARRAY['2604-秋冬保養篇-塊面乾到-爆拆-天氣急降皮膚又紅又痕-必學3招轉季急救護膚秘笈']::text[], 'published', 6, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2604-r4', '【無壓力美容】做Facial好怕被瘋狂推銷？ 拒絕疲勞轟炸！明碼實價零硬銷靜靜地享受專屬你嘅60分鐘Me Time！', '平日返工日忙夜忙，放假係咪應該要唞吓？好多女仔想做 Facial，但又好怕一入房就被疲勞轟炸、狂 Sell 套票 。喺康姿健，我哋最想俾你嘅，除咗係靚靚嘅皮膚，仲有一份真正嘅「放鬆」！', '平日返工日忙夜忙，放假係咪應該要唞吓？💆🏻‍♀️好多女仔想做 Facial，但又好怕一入房就被疲勞轟炸、狂 Sell 套票 😩。喺康姿健，我哋最想俾你嘅，除咗係靚靚嘅皮膚，仲有一份真正嘅「放鬆」！
我哋堅持三大原則：
❌ 絕無硬銷 (No Hard Sell) ❌ 絕無隱藏收費，明碼實價 ✅ 只有溫暖嘅美容床同溫柔到位嘅手勢 合埋眼，暫時忘記工作煩惱，專注享受屬於你嘅 60 分鐘 Me Time 啦 ☕。做完飲杯茶、照吓鏡，你會發現笑容都甜美啲！下星期，約定你，好好善待自己 ✨。

#康姿健 #良心美容院 #單次收費 #屯門美容 #MeTime', '無壓力美容', '2026-04-15', '/images/social/2604-無壓力美容-做Facial好怕被瘋狂推銷-拒絕疲勞轟炸-明碼實價零硬銷-靜靜地享受專屬你嘅60分鐘Me-Time.webp', '【無壓力美容】做Facial好怕被瘋狂推銷？ 拒絕疲勞轟炸！明碼實價零硬銷靜靜地享受專屬你嘅60分鐘Me Time！', '2604-無壓力美容-做Facial好怕被瘋狂推銷-拒絕疲勞轟炸-明碼實價零硬銷-靜靜地享受專屬你嘅60分鐘Me-Time', ARRAY['2604-無壓力美容-做Facial好怕被瘋狂推銷-拒絕疲勞轟炸-明碼實價零硬銷-靜靜地享受專屬你嘅60分鐘Me-Time']::text[], 'published', 8, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2604-r5', '【養生排毒篇】 醫療級遠紅外線深層排毒！驅寒祛濕兼瘦身由內暖到外！', '手腳成日似雪條 ？夜晚又訓得唔好？其實可能係你體內積聚咗太多濕氣同毒素！', '手腳成日似雪條 ❄️？夜晚又訓得唔好？其實可能係你體內積聚咗太多濕氣同毒素！

唔想做劇烈運動又想排毒？康姿健推介【Dr. Rainbow 醫療級遠紅外線熱能養生儀】🔥！佢釋放嘅「生命之光」可以深入皮下 50mm，引發細胞共振！
💦 排出嘅唔止係水份，仲會將體內嘅重金屬、化妝品殘留物同老廢物一併排走！

只需躺平 30 分鐘，就可以幫身體做個大掃除，舒緩疲勞兼改善宮寒 🩸。做完出晒一身深層汗，氣色即刻紅潤返，成個人輕晒！快啲 Inbox 我哋幫身體「開個暖爐」啦！

#康姿健 #遠紅外線焗倉 #排毒去水腫 #暖宮 #懶人瘦身', '養生排毒', '2026-04-15', '/images/social/2604-養生排毒篇-醫療級遠紅外線深層排毒-驅寒祛濕兼瘦身-由內暖到外.webp', '【養生排毒篇】 醫療級遠紅外線深層排毒！驅寒祛濕兼瘦身由內暖到外！', '2604-養生排毒篇-醫療級遠紅外線深層排毒-驅寒祛濕兼瘦身-由內暖到外', ARRAY['2604-養生排毒篇-醫療級遠紅外線深層排毒-驅寒祛濕兼瘦身-由內暖到外']::text[], 'published', 9, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2604-r6', '【敏弱肌自救篇】 小心角質層受損！拆解脆弱肌膚成因教你溫和重建天然屏障！', '一轉季塊面就紅卜卜？一出街就覺得刺刺地？敷 Mask 又會痕癢起粒粒？', '一轉季塊面就紅卜卜？一出街就覺得刺刺地？敷 Mask 又會痕癢起粒粒？
其實你可能屬於「皮膚薄 + 角質層弱」！🆘

呢個時候千祈唔好再做過度清潔或者煥膚，要盡量減少刺激，改用低敏舒緩嘅療程 。皮膚生病咗，最需要嘅係休養生息。

康姿健有針對脆弱肌嘅修護方案，用溫和嘅手法同精華，慢慢幫你重建皮膚屏障，連熟齡肌都非常啱做！ 皮膚唔聽話？快啲 Inbox 搵我哋幫手「對症下藥」啦！

#康姿健 #皮膚敏感 #角質層薄 #低敏舒緩 #減敏修復', '敏弱肌自救', '2026-04-15', '/images/social/2604-敏弱肌自救篇-小心角質層受損-拆解脆弱肌膚成因-教你溫和重建天然屏障.webp', '【敏弱肌自救篇】 小心角質層受損！拆解脆弱肌膚成因教你溫和重建天然屏障！', '2604-敏弱肌自救篇-小心角質層受損-拆解脆弱肌膚成因-教你溫和重建天然屏障', ARRAY['2604-敏弱肌自救篇-小心角質層受損-拆解脆弱肌膚成因-教你溫和重建天然屏障']::text[], 'published', 10, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2604-r7', '【急救保養篇】滿面油光點打卡影相？ 約會前必做毛孔大掃除！趕走黃氣粉刺極速Get Ready完美貼服底妝！', '溫馨提示：過大節或者有重要約會前，你嘅毛孔大掃除咗未？', '溫馨提示：過大節或者有重要約會前，你嘅毛孔大掃除咗未？🧹

如果滿面油光、黑頭粉刺，個妝幾厚都遮唔住，影相打卡都無自信！ 重要日子前嘅必做清單：
1️⃣ 清走粉刺黑頭：令皮膚平滑，上妝更貼服 。
2️⃣ 提亮膚色：趕走黃氣，氣息好啲，人地望落都精神啲！

無論係想做個簡單保濕 Facial，定係深層爆脂，我哋都會為你安排最適合嘅方案 。年尾或者大節日預約極度緊張，想靚住出街真係要快手 Book 啦！

#康姿健 #重要約會 #毛孔大掃除 #深層清潔 #急救保養', '急救保養', '2026-04-15', '/images/social/2604-急救保養篇-滿面油光點打卡影相-約會前必做毛孔大掃除-趕走黃氣粉刺-極速Get-Ready完美貼服底妝.webp', '【急救保養篇】滿面油光點打卡影相？ 約會前必做毛孔大掃除！趕走黃氣粉刺極速Get Ready完美貼服底妝！', '2604-急救保養篇-滿面油光點打卡影相-約會前必做毛孔大掃除-趕走黃氣粉刺-極速Get-Ready完美貼服底妝', ARRAY['2604-急救保養篇-滿面油光點打卡影相-約會前必做毛孔大掃除-趕走黃氣粉刺-極速Get-Ready完美貼服底妝']::text[], 'published', 11, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2604-r9', '【擊退油脂粒篇】眼周生滿「小白點」？ 唧極都唔出兼留印？無痕氣化油脂粒還原平滑眼周！', '眼底、顴骨位無啦啦生咗幾粒白色、硬硬地嘅「小白點」？以為係暗瘡或者粉刺，點知唧極都唧唔出，夾硬用手擠仲搞到發炎留紅印 ！其實呢啲好可能係「油脂粒」皮脂腺增生或粟粒腫！', '眼底、顴骨位無啦啦生咗幾粒白色、硬硬地嘅「小白點」？以為係暗瘡或者粉刺，點知唧極都唧唔出，夾硬用手擠仲搞到發炎留紅印 😩！其實呢啲好可能係「油脂粒」（皮脂腺增生或粟粒腫）！

對付頑固油脂粒，千萬唔好自己亂挑！康姿健選用先進嘅【PLASER 等離子儀】，利用 1-PIN 單點模式產生熱等離子能量，可以精準咁將油脂粒瞬間氣化  ⚡！過程快、準確度極高，比起傳統用美容針死挑爛挑更安全衛生，大大減低破壞周邊健康皮膚嘅風險，復原得更快更靚 ✨！💰 

康姿健承諾：明碼實價・絕不硬銷我哋堅持單次收費，絕無隱藏項目！收費會按粒數同大小老實報價，等你可以安心、無壓力咁變靚！

唔想啲油脂粒卡住啲遮瑕膏？快啲 Inbox 我哋預約，還原白滑無瑕肌啦 💌！

#脫油脂粒 #粟粒腫 #PLASER等離子 #眼周保養 #屯門美容', '擊退油脂粒', '2026-04-15', '/images/social/2604-擊退油脂粒篇-眼周生滿-小白點-唧極都唔出兼留印-無痕氣化油脂粒還原平滑眼周.webp', '【擊退油脂粒篇】眼周生滿「小白點」？ 唧極都唔出兼留印？無痕氣化油脂粒還原平滑眼周！', '2604-擊退油脂粒篇-眼周生滿-小白點-唧極都唔出兼留印-無痕氣化油脂粒還原平滑眼周', ARRAY['2604-擊退油脂粒篇-眼周生滿-小白點-唧極都唔出兼留印-無痕氣化油脂粒還原平滑眼周']::text[], 'published', 13, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2604-r10', '【無痛掃斑篇】雀斑、表皮斑點遮都遮唔住？ 試下「結焦式祛斑」1次見效還原透亮白滑肌！', '每日出街又要搽防曬又要上厚厚嘅遮瑕膏，但面頰上嘅雀斑同表皮斑依然若隱若現？ 色斑問題真係好困擾！', '每日出街又要搽防曬又要上厚厚嘅遮瑕膏，但面頰上嘅雀斑同表皮斑依然若隱若現？😩 色斑問題真係好困擾！

想徹底搞掂，康姿健推介【表皮斑雀斑護理療程】，真正做到 1 次見效 ！我哋選用先進嘅 PLASER 等離子儀，透過 1-PIN 單點模式釋放熱等離子 ，精準分解黑色素、代謝色斑 。療程仲會配合 20% 維 C 美白安瓶 ，幫你極速回復透亮嫩肌 ！

👩‍⚕️ 療程後黃金貼士： 結痂後千祈唔好用手摳，要俾佢自然脫落，並做好補水保濕 ！期間記住要嚴格防曬、避開高溫 ，仲要暫停使用 AHA / BHA / PHA 等酸類煥膚產品 ，咁就復原得最靚啦！💰 

我哋嘅結焦式祛表皮斑價目非常透明 ：
✨ 半面祛表皮斑：$980 / 次 
🔥 全面祛表皮斑：$1280 / 次 
單次收費，無隱藏項目，等你靚得安心無壓力！

唔想再同色斑糖黐豆？快啲 Inbox 我哋預約啦 💌！

#結焦式祛斑 #雀斑 #去斑療程 #單次收費 #屯門美容院', '無痛掃斑', '2026-04-15', '/images/social/2604-無痛掃斑篇-雀斑-表皮斑點遮都遮唔住-試下-結焦式祛斑-1次見效還原透亮白滑肌.webp', '【無痛掃斑篇】雀斑、表皮斑點遮都遮唔住？ 試下「結焦式祛斑」1次見效還原透亮白滑肌！', '2604-無痛掃斑篇-雀斑-表皮斑點遮都遮唔住-試下-結焦式祛斑-1次見效還原透亮白滑肌', ARRAY['2604-無痛掃斑篇-雀斑-表皮斑點遮都遮唔住-試下-結焦式祛斑-1次見效還原透亮白滑肌']::text[], 'published', 14, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2603-r2', '【 膠原小旋風登陸屯門！一部機幫你由 A to Z 「重啟」嫩肌 】', '最近天氣忽冷忽熱又乾燥，照鏡係咪覺得皮膚好似「生鏽」咁？ 又乾、又黃、啲乾紋仲要靜雞雞走晒出嚟  想做 Facial 急救，但又怕痛？又怕要做幾部機先搞得掂？', '最近天氣忽冷忽熱又乾燥，照鏡係咪覺得皮膚好似「生鏽」咁？🍂 又乾、又黃、啲乾紋仲要靜雞雞走晒出嚟... 😩 想做 Facial 急救，但又怕痛？又怕要做幾部機先搞得掂？
康姿健明白你想要簡單、舒服又有效嘅 Me Time！💆‍♀️ 隆重介紹我哋嘅新寵兒 —— COLLAZEN Tornado 膠原小旋風！
點解叫 Tornado？因為佢真係好似旋風咁，幫你捲走晒啲死皮廢物，再將滿滿嘅膠原蛋白捲番入皮膚底層！由清潔到緊緻，由 A 到 Z 滿足你所有願望。

想試吓個「小旋風」有幾勁？🌪️ 給自己一個放鬆變靚嘅機會，快啲 Inbox 我哋預約啦！❤️

#康姿健 #HongChikin #屯門美容 #COLLAZENTornado #膠原小旋風 #膠原再生 #HIFU #RF射頻 #水滴提拉 #無針水光 #收毛孔 #去皺紋 #MeTime #屯門Facial #科學護膚 #水光肌', '🌪️ 膠原小旋風登陸屯門！一部機幫你由 A to Z 「重啟」嫩肌 ✨', '2026-03-15', '/images/social/2603-膠原小旋風登陸屯門-一部機幫你由-A-to-Z-重啟-嫩肌.webp', '【 膠原小旋風登陸屯門！一部機幫你由 A to Z 「重啟」嫩肌 】', '2603-膠原小旋風登陸屯門-一部機幫你由-A-to-Z-重啟-嫩肌', ARRAY['2603-膠原小旋風登陸屯門-一部機幫你由-A-to-Z-重啟-嫩肌']::text[], 'published', 15, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('tegoder-custom-peel', '美容唔止靠儀器！西班牙醫學級「量膚定制」果酸療程', '好多客人以為黎康姿健淨係做儀器？其實我哋嘅人手護膚品療程一樣係皇牌！', '好多客人以為黎康姿健淨係做儀器？其實我哋嘅人手護膚品療程一樣係皇牌！💆🏻‍♀️

每個人嘅膚質都唔同，點可以一條配方走天涯？我哋特別引入咗 🇪🇸 西班牙頂級醫學美容品牌 TEGODER，為大家帶黎 4 款針對唔同膚質嘅專屬果酸療程！

無論你係：
🧏🏻‍♀️ 油性/暗瘡肌 👉 需要深層清潔、溶解黑頭粉刺
🥀 暗啞/色斑肌 👉 需要擊退黑色素、提亮去黃
🍓 敏感/泛紅肌 👉 需要極溫和抗菌、修復微絲血管
👵 熟齡/鬆弛肌 👉 需要真皮層更新、撫平深層皺紋

我哋嘅專業美容師都會先幫你做詳細皮膚分析，再挑選最適合你嘅 TEGODER 果酸配方，真正做到「對症下藥」！配合埋美容師溫柔到位嘅人手按摩，將精華深層滲透，效果絕對唔輸比做機架 ✨！

康姿健堅持單次收費，絕不硬銷。想知自己適合邊款酸？即刻 Inbox 我哋了解下啦 💌！

#康姿健 #Tegoder #果酸煥膚 #量膚定制 #屯門美容', '護膚知識', '2026-06-15', '/images/social/2606-美容唔止靠儀器-西班牙醫學級-量膚定制-果酸療程.webp', '美容唔止靠儀器！西班牙醫學級「量膚定制」果酸療程', '2606-美容唔止靠儀器-西班牙醫學級-量膚定制-果酸療程', ARRAY['2606-美容唔止靠儀器-西班牙醫學級-量膚定制-果酸療程','2606-r2']::text[], 'published', 0, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('sensitive-peel', '【敏感泛紅篇】皮膚薄又易紅？最溫和嘅「玫瑰亮白果酸」打破敏感肌宿命！', '好多客仔同小編講：「我皮膚好薄、好易敏感泛紅，係咪一世都唔做得果酸？」', '好多客仔同小編講：「我皮膚好薄、好易敏感泛紅，係咪一世都唔做得果酸？」🥺
絕對唔係！只要揀啱配方，敏感肌都可以安全煥膚！

為大家介紹 TEGODER 玫瑰亮白果酸 21 (Sensi Renover Peeling)。呢款係專門為敏感性、皮膚較薄，甚至有紅斑痤瘡煩惱嘅朋友而設！

佢採用咗極溫和嘅 21% 複合酸配方，主要成分係分子較大嘅「杏仁酸」，被公認為最溫和嘅 AHA！
💧 配合乳糖酸同乳酸，煥膚同時做到極致保濕潤澤。
🛡️ 有效抗菌抗炎，減少淺層毛細血管引起嘅皮膚發紅，溫和去除死皮。

喺康姿健做療程，美容師會全全程緊貼你嘅皮膚反應，確保你做得舒服又安心。還原均勻透亮膚色，其實好簡單 ✨！

#敏感肌救星 #泛紅退散 #玫瑰果酸 #溫和煥膚 #單次收費', '敏感泛紅', '2026-06-15', '/images/social/2606-敏感泛紅篇-皮膚薄又易紅-最溫和嘅-玫瑰亮白果酸-打破敏感肌宿命.webp', '【敏感泛紅篇】皮膚薄又易紅？最溫和嘅「玫瑰亮白果酸」打破敏感肌宿命！', '2606-敏感泛紅篇-皮膚薄又易紅-最溫和嘅-玫瑰亮白果酸-打破敏感肌宿命', ARRAY['2606-敏感泛紅篇-皮膚薄又易紅-最溫和嘅-玫瑰亮白果酸-打破敏感肌宿命','2606-r4']::text[], 'published', 2, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2603-r4', '【西班牙醫學級微針】無痛無創激活膠原 BB', '想做微針收毛孔、去凹凸洞，但又怕痛怕爛面？ 康姿健引入 Mesoestetic mpenpro 智能電動微針，徹底打破你對傳統微針嘅恐懼！', '想做微針收毛孔、去凹凸洞，但又怕痛怕爛面？😰 康姿健引入 Mesoestetic m.pen[pro] 智能電動微針，徹底打破你對傳統微針嘅恐懼！

👉 點解揀佢？ 來自西班牙醫學大廠，採用 垂直進針技術 ，比起傳統滾輪更穩定、更精準，大大減低痛感同創傷！

💎 皇牌賣點：
100% 客製化： 擁有 5段變速 (最高每分鐘10,000轉！) ＋ 6種深度調節 ，無論你係皮薄定皮厚，美容師都能夠幫你調校最適合嘅模式 。
雙重功效： 一邊刺激 膠原蛋白再生 ，一邊打開數千個微細管道 ，令精華真正滲透肌底，吸收力 Level Up！⬆️ 
解決多種問題： 毛孔粗大 、凹凸洞、細紋 、甚至妊娠紋都搞得掂 。

❌ 拒絕 Hard Sell 康姿健堅持 單次收費、明碼實價 。我哋只會根據你嘅皮膚狀況建議療程，絕不強迫推銷。
💬 想皮膚重生？ 立即 Inbox 我哋預約諮詢，感受下真正「有實效」嘅皮膚管理啦！
#康姿健 #Mesoestetic #MpenPro #微針 #收毛孔 #凹凸洞 #膠原再生 #屯門美容 #單次收費 #不硬銷 #MeTime', '🇪🇸西班牙醫學級微針', '2026-03-15', '/images/social/2603-西班牙醫學級微針-無痛-無創-激活膠原-BB.webp', '【西班牙醫學級微針】無痛無創激活膠原 BB', '2603-西班牙醫學級微針-無痛-無創-激活膠原-BB', ARRAY['2603-西班牙醫學級微針-無痛-無創-激活膠原-BB']::text[], 'published', 17, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2601-r2', 'V-SANG 藍光煥膚療程', ' Happy New Year 2026！新年新開始！傳說中韓妹打造「玻璃水光肌」嘅秘密武器    VSANG 藍光奇蹟煥膚 登陸啦！', '🎉 Happy New Year 2026！新年新開始！傳說中韓妹打造「玻璃水光肌」嘅秘密武器...  【 💙 V-SANG 藍光奇蹟煥膚✨】 登陸啦！

新一年，係時候要有一個新開始（包括你已經「拖」咗好耐嘅皮膚護理 🤭）。
【 💙 V-SANG 藍光奇蹟煥膚 】唔單止係做 Facial，更加係一次幫肌膚「大掃除」＋「重生」嘅旅程。 
想知點解佢可以喺韓國美容界咁紅？ 密切留意我哋之後嘅介紹啦！🤫

✨ 新一年願望： 願每一位嚟到康姿健嘅客人，都可以搵返自信發光嘅自己！
👉🏻 想搶先體驗？Inbox 我哋查詢啦！ 

#康姿健 #屯門美容 #良心美容院 #藍光煥膚 #BluePeel', '醫美知識', '2026-01-15', '/images/social/2601-V-SANG-藍光煥膚療程.jpeg', 'V-SANG 藍光煥膚療程', '2601-V-SANG-藍光煥膚療程', ARRAY['2601-V-SANG-藍光煥膚療程']::text[], 'published', 26, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2606-r6', '【熬夜去黃急救篇】晚晚OT追劇變「黃面婆」？B3果酸幫你一秒掃黃！', '日日捱夜，朝早起身照鏡見到自己面色暗沉、枯黃無光澤？加上啲頑固痘印同雀斑，真係望見都覺得頹 ！想極速還原透亮白滑肌？', '日日捱夜，朝早起身照鏡見到自己面色暗沉、枯黃無光澤？加上啲頑固痘印同雀斑，真係望見都覺得頹 😩！想極速還原透亮白滑肌？

康姿健特選 TEGODER 淨白抗齡B3果酸 29 (White Renover Peeling)，專門拯救偏黃、暗啞、雀斑同色素沉澱嘅疲勞肌！
呢款配方結合咗 4 大「WHITE」協同成分：
🤍 乳酸 (軟化)： 軟化角質，滋潤保濕。
🤍 乙醇酸 (脫落)： 溫和去除老化角質及積聚色素。
🤍 維他命 B3 (阻止)： 阻止色素堆積，強力去黃氣。
🤍 傳明酸 (抑制)： 從根源減少製造黑色素。

美容師會配合專業人手護理，將精華滿滿送入肌底！做完一次，膚色即刻均勻提亮，好似自帶補光燈咁發光 😍！康姿健堅持單次收費，明碼實價，絕不硬銷。今個週末，俾自己一個重拾亮白嘅機會啦！

#去黃美白 #熬夜肌急救 #B3果酸 #傳明酸 #單次收費', '熬夜去黃急救', '2026-06-15', '/images/social/2606-熬夜去黃急救篇-晚晚OT追劇變-黃面婆-B3果酸幫你一秒掃黃.webp', '【熬夜去黃急救篇】晚晚OT追劇變「黃面婆」？B3果酸幫你一秒掃黃！', '2606-熬夜去黃急救篇-晚晚OT追劇變-黃面婆-B3果酸幫你一秒掃黃', ARRAY['2606-熬夜去黃急救篇-晚晚OT追劇變-黃面婆-B3果酸幫你一秒掃黃']::text[], 'published', 4, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2604-r3', '【人氣推介篇】洗極面都覺得污糟？ 告別敏感肌膚！深層清潔極致補濕還原白滑水潤BB肌！', '人氣療程推介！平日返工咁大壓力，放假最想就係舒舒服服做個人手 Facial 。', '人氣療程推介！平日返工咁大壓力，放假最想就係舒舒服服做個人手 Facial 💆🏻‍♀️。

我哋嘅深層清潔補濕人手 Facial，選用西班牙頂級醫學護膚品牌
由落妝、深層清潔、角質重建，到舒緩按摩同保濕面膜，每一步都係美容師溫柔細心嘅純熟手勢。有時機做雖然快，但人手按摩嗰種溫度同放鬆感，真係無可取代。

無硬銷，無隱藏收費，俾你真正享受零壓力嘅護膚體驗！快啲 Inbox 預約啦 🌿。

#康姿健 #深層清潔 #人手Facial #保濕護理 #單次收費', '人氣推介', '2026-04-15', '/images/social/2604-人氣推介篇-洗極面都覺得污糟-告別敏感肌膚-深層清潔-極致補濕-還原白滑水潤BB肌.webp', '【人氣推介篇】洗極面都覺得污糟？ 告別敏感肌膚！深層清潔極致補濕還原白滑水潤BB肌！', '2604-人氣推介篇-洗極面都覺得污糟-告別敏感肌膚-深層清潔-極致補濕-還原白滑水潤BB肌', ARRAY['2604-人氣推介篇-洗極面都覺得污糟-告別敏感肌膚-深層清潔-極致補濕-還原白滑水潤BB肌']::text[], 'published', 7, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2603-r3', '【全方位美肌篇】針對色斑、毛孔、暗啞', '照鏡見到啲斑斑點點又深咗？毛孔又好似越來越大？ 唔洗煩惱！康姿健引入  韓國 Ruikd Genelux Lite 納秒激光，一部機幫你做齊「去斑、嫩膚、美白」！', '照鏡見到啲斑斑點點又深咗？毛孔又好似越來越大？😩 唔洗煩惱！康姿健引入 🇰🇷 韓國 Ruikd Genelux Lite 納秒激光，一部機幫你做齊「去斑、嫩膚、美白」！
🔥 點解佢咁勁？ ✅ 納秒技術．秒殺黑色素： 利用 Q-Switched Nd:YAG 納秒激光，直接擊碎底層黑色素，針對性極強，唔會傷到周邊皮膚。
✅ 深淺層斑．一網打盡： 無論係淺層嘅曬斑，定係深層嘅荷爾蒙斑，佢都有專屬嘅波長同治療頭（包括蜂巢荷爾蒙斑頭）去處理。
✅ 唔止去斑．仲係急救神器： 除咗打斑，佢仲可以 收細毛孔、去暗瘡印、撫平凹凸洞，甚至幫你 美白嫩膚。做完皮膚即刻光澤度 Up！✨

🛡️ 安全認證．信心保證 獲 KFDA、CE、GMP 及 ISO 多項國際認證，加上係韓國醫護團隊推薦，絕對安全可靠。
想皮膚白淨無瑕？Inbox 我哋預約試下啦！💖

#康姿健 #GeneluxLite #納秒激光 #去斑 #收毛孔 #美白 #去暗瘡印 #凹凸洞 #屯門美容 #KFDA認證', '全方位美肌', '2026-03-15', '/images/social/2603-全方位美肌篇-針對色斑-毛孔-暗啞.webp', '【全方位美肌篇】針對色斑、毛孔、暗啞', '2603-全方位美肌篇-針對色斑-毛孔-暗啞', ARRAY['2603-全方位美肌篇-針對色斑-毛孔-暗啞']::text[], 'published', 16, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2602-r3', 'COLLAZEN 
膠原小旋風 
滿足 5 個願望', ' 選擇困難「COLLAZEN 膠原美肌小旋風 」滿足 5 個願望「清潔補水塑廓再生滋養」，由 A 到 Z 全方位照顧肌膚需求！', '【 選擇困難⁉️「COLLAZEN 膠原美肌小旋風 」滿足 5️⃣ 個願望「清潔．補水．塑廓．再生．滋養」，由 A 到 Z 全方位照顧肌膚需求！】
每次去美容院都要諗今次做咩好... 做清潔就做唔到提拉？做完機又驚乾？🤔「COLLAZEN 膠原美肌小旋風 」5️⃣ 重護膚輕鬆一次過搞掂～

1️⃣ 清潔｜SonoClean 毛孔大掃除｜34KHz 超聲波無痛震走死皮、黑頭、油脂
2️⃣ 補水｜3-Way Sono 水滴提拉｜同時輸出三個頻率，將水分穿透淺、中、深層肌膚，覆蓋99%肌膚問題，加乘修復，打造飲飽水嘅「水光肌」
3️⃣ 塑廓｜3-Way HIFU 逆齡 V 面｜突破性同時輸出能量直達表皮層 (1.5mm) ➕ 真皮層 (3.0mm) ➕ 筋膜層 (4.5mm)，全方位內到外重現輪廓線！
4️⃣ 再生｜RF 膠原再生｜喚醒膠原蛋白再生，增加皮膚彈性、改善膚質
5️⃣ 滋養｜Cryo 冰火修復｜冷暖交替＋離子滲透，強效鎮靜鎖水

👉🏻 趕時間又想靚？想變靚又唔知做咩療程好？一部機搞掂！ 即刻 Inbox 預約體驗全能護膚旅程啦！

#康姿健 #COLLAZENTornado #HIFU #懶人護膚 #屯門美容', '儀器療程', '2026-02-15', '/images/social/2602-COLLAZEN-膠原小旋風-滿足-5-個願望.webp', 'COLLAZEN 
膠原小旋風 
滿足 5 個願望', '2602-COLLAZEN-膠原小旋風-滿足-5-個願望', ARRAY['2602-COLLAZEN-膠原小旋風-滿足-5-個願望']::text[], 'published', 22, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2601-r4', '冬天寒流', ' 寒流襲港！你塊面有無「爆拆」警告？', '❄️ 寒流襲港！你塊面有無「爆拆」警告？🚨

天文台話氣溫急降！🥶 大家有無著夠衫？ 除咗身要暖，面都要錫住呀！ 天氣又乾又凍，好多客人都話塊面紅卜卜、那那地，甚至乾到甩皮... 🍂 👩🏻‍⚕️ 小編溫馨提提你：

＞ 切忌用熱水洗面 🚫：水溫太高會洗走油脂，令皮膚更乾！
＞ 加強保濕鎖水 💧：唔好懶，面霜要搽厚少少。
＞ 暫停磨砂 🛑：皮膚脆弱時，千祈唔好做強烈去角質。

如果覺得皮膚真係好乾、好繃緊， 推介試下我哋嘅 Bioskin 精華導入療程， 針對性舒緩降紅，幫皮膚起返個「防護盾」🛡️！
👉🏻 天氣凍，入嚟康姿健暖笠笠做 Facial 係一種享受～

#康姿健 #護膚小貼士 #敏感肌 #保濕鎖水 #乾燥', '護膚知識', '2026-01-15', '/images/social/2601-冬天寒流.jpeg', '冬天寒流', '2601-冬天寒流', ARRAY['2601-冬天寒流']::text[], 'published', 28, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2604-r8', '【無痕脫疣篇】面上頸上生滿「細肉粒」？', '照鏡發現面頰、眼周或者頸部無啦啦多咗啲細細粒嘅凸起物？以為係油脂粒或者粉刺，點知擠極都唔出？ 小心！呢啲好有可能係「疣」！如果抵抗力差或者忍唔住佢，仲會越生越多，甚至蔓延全塊面 ！對付疣唔洗驚，康姿健幫到你 ！', '照鏡發現面頰、眼周或者頸部無啦啦多咗啲細細粒嘅凸起物？以為係油脂粒或者粉刺，點知擠極都唔出？😰 小心！呢啲好有可能係「疣」！如果抵抗力差或者忍唔住𢯎佢，仲會越生越多，甚至蔓延全塊面 😨！對付疣唔洗驚，康姿健幫到你 🦸‍♀️！

我哋嘅【疣、痣、扁平疣去除療程】選用先進嘅 PLASER 等離子儀，利用 1-PIN 單點模式產生嘅熱等離子 ，精準地將疣體氣化脫落。過程快、準，而且比起傳統方法更保護周邊健康皮膚，1次治療已經效果顯著 ✨ ！💰 康姿健堅持明碼實價，單次收費絕不硬銷：

✨ 單粒精準脫：疣體小於 1mm 只需 $50/粒 (2mm $100/粒 , 3mm $300/粒 )
🔥 超高性價比推介： 全面任脫 (疣體 < 1mm) 只需 $1280/次 ！一次過幫你清走全臉細疣，無隱藏收費 ！
👩‍⚕️ 療程後貼士： 脫完疣記住喺凹陷位置貼返修復貼 ，嚴格做好防曬、避開高溫 ，同埋暫停使用 AHA/BHA/PHA 等酸類煥膚產品 ，咁就復原得靚靚啦！

快啲 Inbox 我哋預約，還原白滑無瑕肌啦 💌！

#脫疣 #扁平疣 #PLASER等離子 #明碼實價 #屯門美容院', '無痕脫疣', '2026-04-15', '/images/social/2604-無痕脫疣篇-面上頸上生滿-細肉粒.webp', '【無痕脫疣篇】面上頸上生滿「細肉粒」？', '2604-無痕脫疣篇-面上頸上生滿-細肉粒', ARRAY['2604-無痕脫疣篇-面上頸上生滿-細肉粒']::text[], 'published', 12, '2026-06-16T10:19:43.695123+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2603-r5', '黑科技登場！超越激光的修復力？一部「等離子」機做齊【殺菌美白緊緻】', '成日聽人講做 Facial 要「先破壞後建設」，搞到塊面紅卜卜？ 康姿健引入全新概念 PLASER Air Plaser 等離子儀，話你知咩叫「無創修復」！', '成日聽人講做 Facial 要「先破壞後建設」，搞到塊面紅卜卜？😰 康姿健引入全新概念 PLASER (Air Plaser) 等離子儀，話你知咩叫「無創修復」！
這部機擁有 德國專利 Flyzer 技術 ，結合咗兩大黑科技手柄，一次過滿足你 N 個願望：

1️⃣ Air Plasma (空氣等離子)：打開肌膚隨意門 🚪 平時搽極精華都唔吸收？Air Plasma 可以暫時打開細胞黏附分子，令護膚品 吸收率激增 120 倍！ 同時仲有強勁殺菌、抗炎功效，係暗瘡肌同敏感肌嘅救星！
2️⃣ RF Plasma (射頻等離子)：深層膠原炸彈 💣 利用高能離子深入真皮層，唔洗拮針都可以刺激 膠原蛋白 (Collagen) 同彈性蛋白 (Elastin) 再生！👉🏻 效果： 收細毛孔、撫平皺紋、提升輪廓，甚至改善凹凸洞！

 ✅ 無創傷、無痛感：舒舒服服就可以靚住走 。 ✅ 全方位管理：由表皮到真皮層都照顧到，真正的「由內到外」。
想試下喚醒沉睡嘅細胞？快啲 Inbox 我哋預約「等離子」體驗啦！

#康姿健 #PLASER #等離子 #無創水光 #膠原再生 #收毛孔 #暗瘡救星 #德國技術 #屯門美容', '殺菌．美白．緊緻', '2026-03-15', '/images/social/2603-黑科技登場-超越激光的修復力-一部-等離子-機做齊-殺菌-美白-緊緻.webp', '黑科技登場！超越激光的修復力？一部「等離子」機做齊【殺菌美白緊緻】', '2603-黑科技登場-超越激光的修復力-一部-等離子-機做齊-殺菌-美白-緊緻', ARRAY['2603-黑科技登場-超越激光的修復力-一部-等離子-機做齊-殺菌-美白-緊緻']::text[], 'published', 18, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2512-r2', '聖誕節優惠 
- 紅外線焗倉', '今年聖誕送你「由內靚到外」嘅健康美肌禮物！ 惠顧任何項目  即送 DrRainbow 遠紅外線焗倉 ', '🎅🏻✨今年聖誕送你「由內靚到外」嘅健康美肌禮物！‼️ 惠顧任何項目 🆓 即送 Dr.Rainbow 遠紅外線焗倉 🔴

「🌈 Dr Rainbow 醫療級遠紅外線焗倉有咩咁勁？」
並非一般汗蒸！佢係真正「醫療級」 遠紅外線可以直達皮膚底層 5cm，被全球認可為最能深入人體嘅「生命之光」。
⭕ 活化細胞！促進血液循環，排走重金屬＋毒素＋化妝品殘留
⭕ 女士恩物｜纖體燃脂、暖宮散寒、改善經痛、月經不調、宮寒
⭕ 醫療級養生｜改善全身痛症、抗三高、改善失眠

想靚？想瘦？想改善手腳冰冷？呢個儀器一定幫到你 🤭
🎄 年尾就係要好好善待自己～ 做美容之餘，又可以順便做身體調理，由內暖到外，排汗排毒後成個人輕盈晒、精神咗、由內到外健康咗！

‼️ 惠顧任何項目💥 即送 Dr Rainbow 醫療級遠紅外線焗倉｜全身照足 50分鐘 ‼️
⭐️ 韓國KFDA、美國FDA、CE等專利認證 ⭐️ 安全高效 ⭐️', '痛症理療', '2025-12-15', '/images/social/2512-聖誕節優惠-紅外線焗倉.webp', '聖誕節優惠 
- 紅外線焗倉', '2512-聖誕節優惠-紅外線焗倉', ARRAY['2512-聖誕節優惠-紅外線焗倉']::text[], 'published', 31, '2026-06-16T10:18:55.469317+00:00')
on conflict do nothing;
insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order, updated_at) values ('2510-r3', '微針射頻膠原修復療程', '  微針射頻膠原修復術 「緊緻提拉逆齡」一機完成！', '【 🔬 微針射頻膠原修復術 💎】「緊緻・提拉・逆齡」一機完成！

用 PLASER 微針能量深入真皮層，由肌底刺激膠原蛋白新生，即時回復緊緻有彈性！過程無創、無痛、無恢復期 ～
🎯 適合：皮膚鬆弛、初老肌、有皺紋或動態紋、毛孔粗大

【微針射頻膠原修復】療程｜只需$880 
＋＄300 升級 Bioskin 精華💧
⭐️ 挑選專屬你膚質嘅配搭！對症下藥，功效倍增 ⭐️
 ➤ BSK36 膠原賦活精華｜抗老補水、適合乾肌、鬆弛肌
 ➤ BSK3 抗皺精華｜放鬆動態紋、皺紋、頸紋
 ➤ BSK6 修復精華｜膠原重生，針對痘疤、初老肌
❌ 無香精・無酒精・無刺激・敏感肌都安心使用', '儀器療程', '2025-10-15', '/images/social/2510-微針射頻膠原修復療程.webp', '微針射頻膠原修復療程', '2510-微針射頻膠原修復療程', ARRAY['2510-微針射頻膠原修復療程']::text[], 'published', 41, '2026-06-16T10:16:39.042182+00:00')
on conflict do nothing;

-- kz_cms_faqs (15)
insert into public.kz_cms_faqs (id, question, answer, sort_order, status, updated_at) values ('5afb8e1b-740e-4e35-8901-c39c5cb99150', '會唔會硬銷療程套裝？', '唔會。我哋堅持單次收費，量膚分析完先建議療程，做唔做由你決定。', 0, 'published', '2026-06-16T10:57:49.600811+00:00')
on conflict do nothing;
insert into public.kz_cms_faqs (id, question, answer, sort_order, status, updated_at) values ('1b803f8f-edb1-4989-8b0e-ed2c7771621c', '價錢點樣顯示？', '有啲療程明碼單次價（例如微針射頻 $880、等離子抗痘 $680）。要量膚定制或組合嘅會寫「諮詢報價」，WhatsApp 或 IG 問我哋就得。', 1, 'published', '2026-06-16T10:57:49.718105+00:00')
on conflict do nothing;
insert into public.kz_cms_faqs (id, question, answer, sort_order, status, updated_at) values ('bc6f982a-fc90-4593-9c89-5676bb48930c', '點樣預約？', '主要用 WhatsApp 或 Instagram DM，亦可以用官網引導式預約頁。', 2, 'published', '2026-06-16T10:57:49.835626+00:00')
on conflict do nothing;
insert into public.kz_cms_faqs (id, question, answer, sort_order, status, updated_at) values ('b904affc-0ca4-4f77-ac9f-4e9f6e4d8be1', '第一次應該預約咩？', '建議先約「量膚分析」，了解膚質之後再揀啱嘅療程。', 3, 'published', '2026-06-16T10:57:49.947698+00:00')
on conflict do nothing;
insert into public.kz_cms_faqs (id, question, answer, sort_order, status, updated_at) values ('0a6471ac-7e78-442b-8812-6057555162d5', '有男賓服務嗎？', '有。官網有獨立「男賓護理」專區，針清、激光護理等都有。', 4, 'published', '2026-06-16T10:57:50.063712+00:00')
on conflict do nothing;
insert into public.kz_cms_faqs (id, question, answer, sort_order, status, updated_at) values ('edfa43d2-2295-43ea-8192-10c532ae9462', '療程會唔會痛？', '睇療程而定。微針射頻可能有少少感覺，等離子煥膚就溫和啲。預約時可以問清楚。', 5, 'published', '2026-06-16T10:57:50.175148+00:00')
on conflict do nothing;
insert into public.kz_cms_faqs (id, question, answer, sort_order, status, updated_at) values ('cb36d58f-f40c-4bea-a5dc-7dda25f29fea', '喺邊度？', '屯門紅橋菁菱徑9號華利大廈12號（地舖）。', 6, 'published', '2026-06-16T10:57:50.28991+00:00')
on conflict do nothing;
insert into public.kz_cms_faqs (id, question, answer, sort_order, status, updated_at) values ('1e32e769-792b-4045-b280-5f35eddd0645', '營業時間？', '每日 09:00 – 21:00。有時會因突發情況調整，預約前問吓小店最穩陣。', 7, 'published', '2026-06-16T10:57:50.404676+00:00')
on conflict do nothing;
insert into public.kz_cms_faqs (id, question, answer, sort_order, status, updated_at) values ('3bfcee4e-ea03-493a-be03-25c1c8d5f5ed', '可以直接上門嗎？', '建議先預約。一人工作室，預約咗先有足夠時間幫你量膚同做療程，唔使白行一趟。', 8, 'published', '2026-06-16T10:57:50.516898+00:00')
on conflict do nothing;
insert into public.kz_cms_faqs (id, question, answer, sort_order, status, updated_at) values ('63e4bb75-f16d-4d08-8bf9-515bdb88b5d0', '療程大概要幾耐？', '睇療程而定，一般面部護理大約 60–90 分鐘；遠紅外線焗倉大約 30 分鐘。預約時可以再問。', 9, 'published', '2026-06-16T10:57:50.627242+00:00')
on conflict do nothing;
insert into public.kz_cms_faqs (id, question, answer, sort_order, status, updated_at) values ('2606522b-ec88-4218-9338-5af12035dfdd', '孕婦可以做療程嗎？', '有啲療程（如果酸、激光、HIFU）孕婦唔適合。預約時記得講聲，我哋會建議安全啲嘅選擇。', 10, 'published', '2026-06-16T10:57:50.74738+00:00')
on conflict do nothing;
insert into public.kz_cms_faqs (id, question, answer, sort_order, status, updated_at) values ('6a078b9a-fd19-46e6-9a26-236d0fbdbc5e', '痛症理療同美容可以同日做嗎？', '可以。好多客人做完 Facial 再焗遠紅外線，由內到外一齊調理。次序同間隔 WhatsApp 問我哋就得。', 11, 'published', '2026-06-16T10:57:50.859162+00:00')
on conflict do nothing;
insert into public.kz_cms_faqs (id, question, answer, sort_order, status, updated_at) values ('2d2fba16-b0be-4b93-9618-2409c819e191', '有冇泊車位？', '店喺屯門紅橋菁菱徑華利大廈地舖，附近有屋苑同路邊位，跟現場指示泊就得。', 12, 'published', '2026-06-16T10:57:50.976261+00:00')
on conflict do nothing;
insert into public.kz_cms_faqs (id, question, answer, sort_order, status, updated_at) values ('b2709c44-f673-4801-b0a6-63e0fc72dee5', '取消或改期點算？', '盡早 WhatsApp 或 IG 通知改期，方便幫其他客人排時間。', 13, 'published', '2026-06-16T10:57:51.087242+00:00')
on conflict do nothing;
insert into public.kz_cms_faqs (id, question, answer, sort_order, status, updated_at) values ('d569e4f0-ce1c-4e44-a4f8-a75028a450f7', '第一次嚟要注意咩？', '建議早 5 分鐘到；如果有敏感、食緊藥或者最近做過其他美容療程，記得話俾我哋知。第一次可以約量膚分析。', 14, 'published', '2026-06-16T10:57:51.2028+00:00')
on conflict do nothing;

-- kz_cms_media (2)
insert into public.kz_cms_media (id, storage_path, public_url, filename, alt, folder, mime_type, size_bytes, created_at) values ('de6c245e-32ef-4a3c-aa1c-ed9750422084', 'treatments/1781610989128-man-1.png', 'https://nwywuatgkrmiibysbwkw.supabase.co/storage/v1/object/public/kz-cms/treatments/1781610989128-man-1.png', 'man-1.png', '男賓深層清潔護理', 'treatments', 'image/png', 1874376, '2026-06-16T11:56:32.29033+00:00')
on conflict do nothing;
insert into public.kz_cms_media (id, storage_path, public_url, filename, alt, folder, mime_type, size_bytes, created_at) values ('99eba453-6472-4eb1-a82b-5ea5604ff3ce', 'treatments/1781611588699-man-2.png', 'https://nwywuatgkrmiibysbwkw.supabase.co/storage/v1/object/public/kz-cms/treatments/1781611588699-man-2.png', 'man-2.png', '男賓激光護理', 'treatments', 'image/png', 1876236, '2026-06-16T12:06:32.071075+00:00')
on conflict do nothing;

-- kz_cms_shop_videos (35)
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (1, '09:05 AM 到店準備', '開門整理儀器、檢查產品架，迎接新一天。', '開店', 15.4, '/videos/reels/posters/1.jpg', '/videos/reels/1.mp4', '/about', 0, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (2, '重頭戲「冰導」來了', '冰導儀搭配精華，鎮靜收毛孔、加強滲透。', '療程', 45.6, '/videos/reels/posters/2.jpg', '/videos/reels/2.mp4', '/skin-analysis', 1, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (3, '客人平日喜愛化妝', '愛化妝的客人，深層清潔與儀器護理更要到位。', '療程', 24.1, '/videos/reels/posters/3.jpg', '/videos/reels/3.mp4', '/treatments/plasma-acne', 2, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (4, '濕氣重、背部長痘', '背痘與濕重體質，可配合退背與痛症理療。', '療程', 26.2, '/videos/reels/posters/4.jpg', '/videos/reels/4.mp4', '/wellness', 3, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (5, 'COLLAZEN 膠原小旋風', '門口海報 — 一打三黑科技，護膚講效率。', '療程', 22.1, '/videos/reels/posters/5.jpg', '/videos/reels/5.mp4', '/treatments/collazen', 4, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (6, '開始了 · 面部撥筋', '療程正式開始，溫和撥筋放鬆面部。', '療程', 52.6, '/videos/reels/posters/6.jpg', '/videos/reels/6.mp4', '/journal', 5, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (7, '儀器藥劑準備', '檢查療程用精華與探頭，確保每個細節。', '儀器', 30.7, '/videos/reels/posters/7.jpg', '/videos/reels/7.mp4', '/treatments', 6, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (8, '客人入店', '陽光午後，客人推門入店。', '日常', 94.1, '/videos/reels/posters/8.jpg', '/videos/reels/8.mp4', '/book', 7, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (9, 'Genelux Lite 激光嫩膚', '醫療級激光儀，針對色斑與膚色均勻。', '儀器', 22.2, '/videos/reels/posters/9.jpg', '/videos/reels/9.mp4', '/treatments/laser-spot', 8, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (10, '療程進行中', '專業儀器配合舒適環境，專注每一次護理。', '療程', 88.8, '/videos/reels/posters/10.jpg', '/videos/reels/10.mp4', '/treatments/collazen', 9, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (11, '屯門地舖 · 價目表', '門口價目 — 果酸、痛症、膠原提升一覽。', '門店', 42.6, '/videos/reels/posters/11.jpg', '/videos/reels/11.mp4', '/treatments', 10, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (12, '歡迎光臨', '親切迎客，讓每位客人都感到自在。', '日常', 84.6, '/videos/reels/posters/12.jpg', '/videos/reels/12.mp4', '/book', 11, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (13, '店內激光儀器', 'LASER 與 Ruikd 設備，專業環境一目了然。', '儀器', 15.9, '/videos/reels/posters/13.jpg', '/videos/reels/13.mp4', '/treatments/laser-spot', 12, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (14, '新客到訪', '新客人帶著笑容入店，期待今天的療程。', '日常', 90.5, '/videos/reels/posters/14.jpg', '/videos/reels/14.mp4', '/book', 13, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (15, '抽空開個箱', '新到貨品開箱，補充療程耗材與產品。', '產品', 36.1, '/videos/reels/posters/15.jpg', '/videos/reels/15.mp4', '/skin-analysis', 14, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (16, '1064 激光嫩膚', '1064nm 激光嫩膚，擊退暗沉、提亮膚色。', '儀器', 20.6, '/videos/reels/posters/16.jpg', '/videos/reels/16.mp4', '/treatments/laser-spot', 15, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (17, '屯門90後美容師工作日常', '整理門口、準備營業，真實的工作節奏。', '日常', 38.9, '/videos/reels/posters/17.jpg', '/videos/reels/17.mp4', '/about', 16, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (18, '沉浸式補貨的一天', '屯門90後美容師補貨日常，產品陳列歸位。', '產品', 33.8, '/videos/reels/posters/18.jpg', '/videos/reels/18.mp4', '/skin-analysis', 17, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (19, '推門迎客', '從店內望向門口，迎接預約客人。', '門店', 103.9, '/videos/reels/posters/19.jpg', '/videos/reels/19.mp4', '/book', 18, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (20, '我是屯門90後美容師', 'TEGODER、SOTHYS 專業產品，每日護理準備。', '日常', 47.5, '/videos/reels/posters/20.jpg', '/videos/reels/20.mp4', '/about', 19, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (21, 'COLLAZEN Tornado 啟動', '膠原小旋風五合一探頭，一機多效。', '儀器', 83.2, '/videos/reels/posters/21.jpg', '/videos/reels/21.mp4', '/treatments/collazen', 20, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (22, '康姿健地舖門面', '屯門紅橋地舖 — 痛症、推拿、美容、祛斑。', '門店', 26.4, '/videos/reels/posters/22.jpg', '/videos/reels/22.mp4', '/about', 21, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (23, 'PLASER 等離子設定', 'Multi-Point RF Plasma 參數調校。', '儀器', 29.4, '/videos/reels/posters/23.jpg', '/videos/reels/23.mp4', '/treatments/plaser-rf', 22, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (24, '療程凝膠準備', '敷上導電凝膠，為儀器療程做好準備。', '療程', 40.1, '/videos/reels/posters/24.jpg', '/videos/reels/24.mp4', '/treatments/plaser-rf', 23, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (25, '新貨到店', '快遞到貨，檢查包裝與品項。', '產品', 33.8, '/videos/reels/posters/25.jpg', '/videos/reels/25.mp4', '/skin-analysis', 24, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (26, '準備工作室', '拉開布簾，整理獨立護理空間。', '開店', 29, '/videos/reels/posters/26.jpg', '/videos/reels/26.mp4', '/about', 25, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (27, '歡迎收看 · 療程室一瞥', '第一視角睇療程室 — 儀器、手枕、專業環境一次過。', '日常', 25.1, '/videos/reels/posters/27.jpg', '/videos/reels/27.mp4', '/treatments', 26, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (28, 'PLASER 等離子儀 · 辭舊迎新', 'Multi-Point RF Plasma 參數設定，迎接新一年護膚節奏。', '儀器', 28.6, '/videos/reels/posters/28.jpg', '/videos/reels/28.mp4', '/treatments/plaser-rf', 27, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (29, '歡迎收看 · 向日葵門簾', '店門向日葵門簾與 Ruikd 儀器，屯門地舖的真實一角。', '門店', 24.3, '/videos/reels/posters/29.jpg', '/videos/reels/29.mp4', '/book', 28, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (30, '產品資料整理', '翻閱品牌手冊，確認療程方案與成分。', '產品', 49.5, '/videos/reels/posters/30.jpg', '/videos/reels/30.mp4', '/skin-analysis', 29, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (31, '大家好，我是屯門90後美容師', 'ITEC LV4 激光資歷，量膚定制為本。', '日常', 61, '/videos/reels/posters/31.jpg', '/videos/reels/31.mp4', '/about', 30, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (32, '抽空補個貨', '面膜與耗材補貨，陳列得整整齊齊。', '產品', 35.8, '/videos/reels/posters/32.jpg', '/videos/reels/32.mp4', '/skin-analysis', 31, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (33, '09:00 AM 客人快到了', '陽光灑入店門，早上預約即將開始。', '開店', 31.7, '/videos/reels/posters/33.jpg', '/videos/reels/33.mp4', '/book', 32, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (34, '09:30 AM 客人快到了', '屯門地舖早晨，準備迎接第一位客人。', '開店', 35, '/videos/reels/posters/34.jpg', '/videos/reels/34.mp4', '/book', 33, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;
insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status, updated_at) values (35, '面部按摩撥筋', '很多客人好奇的撥筋手法，放鬆筋膜、改善循環。', '療程', 79.1, '/videos/reels/posters/35.jpg', '/videos/reels/35.mp4', '/wellness', 34, 'published', '2026-06-16T10:50:02.764866+00:00')
on conflict do nothing;

commit;

-- Admins skipped: create Auth user first, then insert into kz_cms_admins.
