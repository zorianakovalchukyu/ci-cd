const request = require("supertest");
const express = require("express");

const app = require("./index");

describe("Testing API endpoints", () => {
  it("should create a new product", async () => {
    const res = await request(app)
      .post("/products")
      .send({ name: "Test Product", price: 10 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Product added successfully.");
    expect(res.body).toHaveProperty("productId");
  });

  it("should get all products", async () => {
    const res = await request(app).get("/products");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get a specific product by ID", async () => {
    const createRes = await request(app)
      .post("/products")
      .send({ name: "Test Product", price: 10 });

    const productId = createRes.body.productId;

    const res = await request(app).get(`/products/${productId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Test Product");
    expect(res.body).toHaveProperty("price", 10);
  });

  it("should update a specific product by ID", async () => {
    const createRes = await request(app)
      .post("/products")
      .send({ name: "Test Product", price: 10 });

    const productId = createRes.body.productId;

    const updateRes = await request(app)
      .patch(`/products/${productId}`)
      .send({ name: "Updated Product", price: 20 });

    expect(updateRes.statusCode).toEqual(200);
    expect(updateRes.body).toHaveProperty(
      "message",
      "Product updated successfully."
    );
  });

  it("should delete a specific product by ID", async () => {
    const createRes = await request(app)
      .post("/products")
      .send({ name: "Test Product", price: 10 });

    const productId = createRes.body.productId;

    const deleteRes = await request(app).delete(`/products/${productId}`);

    expect(deleteRes.statusCode).toEqual(200);
    expect(deleteRes.body).toHaveProperty(
      "message",
      "Product deleted successfully."
    );
  });
});
