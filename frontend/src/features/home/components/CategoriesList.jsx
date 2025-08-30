import React, { useState, useEffect } from "react";
import CategoriesItems from "./CategoriesItems.jsx";
import CategoriesHeader from "../../categories/components/CategoriesHeader";
import { Link } from "react-router-dom";
import "@styles/categories.css";
import "./CategoriesList.css";

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    сonst [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchCategories = async () => {
          try {
            const response = await fetch("http://localhost:3333/categories/all");
            if (!response.ok) { 
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Fetched categories:", data);
            if (isMounted) {
            const shuffled = data.sort(() => 0.5 - Math.random());
            setCategories(shuffled.slice(0, 4));
          }
         } catch (error) {
            console.error("Error loading categories:", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
            }
        }
        };

        fetchCategories();
    
     return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="categories">
            <CategoriesHeader />
            <div className="category-container">
                {loading ? ( <p>Loading categories...</p>
                ) : categories.length > 0 ? (
                {categories.map((category) => (
                    <CategoriesItems
                        key={category.id}
                        image={`http://localhost:3333${category.image}`}
                        title={category.title} 
                        count={category.count || 0}
                        isHomePage={true}
                    />
                ))
                ) : (
                    <p>No categories avaible.</p>
                )}
                        </div>
            <div className="all-categories-wrapper">
                {categories.length > 0 && (
                    <Link to="/all-categories" className="all-categories-btn">
                        All Categories
                        </Link>
                        )}
            </div>
                        </section>
                    );
                };

export default CategoriesList;
          

