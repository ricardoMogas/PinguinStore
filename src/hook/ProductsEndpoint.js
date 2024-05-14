import axios from "axios";

class ProductsEndpoint {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async GetAllProducts() {
        try {
            const response = await axios.get(`${this.apiUrl}/GetAllProducts`);
            const students = response.data;
            return students;
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }

    async RegisterProduct(productData) {
        try {
            const response = await axios.post(`${this.apiUrl}/RegisterProduct`, productData);
            const product = response.data;
            return product;
        } catch (error) {
            console.error('Error registering product:', error);
        }
    }

    async UpdateProduct(productData) {
        try {
            const response = await axios.put(`${this.apiUrl}/UpdateProduct`, productData);
            const product = response.data;
            return product;
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }

    async DeleteProduct(productId) {
        try {
            const response = await axios.delete(`${this.apiUrl}/DeleteProduct/${productId}`);
            const product = response.data;
            return product;
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    async GetSalesCustomer(userId) {
        try {
            const response = await axios.get(`${this.apiUrl}/GetSalesCustomer/${userId}`);
            const sales = response.data;
            return sales;
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    }

    async GetSuppliers() {
        try {
            const response = await axios.get(`${this.apiUrl}/GetAllSuppliers`);
            const Suppliers = response.data;
            return Suppliers;
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    }
}

export default ProductsEndpoint;
