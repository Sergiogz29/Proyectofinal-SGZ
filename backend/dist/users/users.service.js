"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    users = [
        {
            id: 1,
            email: 'admin@example.com',
            password: '',
            name: 'Administrador',
            role: 'admin'
        },
        {
            id: 2,
            email: 'usuario@example.com',
            password: '',
            name: 'Usuario Test',
            role: 'user'
        }
    ];
    constructor() {
        this.hashPasswords();
    }
    async hashPasswords() {
        for (const user of this.users) {
            if (user.email === 'admin@example.com') {
                user.password = await bcrypt.hash('admin123', 10);
            }
            else if (user.email === 'usuario@example.com') {
                user.password = await bcrypt.hash('usuario123', 10);
            }
        }
    }
    async findByEmail(email) {
        return this.users.find(user => user.email === email);
    }
    async findById(id) {
        return this.users.find(user => user.id === id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UsersService);
//# sourceMappingURL=users.service.js.map