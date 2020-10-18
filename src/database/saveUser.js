function saveUser(db, user) {
    return db.run(`
        INSERT INTO users (
            name, 
            email,
            password
        ) VALUES (
            "${user.name}",
            "${user.email}",
            "${user.password}"
        );
    `)
}

module.exports = saveUser;