import React, { useState, useEffect } from "react";
import CategoriesItems from "./CategoriesItems.jsx";
import CategoriesHeader from "../../categories/components/CategoriesHeader.jsx";
import "@styles/categories.css";

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch("http://localhost:3333/categories/all");
            const data = await response.json();
            console.log("Fetched categories:", data);
            const shuffled = data.sort(() => 0.5 - Math.random());
            setCategories(shuffled.slice(0, 4));
          } catch (error) {
            console.error("Error loading categories:", error);
            }
        };
        fetchCategories();
    }, []);

     return (
        <section className="categories">
            <CategoriesHeader />
            <div className="category-container">
                {categories.map((category, index) => (
                    <CategoriesItems
                        key={index}
                        image={category.image}
                        title={category.title}
                        count={category.count}
                        isHomePage={true}
                    />
                ))}
                        </div>
                        </section>
                    );
                };

export default CategoriesList
          

