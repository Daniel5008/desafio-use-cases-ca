import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

export default class FindProductUseCase {
   private productRepository: ProductRepositoryInterface;

   constructor(productRepository: ProductRepositoryInterface) {
      this.productRepository = productRepository;
   }

   async execute(input: { id: string }): Promise<{ id: string; name: string; price: number }> {
      const product = await this.productRepository.find(input.id);
      
      return {
         id: product.id,
         name: product.name,
         price: product.price,
      };
   }
}