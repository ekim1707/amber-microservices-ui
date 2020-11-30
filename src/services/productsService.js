import basicService from "./basichttpservice";
import resources from "../environments/resources";

const productsURL = resources.productsMicroserviceUrl + resources.productsService.baseEndpoint;

export const productsService = {
    getAllProducts: () => (
        basicService
            .getRequest(productsURL)
    ),
    createProduct: (productData) => (
        basicService
            .createRequest(productsURL, productData)
    ),
    updateProduct: ({ id, ...rest }) => (
        basicService
            .updateRequest(`${productsURL}/${id}`, { id, ...rest })
    ),
    deleteProduct: (productId) => (
        basicService
            .deleteRequest(`${productsURL}/${productId}`)
    ),
}

export default productsService;
