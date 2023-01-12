import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { DatabaseService } from "src/database/database.service";
import { User } from "./auth.entity";
import { CreateUserDto } from "./dto/create-user-dto";

interface Users extends User, RowDataPacket {}

@Injectable()
export class AuthRepository {
    constructor(private databaseService: DatabaseService) { }

    async createUser(createUserDto: CreateUserDto): Promise<ResultSetHeader> {
        const { username, password } = createUserDto;
        const queryString = `INSERT INTO users (username, password) VALUES (?, ?)`;
        try {
            const [rows, _]: [ResultSetHeader, FieldPacket[]] = await this.databaseService.db.query(queryString, [username, password]);
            return rows;
        } catch(err) {
            if(err.errno === 1062) {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async login(username: string): Promise<User[]> {
        const queryString = `SELECT username, password FROM users WHERE username = ?`;
        try {
            const [rows, _]: [Users[], FieldPacket[]] = await this.databaseService.db.query(queryString, username);
            return rows;
        } catch(err) {
            console.log(err);
        }
    }
}