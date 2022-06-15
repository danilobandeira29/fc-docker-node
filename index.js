const app = require("express")();
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "db",
    user: "root",
    password: "root",
    database: "nodedb"
})
connection.connect(function() {
    connection.query("create table if not exists people(id int auto_increment primary key, name varchar(255))");
});
app.get("/", async function(req, res) {
    await connection.query("insert into people(name) values('Danilo Bandeira')");
    connection.connect(function() {
        connection.query("select name from people", function(_, people) {
            let listPeople= ''
            for(const p of people) {
                listPeople += `<p>${p.name}</p>`
            }
            res.send(`<h1>Full Cycle Rocks!</h1>${listPeople}`);
        })
    })
});
const PORT = 8080;
app.listen(PORT, () => console.log(`Running at http:/localhost:${PORT}`));
