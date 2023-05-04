import React, { useEffect, useState } from "react";

import Header from "../components/Header";

import { Link } from "react-router-dom";

import axios from "axios";

const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [reRender,setReRender]=useState(false)
  const [sayac,setSayac]=useState(0)

  useEffect(() => {
    axios
      .get("http://localhost:3004/basket")
      .then((res) => {
        setBasket(res.data);
      })
      .catch((err) => {});
  }, [reRender]);

  useEffect(()=>{
    /* https://stackoverflow.com/questions/54954091/how-to-use-callback-with-usestate-hook-in-react */
    const interval=setInterval(() => {
      setSayac((old)=>{
        console.log(old+1);
        return old+1
      })
    }, 1000);



    /* componentWillUnmount */
    return ()=>{
      console.log("basket sayfası unmount oldu");
      clearInterval(interval)
    }
  },[])

  return (
    <div>
      <Header bgClass="danger" reRender={reRender} />
      <h1>{sayac}</h1>
      {basket.length === 0 ? (
        <div>
          <p>
            Sepetiniz boş alışverişe başlamak için{" "}
            <Link to={"/product-list"}>tıklayın</Link>
          </p>
        </div>
      ) : (
        <div>
          {basket.map((item) => (
            <div key={item.id}>
              <h1>{item.name}</h1>
              <p>{item.brand}</p>
              <p>{item.price} TL</p>
              <button
                onClick={() => {
                  /* axios.delete("http://localhost:3004/basket/"+item.id) */
                  axios
                    .delete(`http://localhost:3004/basket/${item.id}`)
                    .then((res) => {setReRender(!reRender)})
                    .catch((err) => {});
                }}>
                Çıkar
              </button>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Basket;
