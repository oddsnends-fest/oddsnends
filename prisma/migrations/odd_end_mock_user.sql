CREATE TABLE "User" (
    user_id VARCHAR(255) PRIMARY KEY,
    display_name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    line_profile_pic VARCHAR(2048),
    phone VARCHAR(10) CHECK (phone ~ '^[0-9]{9,10}$'),
    gender VARCHAR(20) CHECK (gender IN ('MALE', 'FEMALE', 'NONBINARY', 'OTHERS', 'PREFERNOTTOSAY')),
    photo VARCHAR(2048),
    age INTEGER CHECK (age >= 0),
    occupation VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    channel VARCHAR(20) NOT NULL CHECK (channel IN ('INSTAGRAM', 'FACEBOOK', 'TIKTOK', 'LINE', 'FRIENDS', 'POSTER')),
    photoid_name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    spirit_animal VARCHAR(20) CHECK (spirit_animal IN ('CAT', 'BUTTERFLY', 'FISH', 'DUCK', 'SQUIRREL', 'WATER_MONITOR', 'SWAN', 'DOG', 'OTTER')),
    signature TEXT,
    hobby VARCHAR(20) CHECK (hobby IN ('READING', 'PAINTING', 'GAMING', 'COOKING', 'PHOTOGRAPHY', 'TRAVELING', 'GARDENING', 'FISHING', 'WRITING')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_user_email ON "User" (email);
CREATE INDEX idx_user_channel ON "User" (channel);

-- Create trigger for automatic updated_at
CREATE OR REPLACE FUNCTION update_user_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_timestamp
BEFORE UPDATE ON "User"
FOR EACH ROW
EXECUTE FUNCTION update_user_timestamp();