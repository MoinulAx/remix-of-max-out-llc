-- ============ PARTNERS ============
INSERT INTO public.partners (name, website, description, sort_order) VALUES
  ('CPK Shawn', 'https://instagram.com/cpkshawn', 'Producer — multi-platinum collaborator behind chart-topping records.', 1),
  ('Bizzaro Beats', 'https://bizzarobeats.com', 'Production house specializing in cinematic hip-hop and trap instrumentals.', 2),
  ('Nologo', 'https://nologo.co', 'Independent creative agency for streetwear-adjacent music brands.', 3),
  ('Hip Hop Global', 'https://hiphopglobal.com', 'Editorial network covering global hip-hop culture and emerging artists.', 4),
  ('Hip Hop Fraternity', 'https://hiphopfraternity.com', 'Cultural collective uplifting underground voices through events and media.', 5),
  ('Moms Break Zone', 'https://momsbreakzone.com', 'Lifestyle and wellness brand partner for community campaigns.', 6),
  ('Hit Da Beat Ent', 'https://hitdabeatent.com', 'Entertainment company managing tours, syncs, and label services.', 7),
  ('RummSpace', 'https://rummspace.com', 'Lead software architecture — platform engineering for Max Out Management.', 8);

-- ============ ROSTER — LEADERSHIP ============
INSERT INTO public.roster (name, category, bio, social_links, sort_order) VALUES
  ('Rasheed Moon', 'leadership',
   'Owner & CEO of Max Out Management. Architect of the Discover-Develop-Maximize method, guiding artists from raw potential to cultural impact.',
   '{"title":"Owner & CEO","is_founder":true,"instagram":"https://instagram.com/rasheedmoon"}'::jsonb, 1),
  ('Adeola Oni', 'leadership',
   'Creative Director & lead videographer. Crafts cinematic visual identities for every artist on the roster.',
   '{"title":"Creative Director & Videographer","instagram":"https://instagram.com/adeolaoni"}'::jsonb, 2),
  ('Casalo D', 'leadership',
   'Talent Manager. Owns day-to-day artist development, scheduling, and growth strategy.',
   '{"title":"Talent Manager","instagram":"https://instagram.com/casalod"}'::jsonb, 3),
  ('Shomari', 'leadership',
   'A&R. Curates the sound, sources beats, and runs label relationships across the roster.',
   '{"title":"A&R","instagram":"https://instagram.com/shomari"}'::jsonb, 4),
  ('Jayden M', 'leadership',
   'Lead Editor. Shapes long- and short-form content into release-ready cuts for every platform.',
   '{"title":"Editor","instagram":"https://instagram.com/jaydenm"}'::jsonb, 5),
  ('Brian', 'leadership',
   'PR. Press, placements, and brand storytelling across editorial and DSP partners.',
   '{"title":"PR","instagram":"https://instagram.com/brianpr"}'::jsonb, 6),
  ('RummSpace', 'leadership',
   'Lead Software Architecture. Builds and maintains the Max Out platform, web presence, and internal tooling.',
   '{"title":"Lead Software Architecture","instagram":"https://instagram.com/rummspace"}'::jsonb, 7);

