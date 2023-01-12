import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
    public db: mysql.Pool
    constructor() {
        this.db = mysql.createPool({
            host: process.env.DB_HOST as string,
            user: process.env.DB_USER as string,
            password: process.env.DB_PASSWORD as string,
            port: parseInt(process.env.DB_PORT as string) ?? 3306,
            database: process.env.DATABASE as string,
        });
    }
    _dbQuery = async (queryString: string, value?) => {
        const [rows, _] = await this.db.query(queryString, value)
            .catch(err => { throw err });
        return rows;
    }
}
