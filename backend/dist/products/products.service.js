"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = exports.UpdateProductDto = exports.CreateProductDto = void 0;
const common_1 = require("@nestjs/common");
class CreateProductDto {
    name;
    description;
    price;
    image;
    category;
    stock;
}
exports.CreateProductDto = CreateProductDto;
class UpdateProductDto {
    name;
    description;
    price;
    image;
    category;
    stock;
}
exports.UpdateProductDto = UpdateProductDto;
let ProductsService = class ProductsService {
    products = [
        {
            id: 1,
            name: 'Aceite de Oliva Premium',
            description: 'Aceite de oliva virgen extra de primera calidad',
            price: 15.99,
            image: '/aceite1.jpeg',
            category: 'Aceites',
            stock: 50,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            name: 'Aceite de Oliva Tradicional',
            description: 'Aceite de oliva virgen extra con sabor tradicional',
            price: 12.50,
            image: '/aceite2.jpeg',
            category: 'Aceites',
            stock: 30,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 3,
            name: 'Aceite de Oliva Ecológico',
            description: 'Aceite de oliva ecológico certificado',
            price: 18.75,
            image: '/aceite3.jpeg',
            category: 'Aceites',
            stock: 25,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 4,
            name: 'Aceite de Oliva Intenso',
            description: 'Aceite de oliva con sabor intenso y robusto',
            price: 16.90,
            image: '/aceite4.jpeg',
            category: 'Aceites',
            stock: 40,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 5,
            name: 'Aceite de Oliva Gourmet',
            description: 'Aceite de oliva gourmet para los paladares más exigentes',
            price: 22.00,
            image: '/aceite5.jpeg',
            category: 'Aceites',
            stock: 15,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];
    nextId = 6;
    findAll() {
        return this.products;
    }
    findOne(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado`);
        }
        return product;
    }
    create(createProductDto) {
        const newProduct = {
            id: this.nextId++,
            ...createProductDto,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.products.push(newProduct);
        return newProduct;
    }
    update(id, updateProductDto) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado`);
        }
        this.products[productIndex] = {
            ...this.products[productIndex],
            ...updateProductDto,
            updatedAt: new Date(),
        };
        return this.products[productIndex];
    }
    remove(id) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado`);
        }
        this.products.splice(productIndex, 1);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map