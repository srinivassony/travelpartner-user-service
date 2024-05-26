const config = require('../../../config');

const functions = {
    FETCH_FIND_POSTS_JOINS: "tp_function_fetch_find_posts_join"
};

const prefix = config.sql.owner;
const rdsPrefix = config.rdsSql.owner;
const dbServer = config.dbServer || "GOS";


Object.keys(functions).forEach((key) => 
{
    if (rdsPrefix && (dbServer === "RDS" || dbServer === "COMMON"))
    {
        functions[key] = `${rdsPrefix}"${functions[key]}"`;
    }
    else if (prefix && dbServer === "GOS")
    {
        functions[key] = `${prefix}"${functions[key]}"`;
    }
    else
    {
        functions[key] = `"${functions[key]}"`;
    }
});


module.exports = functions;