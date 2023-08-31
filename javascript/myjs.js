// JavaScript Document
//button 2
function grow1(elem){
			let size = 24;
			function growthFrame(elem){
				//clearInterval(shrinkInterval)
				if(size == 32){
					clearInterval(growInterval)
				}
				else{
					size += 1;
					elem.style.fontSize = size + "px"
				}
			}	
			var growInterval = setInterval(function() {growthFrame(elem)}, 40);
		}
		
function shrink1(elem){
			let size = 32;
			function shrinkFrame(elem){
				//clearInterval(growInterval)
				if(size == 24){
					clearInterval(shrinkInterval)
				}
				else{
					size -= 1;
					elem.style.fontSize = size + "px"
				}
			}
	
			var shrinkInterval = setInterval(function() {shrinkFrame(elem)}, 40);
		}

//button 2
function grow2(elem){
			let size = 24;
			function growthFrame(elem){
				//clearInterval(shrinkInterval)
				if(size == 32){
					clearInterval(growInterval)
				}
				else{
					size += 1;
					elem.style.fontSize = size + "px"
				}
			}	
			var growInterval = setInterval(function() {growthFrame(elem)}, 40);
		}
		
function shrink2(elem){
			let size = 32;
			function shrinkFrame(elem){
				//clearInterval(growInterval)
				if(size == 24){
					clearInterval(shrinkInterval)
				}
				else{
					size -= 1;
					elem.style.fontSize = size + "px"
				}
			}
	
			var shrinkInterval = setInterval(function() {shrinkFrame(elem)}, 40);
		}

//button 3
function grow3(elem){
			let size = 24;
			function growthFrame(elem){
				//clearInterval(shrinkInterval)
				if(size == 32){
					clearInterval(growInterval)
				}
				else{
					size += 1;
					elem.style.fontSize = size + "px"
				}
			}	
			var growInterval = setInterval(function() {growthFrame(elem)}, 40);
		}
		
function shrink3(elem){
			let size = 32;
			function shrinkFrame(elem){
				//clearInterval(growInterval)
				if(size == 24){
					clearInterval(shrinkInterval)
				}
				else{
					size -= 1;
					elem.style.fontSize = size + "px"
				}
			}
	
			var shrinkInterval = setInterval(function() {shrinkFrame(elem)}, 40);
		}