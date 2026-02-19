	
	let x=10;
	x="ciao"; //-- posso cambiare il tipo
	const y=10;
	<!-- y="ciao"; // mi da errore non posso riassegnare il valor,è una costante -->
	let z="10";
	
	function test()
	{ //appena apro la pagina mi stampa(onload) il valore --> 
	if(x===z)
	 console.log(x+z)
	else
	 console.log("le variabili sono differenti")
	}
	

	/*
	function test()
	{
		/*let titolo=	document.getElementById("primoTitolo").textContent
		
		
		alert(titolo.lenght)
		
		let cont=0;
		//let titoli=document.getElementsByTagName("h1");
		let titoli=document.querySelectorAll("h1 b") //sfrutto i selettori css
		titoli.style.color="red";
		
		/*
		for(let i=0; i<titoli.lenght; i++)
		{
			if(titoli[i].textContent.includes("Ciao"))
				cont++;
			
		}
		console.log("i saluti sono:" +cont)
		*/
		/*
		let divEl=document.querySelector(".disegna")
		//divEl.style.display="none" //nascondo il DIV
		divEl.innerHTML="<p> HO FAME! </p>" //riscrivo il contento
		
		
		
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
	
	async initComuni(){
		
		const risposta =await fetch('https://api.npoint.io/70bebb9d6157ec903d30') //richiesta legata al browser e mi darà un oggetto(il contenitore)
		
		
		
		
	}
	
	document.addEventLsitener('DOMContenLoaded', initComuni());