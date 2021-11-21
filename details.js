var containerFrases = document.createElement("div");
containerFrases.getAttribute("class", "contaiFrases");
container.appendChild(containerFrases);

var ul = document.createElement("ul");
containerFrases.appendChild(ul);

for (var i=0; i<Array.length; i++){
  var li = document.createElement("li");
  ul.appendChild(li);
  li.innerHTML=li.innerHTML + arrayFrases[i];
}

arrayFrases[0]='Today is a great day';
arrayFrases[1]='Today is a funny day';
arrayFrases[2]='Today is a special day';
arrayFrases[3]='Today is a lazzy day';
console.log(arrayFrases)