export const resources = {
    // Dev:
    // productsMicroserviceUrl: "http://localhost:4545",
    // reviewsMicroserviceUrl: "http://localhost:7000",
    // 
    // Prod:
    productsMicroserviceUrl: "http://wfo-dev-duck-dev-w2.siva-project0-bk.kube.t-mobile.com",
    reviewsMicroserviceUrl: "http://wfo-dev-duck-dev-w2.amber-reviews.kube.t-mobile.com",
    accessoriesMicroserviceUrl: "http://amber-accessories.wfo-dev-duck-dev-w2.kube.t-mobile.com",
    // 
    routes: {
        basePath: "/",
        productsPath: "/phones",
        accessoriesPath: "/accessories",
        shoppingCartPath: "/shoppingcart",
        admin: "/admin"
    },
    productsService: {
        baseEndpoint: "/products"
    },
    reviewsService: {
        baseEndpoint: "/reviews",
        productEndpoint: "/product"
    },
    accessoriesService: {
        baseEndpoint: "/accessories"
    }
}

export default resources;
