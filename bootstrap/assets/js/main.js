const BaseURL = () => {
  if (window.location.hostname == 'vrp.shipito.ir') {
    return 'https://vrp.shipito.ir'
  } else {
    return 'http://localhost:5000'
  }
}

const handlerCheckApiKey = (constValue, inputValue) => {
  if (!inputValue) {
    alert('api key خالی میباشد')
  } else if (inputValue != constValue) {
    alert('api key نادرست میباشد')
  } else {
    window.location = '/postex-map/routing/parsiMap.html'
  }
}

function handlerShowModal() {
  if(checkCaptcha()){
    $('#showSettingModal').modal('toggle');
  }
}
function handlerHideModal() {
    $('#showSettingModal').modal('toggle');
}

function handlerCalculatedDurationCar(durationMatrix, vehicleRoutes) {
  let distances = {};

  for (let i = 1; i < vehicleRoutes.length; i++) {
    let route = vehicleRoutes[i];
    let distance = 0;

    for (let j = 1; j < route.length; j++) {
      let from = route[j - 1];
      let to = route[j];
      distance += durationMatrix[from][to];
    }

    distances[`vehicle${i}`] = (distance / 60);
  }

  excelReport(distances)
  // return distances;
}

function excelReport(duration_matrix) {
  if (duration_matrix) {
    // تعریف داده‌ها
    var data = [];
    data.push(duration_matrix)

    // تعریف یک کاربرد جدول
    var ws = XLSX.utils.json_to_sheet(data);

    // تعریف یک فایل اکسل و نوشتن داده ها در آن
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // ذخیره و دانلود فایل
    XLSX.writeFile(wb, "data.xlsx");

  } else {
    alert('ماتریسی وجود ندارد')
  }
}
