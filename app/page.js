"use client";
import { list } from "postcss";
import React, { useState, useEffect } from "react";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  querySnapshot,
  onSnapshot,
  query,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [total, setTotal] = useState(0);

  //Add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.price !== "") {
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({ name: "", price: "" });
    }
  };

  //Delete item to database

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  //Read item to database
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let itemsArr = [];
      QuerySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      //Read total from itemsArr
      const calculateTotal = () => {
        const TotalPrice = itemsArr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );
        setTotal(TotalPrice);
      };

      calculateTotal();
      return () => unsubscribe();
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm ">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              value={newItem.name}
              className="cols-span-3 p-3 border"
              type="text"
              placeholder="Enter Item"
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              value={newItem.price}
              className="cols-span-3 p-3 border"
              type="number"
              placeholder="Enter $"
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />
            <button
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl"
              type="submit"
              onClick={addItem}>
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-slate-950">
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>${item.price}</span>
                </div>
                <button
                  className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
                  onClick={() => deleteItem(item.id)}>
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="flex justify-between">
              <span>Total</span>
              <span> ${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
