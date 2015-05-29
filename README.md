A node-postgres error wrapper that allows for chain-able queries

Usage

Chain select statements.

<pre>
var Queryable = require('../lib/queryable.js');
var constring = "postgres://username:password@place/place";
var queryable = new Queryable(constring);

var statement = "SELECT * FROM schema.table WHERE condition = value";

queryable.query(statement, function(err, result){
  consle.log(result.rows);
}).query('SELECT * FROM other.table WHERE something = $1', [someValue], function(err, result){
  console.log(result.rows)
}).end();
</pre>

Insert and commit on the same line.

Errors automatically invoke rollbacks and prevent commits on error.

<pre>
var queryable = new Queryable(constring);

var statement = INSERT INTO schema.table SELECT table.column, table.column2 " +
                "FROM table LEFT OUTER JOIN schema.table ON (table2.column = table2.column) " +
                "WHERE table2.column IS NULL;
queryable.query(statement).query('COMMIT').end();
</pre>
