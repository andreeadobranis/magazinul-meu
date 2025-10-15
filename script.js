// === PRODUSELE TALE ===
const PRODUCTS = [
  { id: 'p1', title: 'Tricou', price: 79.00, img: 'https://via.placeholder.com/400x300?text=Tricou' },
  { id: 'p2', title: 'Cana', price: 39.00, img: 'https://via.placeholder.com/400x300?text=Cana' },
  { id: 'p3', title: 'Sticker', price: 9.00, img: 'https://via.placeholder.com/400x300?text=Sticker' }
];

const productsContainer = document.getElementById('products');
const cartItemsEl = document.getElementById('cart-items');
const totalEl = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout');

let cart = {}; // unde se stochează produsele adăugate

function renderProducts(){
  PRODUCTS.forEach(p=>{
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.price.toFixed(2)} RON</p>
      <button data-id="${p.id}">Adaugă în coș</button>
    `;
    productsContainer.appendChild(div);
  });
}

function renderCart(){
  cartItemsEl.innerHTML = '';
  let total = 0;
  for(const id in cart){
    const prod = PRODUCTS.find(p=>p.id===id);
    const qty = cart[id];
    const li = document.createElement('li');
    li.textContent = `${prod.title} x ${qty} — ${(prod.price*qty).toFixed(2)} RON`;
    cartItemsEl.appendChild(li);
    total += prod.price * qty;
  }
  totalEl.textContent = total.toFixed(2);
}

document.addEventListener('click', e=>{
  if(e.target.matches('[data-id]')){
    const id = e.target.getAttribute('data-id');
    cart[id] = (cart[id]||0) + 1;
    renderCart();
  }
});

checkoutBtn.addEventListener('click', ()=>{
  if(Object.keys(cart).length===0){ alert('Coșul este gol'); return; }
  const GOOGLE_FORM_BASEURL = 'https://docs.google.com/forms/d/e/1FAIpQLSe1NQ4YY0WyA8jbHmnIT4f3G/formResponse'; // aici pui linkul tău
  const orderText = Object.entries(cart).map(([id,qty])=>{
    const p = PRODUCTS.find(x=>x.id===id);
    return `${p.title} x${qty}`;
  }).join('; ');
  const params = new URLSearchParams();
  params.set('entry.1234567890', orderText); // înlocuiește entry.XXXX cu codul tău
  window.open(GOOGLE_FORM_BASEURL + '?' + params.toString(), '_blank');
});

renderProducts();
renderCart();
