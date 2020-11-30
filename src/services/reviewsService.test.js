import reviewsService from "./reviewsService";
import axios from "axios";

jest.mock("axios");

const mockData =   {
    id: 1,
    productId: 1,
    title: "Great Phone!",
    rating: 5,
    review: "It's a great phone, have a great design and cameras!",
    can_delete: true
};

test("the first review of the first product will be called", async () => {
    axios.get.mockResolvedValue({ data: mockData });

    const response = await reviewsService.getProductReviews(1)
        .then(res => res.data);

    expect(response).toEqual(mockData);
});