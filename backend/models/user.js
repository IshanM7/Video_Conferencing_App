const db = require('../util/database');

module.exports = class User{
    constructor(firstName, lastName, email, password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    static getUsers(){
        return db.execute('SELECT * FROM Account');
    }

    static post(firstName, lastName, email, password){
        return db.execute('INSERT INTO Account (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
        [firstName,lastName,email,password]);
    }
    static updateEmail(id, email){
        return db.execute('UPDATE Account SET email = ? WHERE id = ?',
        [email, id]);
    }
    static updatePassword(id, password){
        return db.execute('UPDATE Account SET password = ? WHERE id = ?',
        [password, id]);
    }
    static deleteAccount(id){
        return db.execute('DELETE FROM Account WHERE id = ?',
        [id]);
    }
    static findEmail(email){
        console.log('hi');
        console.log(email);
        return db.execute('SELECT * FROM Account WHERE email = ?',[email]);
    }
    static getName(id){
        return db.execute('SELECT firstName FROM Account WHERE id = ?',[id]);
    }
};
