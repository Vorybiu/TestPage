var X = 0, Y, R;



function validateY(){
    this.value = this.value.replace(/\,/g, ".").replace(/[^\d\.\-]/g, "");
    while (this.value.lastIndexOf('-') > 0) {
        this.value = this.value.substr(0, this.value.lastIndexOf('-'));
    }
    var y = parseFloat(this.value);
    while (y >= 5 || y <= -5) {
        this.value = this.value.substr(0, this.value.length - 1);
        y = parseFloat(this.value);
    }
    while ((this.value[0] == '-' && (this.value[1] == '.' || this.value.lastIndexOf('.') > 2)) || (this.value[0] != '-' && (this.value[0] == '.' || this.value.lastIndexOf('.') > 1))) {
        this.value = this.value.substr(0, this.value.lastIndexOf('.'));
    }
}
function validateR(){
    this.value = this.value.replace(/\,/g, ".").replace(/[^\d\.\-]/g, "");
    while (this.value.lastIndexOf('-') > 0) {
        this.value = this.value.substr(0, this.value.lastIndexOf('-'));
    }
    var r = parseFloat(this.value);
    while (r >= 5 || r <= 2) {
        this.value = this.value.substr(0, this.value.length - 1);
        r = parseFloat(this.value);
    }
    while ((this.value[0] == '-' && (this.value[1] == '.' || this.value.lastIndexOf('.') > 2)) || (this.value[0] != '-' && (this.value[0] == '.' || this.value.lastIndexOf('.') > 1))) {
        this.value = this.value.substr(0, this.value.lastIndexOf('.'));
    }
}

function set_X_value(id){
    X = document.getElementById(id).value;
    document.getElementById("xLabel").innerText="Выберите X (X="+X+")";

}

function checkY(){
    var value = document.getElementById("y-text").value;
    return value === null || value === undefined || value === "";
}
function checkR(){
    var value = document.getElementById("r-text").value;
    return value === null || value === undefined || value === "";
}
function clearTable(){
    $("#answer-table").find("tr:gt(0)").remove();
}

document.querySelector("#y-text").onkeyup = validateY;
document.querySelector("#r-text").onkeyup = validateR;

document.querySelector("#reset_button").onclick=res_button;

document.querySelector("#clear-table").onclick=clearTable;

function res_button(){
    set_X_value("x0");
}

let page = document.querySelector(".page");
let themeButton = document.querySelector(".theme-button");
themeButton.onclick = function (){
    page.classList.toggle("dark-theme");
};

$("#request-coordinates").on("submit", function(event)
{
    event.preventDefault();
    if (!checkY && !checkR) {
        alert("Недостаточно данных, пожалуйста, заполните все поля");
        return;
    }
    console.log("x="+X+"&"+$(this).serialize());
    Y = parseFloat(document.getElementById("y-text").value);
    R = parseFloat(document.getElementById("r-text").value);

    $.ajax({

        url: "check.php",
        dataType: "json",
        method: "GET",
        data: "x="+ X+"&y="+Y+ "&r=" +R + "&time=" + new Date().getTimezoneOffset() ,
        success: function(data) {
            console.log(data); // Возвращаемые данные выводим в консоль
            var st = `<tr><td>${data.x}</td><td>${data.y}</td><td>${data.r}</td><td>${data.hit ? "Попадание" : "Мимо"}</td><td>${data.exTime*1000}</td><td>${data.time}</td></tr>`;
            $('#answer-table').append(st);
        }
    });
});