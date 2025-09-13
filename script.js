const input = document.getElementById('input');
const flag = document.getElementById('flag');

async function getData() {
  try {
    const response = await fetch(`https://api.nationalize.io/?name=${input.value}`);
    if (!response.ok) {
      throw new Error('Response status: ' + response.status);
    }

    const result = await response.json();
    console.log(result);

    flag.innerHTML = ""; 

    result.country.map(davlatlar => {
      let div = document.createElement('div');
      div.classList.add("flex", "items-center", "gap-2", "ml-5", "mt-3");

      let percentage = (davlatlar.probability * 100).toFixed(2); 

      div.innerHTML = `
        <img class="h-5 w-6 shadow-2xl" 
          src="https://flagcdn.com/16x12/${davlatlar.country_id.toLowerCase()}.png"
          srcset="https://flagcdn.com/32x24/${davlatlar.country_id.toLowerCase()}.png 2x,
                  https://flagcdn.com/48x36/${davlatlar.country_id.toLowerCase()}.png 3x"
          width="16"
          height="12"
          alt="${davlatlar.country_id.toLowerCase()}">
        <span class="text-sm font-medium">${percentage}%</span>
      `;

      flag.append(div);
    });
  } catch (error) {
    console.error(error);
  }
}
