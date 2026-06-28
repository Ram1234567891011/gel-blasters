
const catalogGrid=document.getElementById('catalogGrid');
const searchBar=document.getElementById('searchBar');
let currentGallery=[],currentIndex=0,currentUnit=null;

function renderUnits(data){
catalogGrid.innerHTML='';
data.forEach(unit=>{
const badgeClass=unit.category==='mid'?'badge mid':unit.category==='graffiti'?'badge graffiti':'badge';
const card=document.createElement('div');
card.className='card';
card.innerHTML=`<img src="${unit.gallery[0]}"><div class="card-content">${unit.featured?'<div class="best-seller">🔥 BEST SELLER</div>':''}<span class="${badgeClass}">${unit.category.toUpperCase()}</span><h2>${unit.name}</h2><p>${unit.description}</p><div class="stats"><div>${unit.fps}</div><div>${unit.battery}</div></div><div class="price">${unit.price||'PM FOR PRICE'}</div><a href="${unit.tiktok||'#'}" target="_blank" class="buy-btn">🛒 BUY NOW</a></div>`;
card.onclick=()=>openModal(unit);
catalogGrid.appendChild(card);
});
}

function openModal(unit){
currentUnit=unit;
currentGallery=unit.gallery;
currentIndex=0;
updateModal();
document.getElementById('unitModal').style.display='flex';
}

function closeModal(){document.getElementById('unitModal').style.display='none';}

function updateModal(){
document.getElementById('modalImage').src=currentGallery[currentIndex];
document.getElementById('modalTitle').innerText=currentUnit.name;
document.getElementById('modalDesc').innerText=currentUnit.description;
document.getElementById('modalStats').innerHTML=`<div>${currentUnit.fps}</div><div>${currentUnit.battery}</div>`;
//document.getElementById('modalPrice').textContent = unit.price || 'Contact for Price';
document.getElementById('featureList').innerHTML=currentUnit.features.map(f=>`<li>${f}</li>`).join('');
document.getElementById('freebieList').innerHTML=currentUnit.freebies.map(f=>`<li>${f}</li>`).join('');
}

function prevImage(){currentIndex=(currentIndex-1+currentGallery.length)%currentGallery.length;updateModal();}
function nextImage(){currentIndex=(currentIndex+1)%currentGallery.length;updateModal();}
function zoomImage(){document.getElementById('zoomModal').style.display='flex';document.getElementById('zoomedImage').src=currentGallery[currentIndex];}
function closeZoom(){document.getElementById('zoomModal').style.display='none';}

function filterUnits(category){
if(category==='all'){renderUnits(units);return;}
renderUnits(units.filter(u=>u.category===category));
}

searchBar.addEventListener('keyup',()=>{
const value=searchBar.value.toLowerCase();
renderUnits(units.filter(u=>u.name.toLowerCase().includes(value)));
});

renderUnits(units);
