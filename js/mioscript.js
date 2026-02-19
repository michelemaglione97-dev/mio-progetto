let x=10;
let y="10";
	
	function test()
	{
		
		let titolo=document.getElementById("primoTitolo").innerHTML
		
		alert(titolo)
		
		
	}
	
	
	
	/*
	function test()
	{
		
		/*let titolo=document.getElementById("primoTitolo").textContent
		
		alert(titolo.length)
		
		let cont=0;
		//let titoli=document.getElementsByTagName("h1");
		let titoli=document.querySelectorAll("h1")
		
		let titolo=document.querySelector("#primoTitolo")
		
		titolo.style.color="red";
		
		
		for(let i=0; i<titoli.length; i++)
		{
				if(titoli[i].textContent.includes("Ciao"))
					cont++;	
				
				
				//console.log(titoli[i].textContent)
				
		}
		
		console.log("I saluti sono:"+cont)
		*/
	/*	
		let divEl=document.querySelector(".disegna")
		//divEl.style.display="none"
		divEl.innerHTML="<p> HO FAME!</p>"
	}
	*/
	
	
	
	function verifica()
	{
		let nome=document.reg.nome
		//alert(nome)
		let reg= new RegExp("^[a-zA-Z]{3,15}$")
		
		
		if(!reg.test(nome.value))
		{
			nome.classList.add("is-invalid")
			nome.classList.remove("is-valid")
			return false;
			
		}else
		{
			nome.classList.add("is-valid")
			nome.classList.remove("is-invalid")
			return true;
		}			
	
		
		
	}