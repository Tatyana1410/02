import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [favoriteProducts, setFavoriteProducts] = useState(() => {
    const savedFav = localStorage.getItem('favorite');
    return savedFav ? JSON.parse(savedFav) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(selectedProduct));
  }, [selectedProduct]);

  useEffect(() => {
    localStorage.setItem('favorite', JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  const selectProd = (product) => {
    setSelectedProduct((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      return existingItem
        ? prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const decreaseQuantity = (productId) => {
    setSelectedProduct((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity - 1;
            if (newQuantity === 0) {
              const confirmDelete = window.confirm(
                'Are you sure you want to remove this product?'
              );
              if (!confirmDelete) return item;
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (idx) => {
    setSelectedProduct((prod) => prod.filter((_, index) => index !== idx));
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to empty your basket?')) {
      setSelectedProduct([]);
      localStorage.removeItem('cart');
    }
  };

  const selectFavorite = (product) => {
    setFavoriteProducts((prev) => [...prev, product]);
  };

  const removeFavorite = (idx) => {
    setFavoriteProducts((prod) => prod.filter((_, index) => index !== idx));
  };

  const clearFavorite = () => {
    setFavoriteProducts([]);
  };

  const clearCheckCart = () => {
      setSelectedProduct([]);
      localStorage.removeItem('cart');
  };

  return (
    <ProductContext.Provider
      value={{
        selectedProduct,
        selectProd,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        favoriteProducts,
        selectFavorite,
        removeFavorite,
        clearFavorite,
        clearCheckCart
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};