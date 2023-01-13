import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
    public db: mysql.Pool
    constructor(
        private configService: ConfigService
    ) {
        this.db = mysql.createPool({
            // host: process.env.DB_HOST as string,
            // user: process.env.DB_USER as string,
            // password: process.env.DB_PASSWORD as string,
            // port: parseInt(process.env.DB_PORT as string) ?? 3306,
            // database: process.env.DATABASE as string,
            host: configService.get('DB_HOST'),
            user: configService.get('DB_USER'),
            password: configService.get('DB_PASSWORD'),
            port: configService.get('DB_PORT') ?? 3306,
            database: configService.get('DATABASE')
        });
    }
    _dbQuery = async (queryString: string, value?) => {
        const [rows, _] = await this.db.query(queryString, value)
            .catch(err => { throw err });
        return rows;
    }
}
