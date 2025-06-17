import { ProductsService, CreateProductDto, UpdateProductDto } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): import("./products.service").Product[];
    findOne(id: string): import("./products.service").Product;
    create(createProductDto: CreateProductDto, req: any): import("./products.service").Product;
    update(id: string, updateProductDto: UpdateProductDto, req: any): import("./products.service").Product;
    remove(id: string, req: any): void;
}
