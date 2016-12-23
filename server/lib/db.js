import pg from 'pg';
pg.defaults.poolSize = 25;
const conString = ""


export default function(q, callback) {
    pg.connect(conString, function(err, client, done) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            client.query(q, function(err, result) {
                done();
                callback(err, result);
            });
        }
    });
}
