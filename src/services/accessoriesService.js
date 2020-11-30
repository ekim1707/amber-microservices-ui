import basicService from "./basichttpservice";
import resources from "../environments/resources";

const accessoriesURL = resources.accessoriesMicroserviceUrl + resources.accessoriesService.baseEndpoint;

export const accessoriesService = {
    getAllAccessories: () => (
        basicService
            .getRequest(accessoriesURL)
    ),
    getAccessoryById: (id) => (
        basicService
            .getRequest(`${accessoriesURL}/${id}`)
    ),
    editAccessory: (id, data) => (
        basicService
            .updateRequest(`${accessoriesURL}/${id}`, data)
    )
}

export default accessoriesService;