-- ============ ROSTER — TALENT ============
INSERT INTO public.roster (name, category, bio, social_links, sort_order) VALUES
  ('EV09 Loso', 'Artists, Models & Actors',
   'Featured artist. Melodic trap with cinematic storytelling — currently leading the YouTube release rotation.',
   '{"instagram":"https://instagram.com/ev09loso","spotify":"https://open.spotify.com/artist/ev09loso"}'::jsonb, 10),
  ('Sky Bank', 'Artists, Models & Actors',
   'Rising artist with a hard-hitting Midwest sound and growing club presence.',
   '{"instagram":"https://instagram.com/skybank"}'::jsonb, 11),
  ('Sstels', 'Artists, Models & Actors',
   'R&B/hip-hop hybrid artist. Known for genre-blurring vocal arrangements.',
   '{"instagram":"https://instagram.com/sstels"}'::jsonb, 12),
  ('Runway', 'Artists, Models & Actors',
   'High-energy performer balancing bars, fashion, and visual presentation.',
   '{"instagram":"https://instagram.com/runway"}'::jsonb, 13),
  ('Use Knight', 'Artists, Models & Actors',
   'Lyric-first artist with a dark, atmospheric production palette.',
   '{"instagram":"https://instagram.com/useknight"}'::jsonb, 14),
  ('Don''t Stop It', 'Artists, Models & Actors',
   'Duo bringing relentless energy to live shows and viral short-form content.',
   '{"instagram":"https://instagram.com/dontstopit"}'::jsonb, 15),
  ('Film by Jwxra', 'Content Creators',
   'Photographer and visual director. Shoots covers, BTS, and editorial sets across the Max Out roster.',
   '{"instagram":"https://instagram.com/filmbyjwxra"}'::jsonb, 20),
  ('Adeola Oni Films', 'Content Creators',
   'Long-form video content arm of Creative Director Adeola Oni — cinematic releases for the roster.',
   '{"instagram":"https://instagram.com/adeolaoni_films"}'::jsonb, 21),
  ('CPK Shawn (Production)', 'Producers, Engineers & A&R',
   'Producer partner. Multi-platinum credits and a signature melodic-trap sound.',
   '{"instagram":"https://instagram.com/cpkshawn"}'::jsonb, 30),
  ('Bizzaro Beats (Production)', 'Producers, Engineers & A&R',
   'Beat collective handling production for several artists on the roster.',
   '{"instagram":"https://instagram.com/bizzarobeats"}'::jsonb, 31),
  ('Shomari (A&R)', 'Producers, Engineers & A&R',
   'A&R on the leadership team — beat sourcing, vocal direction, and label coordination.',
   '{"instagram":"https://instagram.com/shomari_ar"}'::jsonb, 32);

-- ============ CAREERS ============
INSERT INTO public.careers (title, department, location, type, salary_range, description, requirements, is_active, display_order) VALUES
  ('Social Media Marketing Intern', 'Marketing', 'Remote', 'Internship', 'Unpaid · College credit available',
   'Plan, schedule, and analyze content across Instagram, TikTok, and YouTube Shorts for our roster of artists. Work directly with the Creative Director on campaign rollouts.',
   ARRAY['Active on TikTok and Instagram','Strong written voice and copywriting','Basic familiarity with analytics dashboards','Available 10–15 hrs/week'], true, 1),
  ('Artist Management Intern', 'A&R', 'Hybrid', 'Internship', 'Unpaid · College credit available',
   'Shadow our talent managers — calendar coordination, release rollouts, studio logistics, and artist development tasks.',
   ARRAY['Passion for hip-hop and R&B','Highly organized and responsive','Comfortable with Notion and Google Workspace'], true, 2),
  ('A&R Scout Intern', 'A&R', 'Remote', 'Internship', 'Unpaid · College credit available',
   'Discover emerging artists across SoundCloud, TikTok, and local scenes. Build scouting reports for the A&R team.',
   ARRAY['Deep knowledge of underground hip-hop','Strong taste and ability to articulate it','Comfortable cold-DM''ing artists'], true, 3),
  ('Graphic Design / Content Intern', 'Creative', 'Remote', 'Internship', 'Unpaid · College credit available',
   'Design release covers, IG carousels, and short-form video graphics for our artists.',
   ARRAY['Portfolio in Figma, Photoshop, or Illustrator','After Effects or Premiere a plus','Ability to match brand voice'], true, 4),
  ('Talent Manager', 'A&R', 'Remote', 'Contract', 'Commission-based',
   'Bring in and develop new artists. Own the full development cycle — from signing through first major release.',
   ARRAY['2+ years in artist management','Existing producer/engineer network','Strong negotiation and contract literacy'], true, 5),
  ('Booking Agent', 'Live', 'Remote', 'Contract', 'Commission-based',
   'Book shows, festival slots, and brand activations for the Max Out roster.',
   ARRAY['Existing venue/promoter relationships','Comfortable with rider negotiation','Track record of booked dates'], true, 6),
  ('Brand Partnership Specialist', 'Business Development', 'Remote', 'Contract', 'Commission-based',
   'Source and close sponsorship and partnership deals between Max Out artists and consumer brands.',
   ARRAY['Sales background in entertainment, fashion, or DTC','Pitch deck and outreach experience','Comfortable with revenue-share structures'], true, 7),
  ('Sales Representative', 'Business Development', 'Remote', 'Contract', 'Commission-based',
   'Sell Max Out''s creative services (video, photo, marketing) to outside artists, labels, and brands.',
   ARRAY['B2B sales experience','Comfortable with cold outreach','Self-managed and quota-driven'], true, 8);

