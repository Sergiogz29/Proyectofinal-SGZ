export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CreateProductDto {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
}
export declare class UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
    category?: string;
    stock?: number;
}
export declare class ProductsService {
    private products;
    private nextId;
    findAll(): Product[];
    findOne(id: number): Product;
    create(createProductDto: CreateProductDto): Product;
    update(id: number, updateProductDto: UpdateProductDto): Product;
    remove(id: number): void;
}
