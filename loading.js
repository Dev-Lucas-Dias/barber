function loading(){
const loading=document.getElementById("loading");
loading.style.display="block";
setTimeout(()=>hideLoading());
}
function hideLoading(){
const loadings= document.getElementById("loading");
loadings.style.display="none";

}