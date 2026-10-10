-- Run this once in your Supabase project: SQL Editor > New query > paste > Run.

-- One row per person, holding their study progress as a JSON document.
create table public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

-- Row level security: with this on, nobody can touch any row unless a policy below allows it.
alter table public.progress enable row level security;

-- A signed-in person may read, create and update only the row whose user_id is their own id.
create policy "Read own progress"   on public.progress for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Create own progress" on public.progress for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Update own progress" on public.progress for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
