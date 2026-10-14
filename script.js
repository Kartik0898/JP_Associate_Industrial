
const PROPERTIES=[
{id:"DEMO-001",title:"Demo Industrial Plot",type:"Industrial Plot",location:"Khushkhera",area:25000,unit:"sq. ft.",deal:"For Sale",price:8500000,image:"https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80",desc:"Illustrative industrial plot listing for trial website preview. All details require verification."},
{id:"DEMO-002",title:"Demo Factory Building",type:"Factory Building",location:"Bhiwadi",area:18000,unit:"sq. ft.",deal:"For Sale",price:12500000,image:"https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=900&q=80",desc:"Illustrative factory building with sample specifications for testing property filters."},
{id:"DEMO-003",title:"Demo Industrial Shed",type:"Industrial Shed",location:"Tapukara",area:12000,unit:"sq. ft.",deal:"For Lease",price:180000,image:"https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",desc:"Illustrative industrial shed listing. Rental figure is a demo amount, not an actual offer."},
{id:"DEMO-004",title:"Demo Warehouse Facility",type:"Warehouse",location:"Neemrana",area:32000,unit:"sq. ft.",deal:"For Lease",price:320000,image:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",desc:"Illustrative warehouse listing for demonstration. Availability and dimensions are not verified."},
{id:"DEMO-005",title:"Demo Industrial Land",type:"Industrial Investment Property",location:"Khushkhera",area:40000,unit:"sq. ft.",deal:"For Sale",price:15000000,image:"https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80",desc:"Illustrative industrial land opportunity for the trial site. Verify all information before publication."},
{id:"DEMO-006",title:"Demo Factory Space for Lease",type:"Factory Building",location:"Bhiwadi",area:9500,unit:"sq. ft.",deal:"For Lease",price:145000,image:"https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=900&q=80",desc:"Illustrative factory space for lease. The area and monthly rent are placeholder values."}
];
const money=n=>"₹"+Number(n).toLocaleString("en-IN");
function card(p){return `<article class="property"><img src="${p.image}" alt="Industrial property demo: ${p.title}" loading="lazy"><div class="propertybody"><span class="demo">Demo listing</span><h3>${p.title}</h3><div class="meta"><span>📍 ${p.location}</span><span>▦ ${p.area.toLocaleString("en-IN")} sq. ft.</span><span>${p.deal}</span></div><div class="price">${p.price?money(p.price):"Price on Request"} <small style="font-weight:400;color:#777">${p.deal==="For Lease"?"/ month (demo)": "(demo)"}</small></div><div class="cardbottom"><a class="btn outline" href="property.html?id=${p.id}">View Details</a><a class="btn" href="contact.html?property=${encodeURIComponent(p.title)}">Enquire</a></div></div></article>`}
function renderProperties(targetId="propertyGrid",filters=true){const target=document.getElementById(targetId);if(!target)return;let list=[...PROPERTIES];const val=id=>(document.getElementById(id)?.value||"").trim();if(filters){const q=val("searchInput").toLowerCase(),type=val("typeFilter"),loc=val("locationFilter"),deal=val("dealFilter"),min=Number(val("minArea"))||0,max=Number(val("maxArea"))||Infinity,minp=Number(val("minPrice"))||0,maxp=Number(val("maxPrice"))||Infinity;list=list.filter(p=>(!q||(p.title+" "+p.location+" "+p.id).toLowerCase().includes(q))&&(!type||p.type===type)&&(!loc||p.location===loc)&&(!deal||p.deal===deal)&&p.area>=min&&p.area<=max&&p.price>=minp&&p.price<=maxp)}const count=document.getElementById("resultCount");if(count)count.textContent=`${list.length} demo ${list.length===1?"property":"properties"} found`;target.innerHTML=list.length?list.map(card).join(""):`<div class="empty"><h3>No properties match these filters</h3><p>Try changing your search or clear all filters.</p><button class="btn" onclick="clearFilters()">Clear All Filters</button></div>`}
function clearFilters(){["searchInput","typeFilter","locationFilter","dealFilter","minArea","maxArea","minPrice","maxPrice"].forEach(id=>{const e=document.getElementById(id);if(e)e.value=""});renderProperties()}
function setupModal(){const modal=document.getElementById("enquiryModal");if(!modal)return;const dismissed=sessionStorage.getItem("jpPopupDismissed");if(!dismissed)setTimeout(()=>modal.classList.add("show"),900);const close=()=>{modal.classList.remove("show");sessionStorage.setItem("jpPopupDismissed","1")};document.getElementById("closeModal")?.addEventListener("click",close);modal.addEventListener("click",e=>{if(e.target===modal)close()});document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});document.getElementById("modalForm")?.addEventListener("submit",e=>{e.preventDefault();document.getElementById("modalMessage").textContent="Demo submission successful. No enquiry has been sent or stored.";e.target.reset()})}
function setupForms(){document.querySelectorAll(".demo-form").forEach(form=>form.addEventListener("submit",e=>{e.preventDefault();const out=form.querySelector(".formmessage");if(out)out.textContent="Demo submission successful. This trial form does not send or store your details.";form.reset()}))}
function setupMenu(){const burger=document.getElementById("hamburger"),links=document.getElementById("navlinks");burger?.addEventListener("click",()=>{links.classList.toggle("open");burger.setAttribute("aria-expanded",links.classList.contains("open"))});document.querySelectorAll(".dropbtn").forEach(b=>b.addEventListener("click",e=>{if(window.matchMedia("(max-width:760px)").matches){e.preventDefault();b.parentElement.classList.toggle("open")}}))}
function renderDetail(){const el=document.getElementById("propertyDetail");if(!el)return;const id=new URLSearchParams(location.search).get("id");const p=PROPERTIES.find(x=>x.id===id)||PROPERTIES[0];document.title=p.title+" | JP Associate";el.innerHTML=`<div class="detailgrid"><div><img class="detailimage" src="${p.image}" alt="${p.title}"><div class="notice">Demo listing: details, area, price and availability are illustrative only.</div><h2>${p.title}</h2><p>${p.desc}</p><div class="specs"><div class="spec"><small>Reference ID</small><strong>${p.id}</strong></div><div class="spec"><small>Property type</small><strong>${p.type}</strong></div><div class="spec"><small>Location</small><strong>${p.location}, Rajasthan</strong></div><div class="spec"><small>Area</small><strong>${p.area.toLocaleString("en-IN")} sq. ft.</strong></div><div class="spec"><small>Transaction</small><strong>${p.deal}</strong></div><div class="spec"><small>Demo price</small><strong>${money(p.price)}${p.deal==="For Lease"?"/month":""}</strong></div></div></div><aside class="formcard"><span class="demo">Demo listing</span><h2>Enquire About This Property</h2><p class="intro">Contact JP Associate to discuss your industrial property requirements.</p><form class="demo-form"><div class="field"><label>Full name</label><input required placeholder="Your name"></div><div class="field" style="margin-top:12px"><label>Phone number</label><input required type="tel" pattern="[0-9+() -]{8,18}" placeholder="Your phone number"></div><div class="field" style="margin-top:12px"><label>Message</label><textarea rows="3" placeholder="Tell us what you need">${p.title} (${p.id})</textarea></div><button class="btn" style="width:100%;margin-top:14px">Submit Demo Enquiry</button><p class="formmessage" aria-live="polite"></p></form><p><a class="btn outline" href="tel:07737210073">☎ Call 07737210073</a></p></aside></div>`;setupForms()}
function setupTypewriter(){
    const target=document.getElementById("heroTypedText");
    if(!target)return;
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;

    const prefix="the Right ";
    const goldWord="Industrial Property";
    const suffix=" for Your Business";
    const fullText=prefix+goldWord+suffix;

    let charIndex=0;
    let isDeleting=false;

    function renderCurrent(idx){
        if(idx===0){
            target.innerHTML="";
        }else if(idx<=prefix.length){
            target.innerHTML=fullText.slice(0,idx);
        }else if(idx<=prefix.length+goldWord.length){
            target.innerHTML=prefix+"<em>"+fullText.slice(prefix.length,idx)+"</em>";
        }else{
            target.innerHTML=prefix+"<em>"+goldWord+"</em>"+fullText.slice(prefix.length+goldWord.length,idx);
        }
    }

    // Clear initial static content to start typing animation
    target.innerHTML="";

    function type(){
        if(isDeleting){
            charIndex--;
            renderCurrent(charIndex);
        }else{
            charIndex++;
            renderCurrent(charIndex);
        }

        let delay=isDeleting?25:65;
        if(!isDeleting){
            delay+=Math.floor(Math.random()*25);
        }

        if(!isDeleting&&charIndex===fullText.length){
            delay=4500;
            isDeleting=true;
        }else if(isDeleting&&charIndex===0){
            isDeleting=false;
            delay=600;
        }

        setTimeout(type,delay);
    }

    setTimeout(type,350);
}
document.addEventListener("DOMContentLoaded",()=>{setupMenu();setupModal();setupForms();renderProperties();renderDetail();setupTypewriter();const query=new URLSearchParams(location.search).get("property");if(query){const f=document.querySelector('input[name="propertyRequirement"]');if(f)f.value=query}const track=document.querySelector(".reviewtrack");if(track){track.innerHTML+=track.innerHTML}});
