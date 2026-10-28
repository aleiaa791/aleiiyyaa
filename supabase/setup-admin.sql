-- bycaeL: aktifkan admin secara aman
-- 1. Buat akun melalui admin.html dengan email yang kamu kendalikan.
-- 2. Di Supabase Dashboard > Authentication > Users, salin UUID akun tersebut.
-- 3. Ganti UUID di bawah dengan UUID akunmu, lalu jalankan SQL ini di SQL Editor.
-- Jangan pernah memberikan akses admin kepada akun yang tidak kamu kendalikan.
insert into public.admin_users (user_id)
values ('GANTI-DENGAN-UUID-AKUN-ADMIN'::uuid)
on conflict (user_id) do nothing;

-- RLS, tabel admin_users, dan bucket foto product-images sudah disiapkan pada project.
