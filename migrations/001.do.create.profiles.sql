CREATE TABLE profiles (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    nickname TEXT NOT NULL,
    image_url TEXT,
    relationship_level INTEGER NOT NULL,
    admirable_qualities TEXT NOT NULL,
    notes TEXT NOT NULL
);