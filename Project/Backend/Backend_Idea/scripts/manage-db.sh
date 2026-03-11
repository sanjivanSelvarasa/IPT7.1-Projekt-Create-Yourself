#!/bin/bash

# Quick database management hack

BACKEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd .. && pwd)"
USER_DB="$BACKEND_DIR/database/user.db"
USERDATA_DB="$BACKEND_DIR/database/userdata.db"

if ! command -v sqlite3 &> /dev/null; then
    echo "Error: sqlite3 required"
    exit 1
fi

show_menu() {
    echo ""
    echo "1. View all users"
    echo "2. View user details"
    echo "3. Delete user"
    echo "4. Exit"
    echo ""
}

view_all_users() {
    echo ""
    sqlite3 "$USER_DB" ".mode column" ".headers on" \
        "SELECT id, email, username, created_at FROM users;"
    echo ""
}

view_user_details() {
    read -p "User ID: " user_id
    echo ""
    
    sqlite3 "$USER_DB" "SELECT 'ID: ' || id, 'Email: ' || email, 'Username: ' || username, 'Created: ' || created_at FROM users WHERE id = $user_id;"
    
    echo ""
    sqlite3 "$USERDATA_DB" "SELECT 'Bio: ' || coalesce(bio, '(empty)'), 'Avatar: ' || coalesce(avatar_url, '(empty)'), 'Twitter: ' || coalesce(twitter, '(empty)'), 'LinkedIn: ' || coalesce(linkedin, '(empty)'), 'GitHub: ' || coalesce(github, '(empty)'), 'Instagram: ' || coalesce(instagram, '(empty)') FROM user_profiles WHERE user_id = $user_id;"
    echo ""
}