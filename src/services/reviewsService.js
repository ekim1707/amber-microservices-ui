import basicService from "./basichttpservice";
import resources from "../environments/resources";

export const reviewsService = {
    getProductReviews: (productId) => {
        return basicService
            .getRequest(resources.reviewsMicroserviceUrl + resources.reviewsService.baseEndpoint + resources.reviewsService.productEndpoint + "/" + productId);
    },
    createProductReview: (data) => {
        return basicService
        .createRequest(resources.reviewsMicroserviceUrl + resources.reviewsService.baseEndpoint, data);
    },
    editProductReview: (data) => {
        return basicService
            .updateRequest(resources.reviewsMicroserviceUrl + resources.reviewsService.baseEndpoint + "/" + data.id, data);
    },
    deleteProductReview: (id) => {
        return basicService
            .deleteRequest(resources.reviewsMicroserviceUrl + resources.reviewsService.baseEndpoint + "/" + id);
    }
}

export default reviewsService;