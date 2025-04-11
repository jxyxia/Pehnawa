
export interface CategoryItem {
  id: string;
  name: string;
  price: number;
  priceString: string;
  image: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  items: CategoryItem[];
}

export const categories: Category[] = [
  {
    id: "men",
    title: "Men's Collection",
    description: "Premium suits, designer shirts, and stylish casual wear for every occasion.",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    items: [
      {           
        id: "m1", 
        name: "Formal Suits", 
        price: 800, 
        priceString: "₹800/day",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
      },
      { 
        id: "m2", 
        name: "Designer Shirts", 
        price: 300, 
        priceString: "₹300/day",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
      },
      { 
        id: "m3", 
        name: "Ethnic Wear", 
        price: 650, 
        priceString: "₹650/day",
        image: "/images/ethnicwear.jpg"
        
      },
      { 
        id: "m4", 
        name: "Casual Outfits", 
        price: 400, 
        priceString: "₹400/day",
        image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      },
      { 
        id: "m5", 
        name: "Tuxedos", 
        price: 950, 
        priceString: "₹950/day",
        image: "/images/tuxedo.jpg"
      },
      { 
        id: "m6", 
        name: "Traditional Sherwanis", 
        price: 850, 
        priceString: "₹850/day",
        image: "/images/sherwani.jpg"
      },
      { 
        id: "m7", 
        name: "Designer Blazers", 
        price: 700, 
        priceString: "₹700/day",
        image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
      },
      { 
        id: "m8", 
        name: "Kurta Pajamas", 
        price: 550, 
        priceString: "₹550/day",
        image: "/images/kurta.jpg"
      },
    ]
  },
  {
    id: "women",
    title: "Women's Collection",
    description: "Elegant dresses, stunning gowns, and trendy outfits for any special event.",
    image: "https://images.unsplash.com/photo-1623609163841-5e69d8c62cc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    items: [
      { 
        id: "w1", 
        name: "Maxi Dress", 
        price: 900, 
        priceString: "₹900/day", 
        image: "/images/gown.jpg"
      },
      { 
        id: "w2", 
        name: "Designer Sarees", 
        price: 700, 
        priceString: "₹700/day",
        image: "/images/saree.jpg"
      },
      { 
        id: "w3", 
        name: "Party Dresses", 
        price: 500, 
        priceString: "₹500/day",
        image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80"
      },
      { 
        id: "w4", 
        name: "Casual Outfits", 
        price: 400, 
        priceString: "₹400/day",
        image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80"
      },
      { 
        id: "w5", 
        name: "Lehenga Cholis", 
        price: 1100, 
        priceString: "₹1100/day",
        image: "/images/lehnga.jpg"
      },
      { 
        id: "w6", 
        name: "Cocktail Dresses", 
        price: 850, 
        priceString: "₹850/day",
        image: "/images/mini.jpg"
      },
      { 
        id: "w7", 
        name: "Backless", 
        price: 750, 
        priceString: "₹750/day",
        image: "/images/backless.jpg"
      },
      { 
        id: "w8", 
        name: "Formal Blazers", 
        price: 600, 
        priceString: "₹600/day",
        image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      },
    ]
  },
  {
    id: "accessories",
    title: "Premium Accessories",
    description: "Complete your look with our collection of high-end accessories perfect for any outfit.",
    image: "https://images.unsplash.com/photo-1585123334904-845d60e97b29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    items: [
      { 
        id: "a1", 
        name: "Designer Handbags", 
        price: 450, 
        priceString: "₹450/day",
        image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
      },
      { 
        id: "a2", 
        name: "Luxury Watches", 
        price: 600, 
        priceString: "₹600/day",
        image: "/images/watch.jpg"
      },
      { 
        id: "a3", 
        name: "Statement Jewelry", 
        price: 350, 
        priceString: "₹350/day",
        image: "https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=781&q=80"
      },
      { 
        id: "a4", 
        name: "Premium Footwear", 
        price: 400, 
        priceString: "₹400/day",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
      },
    ]
  },
];
