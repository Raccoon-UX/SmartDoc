-- ==============================================================================
-- SMARTDOC PHASE 3 — SUPABASE DATABASE & STORAGE INITIALIZATION
-- ==============================================================================
-- 1. PROFILES TABLE & TRIGGER
-- ==============================================================================

create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Profiles Policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Automatic Profile Creation Trigger on Sign Up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, created_at, updated_at)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    now(),
    now()
  )
  on conflict (id) do update
  set email = excluded.email,
      full_name = coalesce(excluded.full_name, public.profiles.full_name),
      updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ==============================================================================
-- 2. USER DOCUMENTS TABLE & INDEXES
-- ==============================================================================

create table if not exists public.documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  category text not null default 'other',
  document_type text not null default 'pdf',
  description text,
  file_path text not null,
  file_name text not null,
  file_size bigint not null default 0,
  mime_type text not null,
  issue_date date,
  expiry_date date,
  issuing_authority text,
  notes text,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Indexes for scalable query performance
create index if not exists idx_documents_user_id on public.documents(user_id);
create index if not exists idx_documents_category on public.documents(category);
create index if not exists idx_documents_created_at on public.documents(created_at desc);

-- Enable RLS on documents
alter table public.documents enable row level security;

-- Documents RLS Policies: Server-side User Isolation
create policy "Users can select only their own documents"
  on public.documents for select
  using (auth.uid() = user_id);

create policy "Users can insert only their own documents"
  on public.documents for insert
  with check (auth.uid() = user_id);

create policy "Users can update only their own documents"
  on public.documents for update
  using (auth.uid() = user_id);

create policy "Users can delete only their own documents"
  on public.documents for delete
  using (auth.uid() = user_id);

-- ==============================================================================
-- 3. PRIVATE STORAGE BUCKET & POLICIES (user-documents)
-- ==============================================================================

-- Create private user-documents storage bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'user-documents',
  'user-documents',
  false,
  10485760, -- 10MB limit in bytes
  array['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
)
on conflict (id) do update set
  public = false,
  file_size_limit = 10485760,
  allowed_mime_types = array['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

-- Storage RLS: Strict folder isolation based on user_id as root folder: <user_id>/<doc_id>/<file>
create policy "Users can read own storage objects"
  on storage.objects for select
  using (
    bucket_id = 'user-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can upload own storage objects"
  on storage.objects for insert
  with check (
    bucket_id = 'user-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can update own storage objects"
  on storage.objects for update
  using (
    bucket_id = 'user-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can delete own storage objects"
  on storage.objects for delete
  using (
    bucket_id = 'user-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
