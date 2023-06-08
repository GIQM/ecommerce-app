const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');
require('../models');

let token;
let productId;

beforeAll(async() => {
    const credentials = {
        email: "testuser@gmail.com",
        password: "testuser1234"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('POST / products should create a products', async () => {
    const category = await Category.create({ name: "tech" });
    const product = {
        title: "PC",
        description: "es una computadora de alto rendimiento",
        brand: "Lenovo",
        price: 1500,
        categoryId: category.id
    }
    const res = await request(app)
        .post('/products')
        .send(product)
        .set('Authorization', `Bearer ${token}`);
    productId = res.body.id
    await category.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /products/:id', async () => {
    const productUpdated = {
        title: 'PC updated'
    }
    const res = await request(app)
        .put(`/products/${productId}`)
        .send(productUpdated)
        .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(productUpdated.title);
});

test('POST /products/:id/images should set the products images', async () => {
    const image = await ProductImg.create({
        url: "http://res.cloudinary.com/dgt643xtm/image/upload/v1686176730/ecommerce%20app/pc%20len.png",
        publicId: "ecommerce app/pc len",
    })
    const res = await request(app)
        .post(`/products/${productId}/images`)
        .send([image.id])
        .set('Authorization', `Bearer ${token}`);
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('DELETE /products/:id', async () => {
    const res = await request(app)
        .delete(`/products/${productId}`)
        .set('Authorization', `Bearer ${ token }`);
    expect(res.status).toBe(204);
});