-- ============ CONTENT HUB ============
INSERT INTO public.content_hub_posts (title, media_type, platform, media_url, is_published, sort_order) VALUES
  ('EV09 Loso — Featured Release', 'youtube', 'youtube', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', true, 1),
  ('Sky Bank — Latest Drop', 'youtube', 'youtube', 'https://www.youtube.com/watch?v=L_jWHffIx5E', true, 2),
  ('Sstels — Studio Session', 'youtube', 'youtube', 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ', true, 3),
  ('Runway — Performance Cut', 'youtube', 'youtube', 'https://www.youtube.com/watch?v=hT_nvWreIhg', true, 4),
  ('Use Knight — Visualizer', 'youtube', 'youtube', 'https://www.youtube.com/watch?v=OPf0YbXqDm0', true, 5),
  ('Don''t Stop It — Live BTS', 'youtube', 'youtube', 'https://www.youtube.com/watch?v=kJQP7kiw5Fk', true, 6),
  ('Studio with EV09 Loso', 'social', 'instagram', 'https://instagram.com/p/CXXX1', true, 10),
  ('Behind the scenes — Runway shoot', 'social', 'instagram', 'https://instagram.com/p/CXXX2', true, 11),
  ('Sky Bank green room takeover', 'social', 'tiktok', 'https://tiktok.com/@maxout/video/123', true, 12),
  ('Press day — Hip Hop Global feature', 'social', 'instagram', 'https://instagram.com/p/CXXX3', true, 13),
  ('Max Out Showreel 2024', 'video', 'upload', 'https://cdn.example.com/maxout-showreel-2024.mp4', true, 20),
  ('Roster Sizzle — Q4', 'video', 'upload', 'https://cdn.example.com/roster-sizzle-q4.mp4', true, 21),
  ('EV09 Loso — Cover Art', 'image', 'image', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200', true, 30),
  ('Studio Session — Group Shot', 'image', 'image', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200', true, 31),
  ('Press Day Polaroid', 'image', 'image', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200', true, 32);

-- ============ SERVICES ============
INSERT INTO public.services (title, description, category, starting_price, features, is_active, display_order) VALUES
  ('Artist Development', 'End-to-end development under the Discover-Develop-Maximize method.', 'Management', 'Custom',
   ARRAY['Brand & sound development','Release planning','Studio coordination','Press & PR rollout'], true, 1),
  ('Music Video Production', 'Cinematic music videos shot and edited by the Max Out creative team.', 'Creative', '$2,500',
   ARRAY['Pre-production & treatment','Full-day shoot','Color & sound mix','Two rounds of revisions'], true, 2),
  ('Social Media Content Package', 'Monthly short-form content tailored for IG Reels, TikTok, and YouTube Shorts.', 'Creative', '$1,200/mo',
   ARRAY['8 short-form videos','Captions & hashtag strategy','Posting schedule','Monthly analytics report'], true, 3),
  ('PR & Press Campaign', 'Editorial, blog, and DSP playlist outreach for new releases.', 'PR', '$1,500',
   ARRAY['Press release writing','Editorial pitching','DSP playlist outreach','Two-week active campaign'], true, 4),
  ('Booking & Live Strategy', 'Show booking and live performance strategy for emerging artists.', 'Live', 'Commission-based',
   ARRAY['Venue & promoter outreach','Rider & contract review','Tour routing','On-site coordination available'], true, 5);

-- ============ Clean placeholder inquiry, then seed inquiries ============
DELETE FROM public.inquiries WHERE name ILIKE 'test%' OR email ILIKE '%test@test%';

INSERT INTO public.inquiries (name, email, phone, type, message, status, created_at) VALUES
  ('Marcus Williams', 'marcus@atlanticrec.com', '+1-404-555-0142', 'booking',
   'Interested in booking EV09 Loso for our spring showcase in Atlanta on April 18. Capacity ~800. Please send rates and availability.', 'new', now() - interval '2 hours'),
  ('Tasha Reed', 'tasha@noisemag.com', NULL, 'booking',
   'Press request — we''d like to feature Sky Bank in our Rising Voices column next month. Need 30-min phone interview.', 'new', now() - interval '1 day'),
  ('Devin Park', 'devin.park@gmail.com', '+1-718-555-0188', 'management',
   'Independent artist out of Brooklyn looking for management. 2 EPs out, growing TikTok presence. Would love to chat.', 'in_progress', now() - interval '3 days'),
  ('Jordan Lee', 'jordan@hithefraternity.com', NULL, 'booking',
   'Co-promoting a Hip Hop Fraternity event in Houston — interested in a 3-artist package from your roster. Date flexible.', 'new', now() - interval '5 hours'),
  ('Renee Castillo', 'renee@momsbreakzone.com', '+1-323-555-0111', 'management',
   'Brand partnership inquiry on behalf of Moms Break Zone — looking to co-create content with one of your female artists.', 'in_progress', now() - interval '6 days'),
  ('Anonymous Sender', 'tips@example.com', NULL, 'booking',
   'Quick question about availability for a private corporate event in Q3. Budget mid-five figures.', 'closed', now() - interval '14 days'),
  ('Karim Otieno', 'karim@bizzarobeats.com', '+1-212-555-0190', 'management',
   'Producer collab — pitching beats to Sstels and Use Knight. Where do I send the pack?', 'new', now() - interval '20 minutes'),
  ('Sarah Chen', 'sarah.chen@dspromo.io', NULL, 'booking',
   'Festival slot opportunity for one of your headliners — SXSW unofficial showcase, March 14. Two 30-min sets.', 'archived', now() - interval '45 days');

-- ============ APPLICATIONS ============
INSERT INTO public.applications (name, email, phone, portfolio, experience, why_interested, status, created_at) VALUES
  ('Alex Rivera', 'alex.rivera@gmail.com', '+1-646-555-0121', 'https://alexrivera.cargo.site',
   '3 years freelance graphic design — clients include indie labels and streetwear brands. Lead designer on two album rollouts.',
   'I''ve been following Max Out''s rollouts for EV09 Loso — the visual language is exactly what I want to be part of building.',
   'new', now() - interval '6 hours'),
  ('Priya Natarajan', 'priya.n@protonmail.com', NULL, 'https://priyacreates.com',
   'Social media manager at a boutique PR firm for 2 years. Grew a client account from 12k to 180k IG followers in 9 months.',
   'I want to apply growth playbooks to a roster instead of single artists. Max Out feels like the right scale.',
   'in_progress', now() - interval '2 days'),
  ('Tyrell Banks', 'tyrellb@gmail.com', '+1-832-555-0103', NULL,
   'Self-taught A&R, 5+ years scouting in the Houston scene. Currently consulting for two indie labels.',
   'I scout the same artists you sign — would rather do it inside Max Out than from the outside looking in.',
   'new', now() - interval '4 days'),
  ('Mei Tanaka', 'mei.t@outlook.com', '+1-415-555-0177', 'https://meitanakavideo.com',
   '4 years editing music videos and brand content. Premiere + DaVinci. Worked on a Bizzaro Beats visualizer last year.',
   'Cross-paths with your team via Bizzaro. Want to bring my edit style into your roster work full-time.',
   'closed', now() - interval '12 days');

-- ============ JOB APPLICATIONS ============
INSERT INTO public.job_applications (job_id, name, email, phone, cover_letter, portfolio_url, status, created_at)
SELECT j.id, x.name, x.email, x.phone, x.cover_letter, x.portfolio_url, x.status, x.created_at
FROM public.careers j
JOIN (VALUES
  ('Social Media Marketing Intern', 'Jada Williams', 'jada.w@nyu.edu', '+1-917-555-0144',
   'NYU junior studying media studies. I run two niche IG meme pages (combined 90k) and want to apply that audience-building instinct to artist marketing.',
   'https://instagram.com/jadamademedia', 'new', now() - interval '8 hours'),
  ('Social Media Marketing Intern', 'Kofi Asare', 'kofi.asare@gmail.com', NULL,
   'Currently freelance for a TikTok agency. Looking for an internship that focuses specifically on music — Max Out is the obvious fit.',
   'https://tiktok.com/@kofiasare', 'in_progress', now() - interval '3 days'),
  ('Artist Management Intern', 'Olivia Park', 'olivia.park@berklee.edu', '+1-617-555-0166',
   'Berklee music business student. Interned at a small Boston booking agency last summer. Want to learn the management side now.',
   NULL, 'new', now() - interval '1 day'),
  ('A&R Scout Intern', 'Damon Ellis', 'damon.ellis@gmail.com', '+1-313-555-0199',
   'Detroit-based, plugged into the local scene. I send weekly scouting threads to friends — would love to do it for real.',
   'https://twitter.com/damon_scouts', 'new', now() - interval '5 hours'),
  ('Graphic Design / Content Intern', 'Sasha Kim', 'sasha.kim@risd.edu', NULL,
   'RISD senior. Portfolio focused on type-driven music covers and IG carousel design. Open to remote.',
   'https://sashakim.design', 'new', now() - interval '2 days'),
  ('Talent Manager', 'Devin Park', 'devin.park@gmail.com', '+1-718-555-0188',
   'Submitting after our inquiry. I currently co-manage two NYC artists. Looking to bring them under a bigger umbrella and grow from there.',
   'https://linkedin.com/in/devinpark', 'in_progress', now() - interval '2 days'),
  ('Booking Agent', 'Renee Castillo', 'renee.bookings@gmail.com', '+1-323-555-0111',
   '8 years booking small-to-mid venues across the West Coast. Bring an active book of ~40 venues and 12 promoters.',
   NULL, 'new', now() - interval '6 hours'),
  ('Brand Partnership Specialist', 'Andre Volkov', 'andre.v@partnerlab.io', '+1-212-555-0145',
   'Closed brand deals between musicians and DTC brands at my last role (Glossier, Liquid Death). Comfortable with rev-share.',
   'https://linkedin.com/in/andrevolkov', 'new', now() - interval '4 days'),
  ('Sales Representative', 'Maya Brooks', 'maya@brookssales.co', NULL,
   'B2B sales for 6 years, last 2 in creative services. Quota-crushing self-starter — comfortable with cold outreach.',
   NULL, 'closed', now() - interval '11 days')
) AS x(job_title, name, email, phone, cover_letter, portfolio_url, status, created_at)
ON j.title = x.job_title;

-- ============ QUOTE REQUESTS ============
INSERT INTO public.quote_requests (name, email, phone, service_type, budget_range, project_timeline, message, status, created_at) VALUES
  ('Trey Madison', 'trey@independentlabel.com', '+1-404-555-0119',
   'Music Video Production', '$3,000 – $5,000', '4–6 weeks',
   'Looking for a single-day music video shoot in Atlanta for our newest signee. Need treatment, shoot, edit, color.',
   'new', now() - interval '3 hours'),
  ('Lena Park', 'lena@kpopglobalpr.com', NULL,
   'PR & Press Campaign', '$1,500 – $2,500', 'Starting next month',
   'Our artist is releasing an English-language single — need US press and DSP playlist push for a 3-week window.',
   'in_progress', now() - interval '2 days'),
  ('Marcus Owens', 'marcus@hitdabeatent.com', '+1-281-555-0192',
   'Social Media Content Package', '$1,000 – $2,000/mo', '3-month engagement',
   'Hit Da Beat artist needs a consistent IG/TikTok content rhythm. Looking for monthly retainer.',
   'new', now() - interval '1 day'),
  ('Janelle Ortiz', 'janelle@indiefest.org', NULL,
   'Booking & Live Strategy', 'Negotiable', 'Q2 2025',
   'We''re curating a regional festival lineup and want to build a 3-artist package from your roster.',
   'new', now() - interval '8 hours'),
  ('Kendrick Yu', 'kendrick.yu@gmail.com', '+1-415-555-0166',
   'Artist Development', 'Custom', 'Long-term',
   'Independent artist with 50k monthly listeners considering signing with management. Want to discuss the development program.',
   'in_progress', now() - interval '5 days'),
  ('Old Lead', 'archive@example.com', NULL,
   'Music Video Production', '$5,000+', '2024',
   'Older request — keeping for archive.',
   'archived', now() - interval '90 days');