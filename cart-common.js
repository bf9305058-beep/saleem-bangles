function addToCart(name, price, size){
  if(!name || name=="undefined" || name=="undefined - undefined"){
    alert("Bhai ye product ka naam nahi mil raha, cosmetics.html check karo!");
    return;
  }
  let cart = JSON.parse(localStorage.getItem('saleem_cart') || '[]');
  let p = parseInt(price) || 0;
  if(p==0){ alert("Price ka issue hai!"); return; }
  let full = size ? name + ' Size ' + size : name;
  cart.push({name: full, price: p});
  localStorage.setItem('saleem_cart', JSON.stringify(cart));
  
  let msg = document.createElement('div');
  msg.innerText = full + ' cart me add ho gaya! GO TO CART';
  msg.style = 'position:fixed;bottom:20px;left:5%;right:5%;background:#222;color:#fff;padding:12px;text-align:center;border-radius:8px;z-index:9999;';
  msg.onclick = ()=> location.href='cart.html';
  document.body.appendChild(msg);
  setTimeout(()=>msg.remove(),2500);
  
  if(event && event.target){ event.target.innerText = 'Go to cart'; event.target.onclick = ()=> location.href='cart.html'; }
  updateCartCount();
}
function updateCartCount(){
  let cart = JSON.parse(localStorage.getItem('saleem_cart') || '[]');
  let el = document.getElementById('cart-count');
  if(el) el.innerText = cart.length;
}
function renderCart(){
  let c = JSON.parse(localStorage.getItem('saleem_cart') || '[]');
  let box = document.getElementById('cartItems');
  if(!box) return;
  let html = ''; let total = 0;
  c.forEach((it,i)=>{
    let pr = parseInt(it.price)||0; total+=pr;
    html += `<div style="border:1px solid #ddd;padding:10px;margin:5px;display:flex;justify-content:space-between;"><span>${it.name} - Rs ${pr}</span><span onclick="removeItem(${i})" style="color:red;cursor:pointer;"> X </span></div>`;
  });
  box.innerHTML = html || 'Cart Khali Hai!';
  let tot = document.getElementById('cartTotal');
  if(tot) tot.innerHTML = c.length ? `<h3>Total: Rs ${total}</h3><button onclick="orderAllWA()" style="background:green;color:white;padding:14px;width:100%;border:none;border-radius:8px;">Order on WhatsApp - Rs ${total}</button>` : '';
}
function removeItem(i){ let cart = JSON.parse(localStorage.getItem('saleem_cart')||'[]'); cart.splice(i,1); localStorage.setItem('saleem_cart', JSON.stringify(cart)); renderCart(); updateCartCount(); }
function clearCart(){ localStorage.removeItem('saleem_cart'); renderCart(); updateCartCount(); }
function orderAllWA(){
  let c = JSON.parse(localStorage.getItem('saleem_cart')||'[]');
  if(c.length==0){ alert("Cart khali hai"); return; }
  c = c.filter(it=>it.name && it.name!="undefined" && !it.name.includes("undefined"));
  let total = c.reduce((s,it)=>s+(parseInt(it.price)||0),0);
  let msg = "*New Order - Saleem Bangles*%0A%0A";
  c.forEach((it,i)=>{ msg+=`${i+1}. ${it.name} - Rs ${it.price}%0A`; });
  msg+=`%0A*Total: Rs ${total}*`;
  window.open(`https://wa.me/917703067297?text=${msg}`,'_blank');
}
updateCartCount();
