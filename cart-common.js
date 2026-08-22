function addToCart(name, price, sizeOrShade){
  let cart = JSON.parse(localStorage.getItem('saleem_cart') || '[]');
  let p = parseInt(price) || 0;
  if(p==0) p = 250; // agar price na aaye to default
  let fullName = sizeOrShade ? name + ' - ' + sizeOrShade : name;
  cart.push({name: fullName, price: p});
  localStorage.setItem('saleem_cart', JSON.stringify(cart));
  showToast('Item added to cart');
  if(event && event.target){
    event.target.innerText = 'Go to cart';
    event.target.onclick = function(){ window.location.href='cart.html'; };
  }
  updateCartCount();
}
function showToast(msg){
  let div = document.createElement('div');
  div.innerText = msg + '  GO TO CART';
  div.style = 'position:fixed;bottom:20px;left:5%;right:5%;background:#222;color:white;padding:14px;text-align:center;border-radius:8px;z-index:9999;font-weight:bold;';
  div.onclick = ()=> window.location.href='cart.html';
  document.body.appendChild(div);
  setTimeout(()=>div.remove(), 3000);
}
function updateCartCount(){
  let cart = JSON.parse(localStorage.getItem('saleem_cart') || '[]');
  let el = document.getElementById('cart-count');
  if(el) el.innerText = cart.length;
}
function renderCart(){
 let c = JSON.parse(localStorage.getItem('saleem_cart')||'[]');
 let html=''; let total=0;
 let box = document.getElementById('cartItems');
 if(!box) return;
 c.forEach((it,i)=>{
   let price = parseInt(it.price) || 0;
   total+=price;
   html+=`<div style="border:1px solid #ddd;padding:10px;margin:6px;border-radius:6px;">${it.name}<br><b>₹${price}</b><span onclick="removeItem(${i})" style="float:right;color:red;cursor:pointer;font-weight:bold;"> X Remove</span></div>`;
 });
 box.innerHTML = html || 'Cart Khali Hai';
 let tot = document.getElementById('cartTotal');
 if(tot) tot.innerHTML = c.length ? `<h3>Total: ₹${total}</h3><button onclick="orderAllWA()" style="background:green;color:white;padding:14px;width:100%;border:none;border-radius:8px;font-size:16px;">Order on WhatsApp - ₹${total}</button>` : '';
}
function removeItem(i){ let c=JSON.parse(localStorage.getItem('saleem_cart')||'[]'); c.splice(i,1); localStorage.setItem('saleem_cart',JSON.stringify(c)); renderCart(); updateCartCount(); }
function orderAllWA(){
 let c=JSON.parse(localStorage.getItem('saleem_cart')||'[]'); 
 if(!c.length){alert('Cart khali hai');return;}
 let lines = [];
 let total = 0;
 c.forEach(it=>{
   let price = parseInt(it.price) || 0;
   lines.push(it.name + ' - Rs' + price);
   total+=price;
 });
 let msg = 'Saleem Bangle Store Order:\n' + lines.join('\n') + '\nTotal: Rs' + total;
 let url = 'https://wa.me/917703067297?text=' + encodeURIComponent(msg);
 window.open(url,'_blank');
}
updateCartCount();
if(document.getElementById('cartItems')) renderCart();
