import RepositoryInterface from "../../@shared/repository/repository/repository-interface";
import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";

export default interface ProductRepositoryInterface
   extends RepositoryInterface<Product | ProductInterface> {}