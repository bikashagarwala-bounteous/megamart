const BASE = 'https://fakestoreapi.com';

export async function fetchProducts() {
    const res = await fetch(`${BASE}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return (await res.json()) as any[];
}

export async function fetchProductById(id: number | string) {
    const res = await fetch(`${BASE}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return (await res.json()) as any;
}

export async function fetchCategories() {
    const res = await fetch(`${BASE}/products/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return (await res.json()) as string[];
}

export async function fetchProductsByCategory(category: string) {
    const res = await fetch(`${BASE}/products/category/${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error('Failed to fetch category products');
    return (await res.json()) as any[];
}
