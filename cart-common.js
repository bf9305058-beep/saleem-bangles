function addToCart(name, price, size){
  if(!name || name=="undefined" || name.includes("undefined")){
    alert("Product naam nahi mil raha ben, cosmetics.html check karo!");
    return;
  }
  let cart = JSON.parse(localStorage.getItem('saleem_cart') || '[]');
  let p = parseInt(price) || 0;
  if(p==0){ alert("Price ka issue hai!"); return; }
  
  let full = size ? name + ' Size ' + size : name;
  cart.push({name: full, price: p});
  localStorage.setItem('saleem_cart', JSON.stringify(cart));
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Neeche wala popup
  let msg = document.createElement('div');
  msg.innerText = full + ' cart me add ho gaya! GO TO CART';
  msg.style = 'position:fixed;bottom:20px;left:5%;right:5%;background:#111;color:#fff;padding:14px;text-align:center;border-radius:10px;z-index:9999;cursor:pointer;font-weight:600;';
  msg.onclick = ()=> location.href='cart.html';
  document.body.appendChild(msg);
  setTimeout(()=>msg.remove(),2500);
  
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
  
  let html = ''; 
  let total = 0;
  c.forEach((it,i)=>{
    let pr = parseInt(it.price)||0; 
    total+=pr;
    html += `<div style="border:1px solid #eee;padding:12px;margin:6px 0;display:flex;justify-content:space-between;align-items:center;background:white;border-radius:10px;"><span style="font-size:13px;"><b>${it.name}</b> - Rs ${pr}</span><span onclick="removeItem(${i})" style="color:red;cursor:pointer;font-weight:bold;"> ❌ </span></div>`;
  });
  box.innerHTML = html || '<p style="text-align:center; padding:20px;">Cart Khali Hai! 🛒</p>';
  
  let tot = document.getElementById('cartTotal');
  if(tot){
    if(c.length>0){
      let ship = 80;
      let finalTotal = total + ship;
      tot.innerHTML = `
        <div style="padding:10px; background:white; border-radius:10px; margin-top:10px;">
          <div style="display:flex; justify-content:space-between;"><span>Subtotal</span><span>Rs ${total}</span></div>
          <div style="display:flex; justify-content:space-between;"><span>Shipping</span><span>Rs ${ship}</span></div>
          <h3 style="display:flex; justify-content:space-between; border-top:1px solid #ddd; padding-top:8px;"><span>Total</span><span>Rs ${finalTotal}</span></h3>
          <button onclick="location.href='checkout.html'" style="background:#ff6f00; color:white; padding:14px; width:100%; border:none; border-radius:10px; font-weight:700; margin-top:10px;">Proceed to Checkout - Payment 💳</button>
          <button onclick="orderAllWA()" style="background:#25D366; color:white; padding:14px; width:100%; border:none; border-radius:10px; font-weight:700; margin-top:8px;">Order on WhatsApp</button>
          <button onclick="clearCart()" style="background:white; border:1px solid #ddd; padding:10px; width:100%; border-radius:10px; margin-top:8px;">Clear Cart</button>
        </div>`;
      window.finalTotal = finalTotal;
    } else {
      tot.innerHTML = '';
    }
  }
}

function removeItem(i){ 
  let cart = JSON.parse(localStorage.getItem('saleem_cart')||'[]'); 
  cart.splice(i,1); 
  localStorage.setItem('saleem_cart', JSON.stringify(cart));
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart(); 
  updateCartCount(); 
}

function clearCart(){ 
  localStorage.removeItem('saleem_cart'); 
  localStorage.removeItem('cart'); 
  renderCart(); 
  updateCartCount(); 
}

function orderAllWA(){
  let c = JSON.parse(localStorage.getItem('saleem_cart')||'[]');
  if(c.length==0){ alert("Cart khali hai ben"); return; }
  c = c.filter(it=>it.name && it.name!="undefined" && !it.name.includes("undefined"));
  let total = c.reduce((s,it)=>s+(parseInt(it.price)||0),0);
  let ship = 80;
  let finalTotal = total + ship;
  let msg = "*New Order - Saleem Bangles*%0A%0A";
  c.forEach((it,i)=>{ msg+=`${i+1}. ${it.name} - Rs ${it.price}%0A`; });
  msg+=`%0ASubtotal: Rs ${total}%0AShipping: Rs ${ship}%0A*Total: Rs ${finalTotal}*`;
  window.open(`https://wa.me/917703067297?text=${msg}`,'_blank');
}

updateCartCount();
