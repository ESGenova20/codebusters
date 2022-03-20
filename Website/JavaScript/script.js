var prevScrollpos = window.pageYOffset;
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}



window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0px";
    } else {
        document.getElementById("navbar").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
}

function Easternfront() {
    const element2 = document.getElementById("Fronts");
    element2.innerHTML = "Eastern front. On the Eastern Front of World War I, Russian forces invaded the German-held regions of East Prussia and Poland, but were stopped short by German and Austrian forces at the Battle of Tannenberg in late August 1914. Despite that victory, Russia's assault had forced Germany to move two corps from the Western Front to the Eastern, contributing to the German loss in the Battle of the Marne. Combined with the fierce Allied resistance in France, the ability of Russia’s huge war machine to mobilize relatively quickly in the east ensured a longer, more grueling conflict instead of the quick victory Germany had hoped to win under the Schlieffen Plan.";
    document.getElementById('myImage').src = '../codebusters/Website/images/world-war-one-eastern-front.png';

}

function Westernfront() {
    const element = document.getElementById("Fronts");
    element.innerHTML = "Western front. On August 4, 1914, German troops crossed the border into Belgium. In the first battle of World War I, the Germans assaulted the heavily fortified city of Liege, using the most powerful weapons in their arsenal—enormous siege cannons—to capture the city by August 15. The Germans left death and destruction in their wake as they advanced through Belgium toward France, shooting civilians and executing a Belgian priest they had accused of inciting civilian resistance.";
    document.getElementById('myImage').src = '../codebusters/Website/images/world-war-one-western-front.png';
}

  function changeText(txt) {
    document.getElementById("desc").innerHTML = txt;
  }

  function to1914y() {
    const bt1914y = document.getElementById('button-to1914y');

    bt1914y.addEventListener('click', () => {
      const map1 = document.getElementsByClassName('m1923');
      const map2 = document.getElementsByClassName('m1914');
      for (const m1923 of map1) {
        m1923.style.display = 'none';
      }
      const map = document.getElementsByClassName('m1914');
      for (const m1914 of map2) {
        m1914.style.display = 'block';
      }
    });
  }
  function to1923y() {
    const bt1923y = document.getElementById('button-to1923y');

    bt1923y.addEventListener('click', () => {
      const map1 = document.getElementsByClassName('m1923');
      const map2 = document.getElementsByClassName('m1914');
      for (const m1923 of map1) {
        m1923.style.display = 'block';
      }
      const map = document.getElementsByClassName('m1914');
      for (const m1914 of map2) {
        m1914.style.display = 'none';
      }
    });
    
  }