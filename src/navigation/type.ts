import { Product } from '../apı/models/Products';

export type RootStackParamList = {
  HomePage: undefined;
  ProductDetailPage: { product: Product };
};
