import productsService from "./productsService";
import axios from "axios";

jest.mock("axios");

const mockData = [
    {
        id: 1,
        make: "Apple",
        model: "iPhone 12",
        memory: "64GB",
        color: "White",
        instock: true,
        fullPrice: 829.99,
        imageUrl: "",
        can_Delete: false
    }
];

test('returns data for the first product', async () => {
    axios.get.mockResolvedValue({ data: mockData });

    const response = await productsService.getAllProducts()
        .then(res => res.data);

    console.log(response);

    expect(response).toEqual(mockData);
});