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
    document.getElementById("navbar").style.top = "-80px";
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

function OpenNavBar() {
  document.getElementById("DropNav").style.height = "100vh";
}

function CloseNavBar() {
  document.getElementById("DropNav").style.height = "0vh";
}

function Introuction() {
  const title = document.getElementById("Tittle");
  title.innerHTML = "Introduction";
  const element = document.getElementById("Text");
  element.innerHTML = "World War I, also known as the Great War, began in 1914 after the assassination of Archduke Franz Ferdinand of Austria. His murder catapulted into a war across Europe that lasted until 1918. During the conflict, Germany, Austria-Hungary, Bulgaria and the Ottoman Empire (the Central Powers) fought against Great Britain, France, Russia, Italy, Romania, Japan and the United States (the Allied Powers). Thanks to new military technologies and the horrors of trench warfare, World War I saw unprecedented levels of carnage and destruction. By the time the war was over and the Allied Powers claimed victory, more than 16 million people—soldiers and civilians alike—were dead.";
}
function events() {
  const title = document.getElementById("Tittle");
  title.innerHTML = "Franco-Russian Alliance ";
  const element = document.getElementById("Text");
  element.innerHTML = "Both Russia and France, which had been humiliated in the Franco-Prussian War of 1870-71, feared the rising power of Germany, which had already formed alliances with Austria-Hungary and Italy. So the two nations decided to join forces for mutual protection as well. It was the start of what would become the Allied side, the Triple Entente, in World War I.";

}
function Casualties() {
  const title = document.getElementById("Tittle");
  title.innerHTML = "World War I Casualties";
  const element = document.getElementById("Text");
  element.innerHTML = "World War I took the lives of more than 9 million soldiers; 21 million more were wounded. Civilian casualties numbered close to 10 million. The two nations most affected were Germany and France, each of which sent some 80 percent of their male populations between the ages of 15 and 49 into battle.";

}