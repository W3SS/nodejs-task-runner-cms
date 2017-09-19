
function loader() {
    var myVar = setTimeout(showPage, 300);
}

function showPage() {
  document.getElementById("loaderDiv").style.display = "none";
}

//scrollToTop
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("toTop").style.display = "block";
    } else {
        document.getElementById("toTop").style.display = "none";
    }
}

document.getElementById('toTop').onclick = function () {
    scrollTo(document.body, 0, 100);
};

//submit function
function sbmt(i){
  document.getElementById(i).submit();
}

//modal
function openMdl(mdlId) {
  var modal = document.getElementById(mdlId);
  modal.style.display = 'block';
};

function closeMdl(mdlId) {
  var modal = document.getElementById(mdlId);
  modal.style.display = 'none';
};

//custom console toggle
function showHide(){
    var e = document.getElementById('consoleCMD');
    if( e.style.display === "block" ) {
        e.style.display = "none" || e.style.display === null;

    } else {
        e.style.display = "block";
    }
}

// menu toggle
function showHideNav(i){
    var e = document.getElementById(i);
    if(e.style.display === null || e.style.display === "none") {
        e.style.display = "block";
    } else {
        e.style.display = "none";
    }
}

//delay  while tasks being carried out
function waiting() {
  setTimeout(function () {
    location.href = '/';
    //window.location="/";
  },5000);
}

//post
function postUpdateList() {
  var updateList = document.getElementById('pre3').innerHTML;
  var updateListFix = '[' + updateList.substring(0, updateList.length - 1) + ']';
  var finall = document.getElementById('Result').value;
  var isValidForm = document.forms['update'].checkValidity();
  if (isValidForm) {
  document.getElementById('Result').value = updateListFix;
  sbmt('update');
  } else {
  return false;
  }
}

//create taskgroup
function postTaskgroup() {
  //binding fix
  var updateList = document.getElementById('toAdd').value;
  var isValidForm = document.forms['createGroup'].checkValidity();
  if (isValidForm) {
  document.getElementById('Result').value = updateList;
  sbmt('createGroup');
  //console.log(Result.value)
  } else {
  return false;
  }
}

//update
function updateitem() {
  var updateList = document.getElementById('pre4').innerHTML;
  var isValidForm = document.forms['update'].checkValidity();
  if (isValidForm) {
  var finall = document.getElementById('pre1').innerHTML;
  var itemFix = updateList.substring(0, updateList.length - 1) + ',' + finall + ']';
  document.getElementById('Result').value = itemFix;
  //console.log(itemFix);
  sbmt('update');
  } else {
  return false;
  }
}

//delete
function Delete() {
  var deleteItem = document.getElementById('Choice').value;
  var isValidForm = document.forms['update'].checkValidity();
  if (isValidForm) {
  collection.removeItem('title', deleteItem);
  document.getElementById('Result').value = JSON.stringify(collection);
  //console.log(collection);
  sbmt('update');
  } else {
  return false;
  }
}

//filter
Object.prototype.removeItem = function(key, value) {
  var i;
  if (value === void 0) {
    return;
  }
  for (i in this) {
    if (this[i][key] === value) {
      this.splice(i, 1);
    }
  }
};

// array filter[total sum of array]
function sum(input) {
  //ie fix
  var toString = ({}).toString;

    if (toString.call(input) !== "[object Array]")
        return false;

    var total = 0;
    for (var i = 0; i < input.length; i++) {
        if (isNaN(input[i])) {
            continue;
        }
        total += Number(input[i]);
    }
    return total;
}

//append total below chart
function historyTotal() {
  var historyChart = document.getElementById('historyChart');
  historyChart.innerHTML += '<small>Total: ' + sum(arr) + '</small>';
}

//toggle nav
function toggleNav(name,toggle) {
  document.getElementById(name).classList.toggle( "active" );
  document.getElementById('content').classList.toggle(toggle);
}

//toggle nav link
function hideNvLnk(group) {
  document.getElementById(group).classList.toggle( "hidden" );
}

//toastr init
function toast() {
    var toastr = document.getElementById("toast");
    setTimeout(function(){
      toastr.className = toastr.className.replace("fadeInDown", "fadeOutUp");
      setTimeout(function(){
        toastr.classList.add('hidden');
      }, 1000);

    }, 3000);
}

//toggle options
function toggle (t) {
  if (t.innerHTML == "on") {
      t.innerHTML = "off";
  } else {
      t.innerHTML = "on";
  }
}


function removeClass(i,c){
   document.getElementById(i).classList.remove(c);
}

function tGroupVal(){
  removeClass("tGroupBtn",'disable');
}

function removeDisVal() {
  removeClass("toBackupBtn",'disable');
  removeClass("toDeleteBtn",'disable');
}

// check if is up to date
function checkUpdates(){
var xhr;
   xhr = new XMLHttpRequest();
   xhr.open('GET', 'https://raw.githubusercontent.com/angeal185/js-scripts/master/json/nodeRunner.json', true);
   xhr.send();
   xhr.onreadystatechange = function() {
     var latest,current,info,data,result;
     latest = document.getElementById('updateResult');
     current = document.getElementById('currentV');
     info = document.getElementById('currentInfo');
     if (this.readyState !== 4) {
       return;
     }
     if (this.status !== 200) {
       latest.innerHTML += 'OFFLINE';
       return;
     }

     data = JSON.parse(this.responseText);
     result = 'V' + data.latest;
     latest.innerHTML += result;

     //console.log(current)
     if (result === current.innerHTML) {
       console.log(result);
       info.classList.add('success');
       info.innerHTML += 'UP TO DATE';

       } else {
         info.classList.add('fail');
         info.innerHTML += 'UPDATE REQUIRED';
     }
   };
 }


Vue.config.delimiters = ['${', '}'];

new Vue({
  el: '#app',
  data: {
    title: 'Create new'
  }
});
