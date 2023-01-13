import { UnauthorizedException, ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { DatabaseService } from "src/database/database.service";
import { User } from "./auth.entity";
import { CreateUserDto } from "./dto/create-user-dto";

interface Users extends User, RowDataPacket {
    account_num: number;
}

@Injectable()
export class AuthRepository {
    constructor(private databaseService: DatabaseService) { }

    async createUser(createUserDto: CreateUserDto): Promise<ResultSetHeader> {
        const { email, password, name } = createUserDto;

        const queryString = `INSERT INTO account (email, name, password) VALUES (?, ?, ?)`;
        try {
            const [rows, _]: [ResultSetHeader, FieldPacket[]] = await this.databaseService.db.query(queryString, [email, name, password]);
            return rows;
        } catch(err) {
            if(err.errno === 1062) {
                console.log(err);
                throw new ConflictException('Existing email');
            } else {
                console.log(err);
                throw new InternalServerErrorException();
            }
        }
    }

    async login(email: string): Promise<Users[]> {
        const queryString = `SELECT * FROM account WHERE email = ?`;
        try {
            const [rows, _]: [Users[], FieldPacket[]] = await this.databaseService.db.query(queryString, email);
            return rows;
        } catch(err) {
            console.log(err);
        }
    }

    async getOneUser(id: number): Promise<User> {
        const queryString = `SELECT * FROM account WHERE account_num = ?`;
        try {
            const [rows, _]: [Users[], FieldPacket[]] = await this.databaseService.db.query(queryString, [id]);
            return rows[0];
        } catch(err) {
            console.log(err);
            throw new UnauthorizedException();
        }
    }
 }