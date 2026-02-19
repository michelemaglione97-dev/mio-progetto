function gestisciNavbar() {
    const navList = document.querySelector('.navbar-nav');

    if (navList) {
        const socialIconsHTML = `
            <div class="ms-auto d-flex flex-row gap-4 align-items-center py-2 py-lg-0 pe-lg-5">
                <a class="nav-link social-icon" href="#" style="color: #25D366 !important; font-size: 1.5rem; list-style: none !important;">
                    <i class="bi bi-whatsapp"></i>
                </a>
                <a class="nav-link social-icon" href="#" style="color: #E4405F !important; font-size: 1.5rem; list-style: none !important;">
                    <i class="bi bi-instagram"></i>
                </a>
                <a class="nav-link social-icon" href="#" style="color: #1DA1F2 !important; font-size: 1.5rem; list-style: none !important;">
                    <i class="bi bi-twitter-x"></i>
                </a>
            </div>
        `;

        if (window.innerWidth < 992) {
            
            navList.parentElement.insertAdjacentHTML('beforeend', socialIconsHTML); //beforeen significa mettili prima della fine
        } else {
            navList.parentElement.insertAdjacentHTML('beforeend', socialIconsHTML); //parentElemente rappresenta la scatola quindi considere l insieme degli ul
        }
    }
};


let backupDelFooter = ""; 
function gestisciFooter() {
    const footer = document.querySelector('footer');
  
  
    if (backupDelFooter === "") {
        backupDelFooter = footer.innerHTML; 
    }

    const width = window.innerWidth; 

    if (width >= 768 && width < 992) {
       
        footer.innerHTML = `
        <div class="container text-center">
            <div class="row align-items-center g-4">

              
                <div class="col-12">
                    <iframe 
                        src="https://www.google.com/maps?q=Napoli&output=embed" 
                        width="100%" height="150" style="border:0; border-radius:10px;" loading="lazy">
                    </iframe>
                </div>

            
                <div class="col-12">
                    <div class="d-flex justify-content-center gap-3 fs-4">
                        <i class="bi bi-facebook social-icon"></i>
                        <i class="bi bi-twitter social-icon"></i>
                        <i class="bi bi-instagram social-icon"></i>
                        <i class="bi bi-youtube social-icon"></i>
                    </div>
                </div>

             
                <div class="col-12">
                    <p class="mb-1">
                        <a href="tel:+390811234567" class="footer-link">
                            <i class="bi bi-telephone-fill"></i> +39 081 1234567
                        </a>
                    </p>
                    <p class="mb-0">
                        <a href="info@harley.it" class=" footer-link">
                            <i class="bi bi-envelope-fill"></i> info@harley.it
                        </a>
                    </p>
                </div>

            </div>
        </div>
        `;
    } else {

        
        footer.innerHTML = backupDelFooter;
    }
}

window.addEventListener('load', gestisciFooter);
window.addEventListener('load', gestisciNavbar);
window.addEventListener('resize', gestisciFooter);


