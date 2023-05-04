import React, { useEffect, useState } from "react";

import Header from "../components/Header";

import axios from "axios";

const ProductList = () => {
  /* return satırının üstü constructor. Türkçe karşılığı yapıcı
    method olarak geçer ve component'a yeteneklerini tanımlar.
    */
  const [products, setProducts] = useState(null);
  const [reRender,setReRender]=useState(false)

  /* useEffect Kullanımı */
  /* useEffect'i lifeCycle methodlarından componentDidMount,
        componentDidUpdate ve componentWillUnmount anlarını yakalamak
        için kullanırız.

        useEffect 2 tane parametre alır. ilk parametresi yapılacak iştir
        2. parametresi dependencies(bağımlılık)dir
    */

  /* useEffect ile componentDidMount yazılımı */
  /* eğer dependencies kısmı boş dizi olarak bırakılırsa
        bu useEffect componentDidMount olur.
    */
  useEffect(() => {
    axios
      .get("http://localhost:3004/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((err) => {});
  }, []);

  /* render -> function based component'ta return'e tekabül eder */
  if (products === null) return <h1>loading...</h1>;
  return (
    <div>
      <Header reRender={reRender} whichPage={"product-list"} bgClass="success" />
      <p>Product List Page</p>
      {products.length === 0 ? (
        <div>Kayıtlı bir ürün yoktur</div>
      ) : (
        <div>
          {products.map((item) => (
            <div key={item.id}>
              <h1>{item.name}</h1>
              <p>{item.brand}</p>
              <p>{item.price} TL</p>
              <button
                onClick={() => {
                  axios
                    .post("http://localhost:3004/basket", item)
                    .then((res) => {setReRender(!reRender)})
                    .catch((err) => {});
                }}>
                Sepete Ekle
              </button>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
