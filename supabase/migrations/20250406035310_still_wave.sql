-- Step 1: Users Table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text,
  is_admin boolean DEFAULT false
);

-- Step 2: Posts Table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published boolean DEFAULT false,
  author_id uuid NOT NULL REFERENCES auth.users(id)
);

-- Step 3: Enable RLS (Row Level Security)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Step 4: Row-Level Security Policies

-- Public can view only published posts
CREATE POLICY "Public can view published posts"
  ON posts
  FOR SELECT
  USING (published = true);

-- Admins (or owners) can fully access posts
CREATE POLICY "Admin has full access"
  ON posts
  FOR ALL
  USING (auth.uid() = author_id OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true
  ));

-- Admins can read all users (optional)
CREATE POLICY "Admins can read everything"
  ON users
  FOR SELECT
  USING (auth.uid() = id OR is_admin = true);

-- Step 5: Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
