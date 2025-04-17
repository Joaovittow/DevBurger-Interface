import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export function CategoriesCarousel() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');

      setCategories(data);
      console.log(data);
    }
    loadCategories();
  }, []);
  return (
    <div>
      <h1>CategoryCarousel</h1>
    </div>
  );
}
