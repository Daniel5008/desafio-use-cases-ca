import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";

export default class ListProductUseCase {
  private productRepository: ProductRepository;

   constructor(productRepository: ProductRepository) {
      this.productRepository = productRepository;
   }

   async execute(): Promise<{ products: { id: string; name: string; price: number }[] }> {

      const products = await this.productRepository.findAll();

      return {
         products: products.map((product: Product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
         })),
      };
   };
}