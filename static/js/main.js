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
    window.location = '/routing/neshan'
  }
}

function handlerShowModal() {
  if (checkCaptcha()) {
    $('#showSettingModal').modal('toggle');
  }
}

function handlerHideModal() {
  $('#showSettingModal').modal('toggle');
}

function handlerCalculatedDurationCar(durationMatrix, vehicleRoutes) {
  let durations = {};

  for (let i = 1; i < vehicleRoutes.length; i++) {
    let route = vehicleRoutes[i];
    let duration = 0;

    for (let j = 1; j < route.length; j++) {
      let from = route[j - 1];
      let to = route[j];
      duration += durationMatrix[from][to];
    }

    durations[`ماشین شماره ${i}`] = Math.floor(duration / 60);
  }
  excelReport(durations)
}

function handlerSummaryDurationAndDistance(vehicle_matrix) {
  let duration_matrix_list = []
  let distance_matrix_list = []

  for (let i = 1; i < vehicle_matrix.length; i++) {
    let route = vehicle_matrix[i];
    let duration = 0;
    let distance = 0;

    for (let j = 1; j < route.length; j++) {
      let from = route[j - 1];
      let to = route[j];
      duration += duration_matrix[from][to];
      distance += distance_matrix[from][to];

    }
    duration_matrix_list.push(Math.floor(duration / 60))
    distance_matrix_list.push(Math.floor(distance / 1000))
  }


  for (const [index, el_duration] of duration_matrix_list.entries()) {
    $('#summary_duration').append(`<div class="col-12 col-md-6 col-lg-4"><p> ماشین شماره ${index + 1}: ${el_duration} دقیقه </p></div>`)
  }
  for (const [index, el_distance] of distance_matrix_list.entries()) {
    $('#summary_distance').append(`<div class="col-12 col-md-6 col-lg-4"><p> ماشین شماره ${index + 1}: ${el_distance} کیلومتر </p></div>`)
  }

  // var duration_list = encodeURIComponent(JSON.stringify(duration_matrix_list));
  // var distance_list = encodeURIComponent(JSON.stringify(distance_matrix_list));
  // window.open(`${'/router/summery?duration=' + duration_list + '&distance=' + distance_list}`, '_blank');
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
    XLSX.writeFile(wb, "duration_matrix" + Date.now() + '.xlsx');

  } else {
    alert('ماتریسی وجود ندارد')
  }
}

function handlerCounter() {
  timOUT = setInterval(() => {
    if (count < time) {
      count += 1800
      present = present + 1
      $('#countText').text('%' + ' ' + (present + 1))
    } else if (count == time) {
      count = 0
      present = 0
    } else {
      handlerStopInterval()
    }
  }, 1000)
}

window.onload = function () {
  document.getElementById('startCar').innerHTML = JSON.parse(localStorage.getItem("startCar")) || 600;
  document.getElementById('stopCar').innerHTML = JSON.parse(localStorage.getItem("stopCar")) || 0;
};

function vehicleMethod(e, name) {
  var arrStr = encodeURIComponent(JSON.stringify(e));
  window.open(`${'/router/' + name + '?list=' + arrStr}`, '_blank');


  removeRouting()
  setTimeout(() => {
    map.flyTo([e[0][0].lat, e[0][0].lng], 14);
    // map1.flyTo([e[0][0].lat, e[0][0].lng], 14);

    for (const [index1, el] of e.entries()) {
      let routingWaypoints = []
      for (const index2 in el) {
        routingWaypoints.push(L.latLng(el[index2].lat, el[index2].lng))
      }

      let routingControl = L.Routing.control({
        waypoints: routingWaypoints,
        draggableWaypoints: false,
        routeWhileDragging: false,
        fitSelectedRoutes: false,
        lineOptions: {
          // addWaypoints: true,
          styles: [{color: colors[index1], opacity: 0}]
        },
        createMarker: function (i, waypoint, n) {
          return L.marker(waypoint.latLng, {
            icon: (i === 0 || i === n - 1) ? L.divIcon({
              html: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="30" height="30" x="0" y="0" viewBox="0 0 450 450" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path fill="#acd5df" d="m248.5 255.475-15 15.784v193.743a51.21 51.21 0 0 0 8.825 28.741c2.944 4.342 9.406 4.342 12.351 0a51.21 51.21 0 0 0 8.825-28.741V271.259z" data-original="#acd5df" ></path><path fill="#93b7c0" d="M233.5 212v59.259c4.935.487 9.938 0 15 0s10.065.487 15 0V212z" data-original="#93b7c0"></path><path fill="#cc3245" d="M248.5 0v242c66.826 0 121-54.174 121-121S315.326 0 248.5 0z" data-original="#cc3245"></path><path fill="#ff3e3a" d="M339.5 121c0-66.826-40.742-121-91-121-66.826 0-121 54.174-121 121s54.174 121 121 121c50.258 0 91-54.174 91-121z" data-original="#ff3e3a"></path></g></svg>',
              className: "",
              // iconSize: [30, 80],
              iconAnchor: [0, 30],
            }) : L.divIcon({
              html: `<div class="view-svg-l-router">
															<p class="text-num">${i}</p>
															<svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" x="0" y="0" viewBox="0 0 450 450" preserveAspectRatio="xMidYMid meet">
															<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
															fill=${colors[index1]} stroke="none">
															<path d="M2335 4944 c-600 -81 -1107 -450 -1367 -994 -149 -312 -203 -703
															-139 -991 129 -573 619 -1434 1423 -2501 98 -130 192 -248 209 -262 64 -55
															153 -46 216 20 56 58 397 513 566 756 686 984 1048 1719 1073 2183 21 377
															-125 822 -374 1135 -65 81 -215 231 -297 295 -369 290 -850 422 -1310 359z"/>
															</g>
															</svg>
													</div>`,
              className: "",
              // iconSize: [30, 80],
              iconAnchor: [0, 40],
            })
          })
        }
      }).addTo(map);

      vehicleRoute.push(routingControl)
    }
  }, 500)
}

function salesmanMethod() {
  removeRouting()
  setTimeout(() => {
    map.flyTo([salesmanPoints[0].lat, salesmanPoints[0].lng], 14);
    let routingWaypoints = []
    for (const el of salesmanPoints) {
      routingWaypoints.push(L.latLng(el.lat, el.lng))
    }

    let routingControl = L.Routing.control({
      waypoints: routingWaypoints,
      draggableWaypoints: false,
      routeWhileDragging: false,
      lineOptions: {
        styles: [{color: colors[0], opacity: 0.5}]
      },
      createMarker: function (i, waypoint, n) {
        return L.marker(waypoint.latLng, {
          icon: (i === 0) ? L.divIcon({
            html: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="30" height="30" x="0" y="0" viewBox="0 0 450 450" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path fill="#acd5df" d="m248.5 255.475-15 15.784v193.743a51.21 51.21 0 0 0 8.825 28.741c2.944 4.342 9.406 4.342 12.351 0a51.21 51.21 0 0 0 8.825-28.741V271.259z" data-original="#acd5df" ></path><path fill="#93b7c0" d="M233.5 212v59.259c4.935.487 9.938 0 15 0s10.065.487 15 0V212z" data-original="#93b7c0"></path><path fill="#cc3245" d="M248.5 0v242c66.826 0 121-54.174 121-121S315.326 0 248.5 0z" data-original="#cc3245"></path><path fill="#ff3e3a" d="M339.5 121c0-66.826-40.742-121-91-121-66.826 0-121 54.174-121 121s54.174 121 121 121c50.258 0 91-54.174 91-121z" data-original="#ff3e3a"></path></g></svg>',
            className: "",
            iconAnchor: [0, 30],
          }) : L.divIcon({
            html: `<div class="view-svg-l-router">
															<p class="text-num">${i}</p>
															<svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" x="0" y="0" viewBox="0 0 450 450" preserveAspectRatio="xMidYMid meet">
															<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
															fill=${colors[0]} stroke="none">
															<path d="M2335 4944 c-600 -81 -1107 -450 -1367 -994 -149 -312 -203 -703
															-139 -991 129 -573 619 -1434 1423 -2501 98 -130 192 -248 209 -262 64 -55
															153 -46 216 20 56 58 397 513 566 756 686 984 1048 1719 1073 2183 21 377
															-125 822 -374 1135 -65 81 -215 231 -297 295 -369 290 -850 422 -1310 359z"/>
															</g>
															</svg>
													</div>`,
            className: "",
            iconAnchor: [0, 40],
          })
        })
      }
    }).addTo(map);

    vehicleRoute.push(routingControl)

  }, 500)
}

function _salesmanMethod() {
  removeRouting()
  setTimeout(() => {
    map.flyTo([_salesmanPoints[0].lat, _salesmanPoints[0].lng], 14);
    let routingWaypoints = []
    for (const el of _salesmanPoints) {
      routingWaypoints.push(L.latLng(el.lat, el.lng))
    }

    let routingControl = L.Routing.control({
      waypoints: routingWaypoints,
      draggableWaypoints: false,
      routeWhileDragging: false,
      lineOptions: {
        styles: [{color: colors[0], opacity: 0.5}]
      },
      createMarker: function (i, waypoint, n) {
        return L.marker(waypoint.latLng, {
          icon: (i === 0 || i === n - 1) ? L.divIcon({
            html: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="30" height="30" x="0" y="0" viewBox="0 0 450 450" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path fill="#acd5df" d="m248.5 255.475-15 15.784v193.743a51.21 51.21 0 0 0 8.825 28.741c2.944 4.342 9.406 4.342 12.351 0a51.21 51.21 0 0 0 8.825-28.741V271.259z" data-original="#acd5df" ></path><path fill="#93b7c0" d="M233.5 212v59.259c4.935.487 9.938 0 15 0s10.065.487 15 0V212z" data-original="#93b7c0"></path><path fill="#cc3245" d="M248.5 0v242c66.826 0 121-54.174 121-121S315.326 0 248.5 0z" data-original="#cc3245"></path><path fill="#ff3e3a" d="M339.5 121c0-66.826-40.742-121-91-121-66.826 0-121 54.174-121 121s54.174 121 121 121c50.258 0 91-54.174 91-121z" data-original="#ff3e3a"></path></g></svg>',
            className: "",
            iconAnchor: [0, 30],
          }) : L.divIcon({
            html: `<div class="view-svg-l-router">
															<p class="text-num">${i}</p>
															<svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" x="0" y="0" viewBox="0 0 450 450" preserveAspectRatio="xMidYMid meet">
															<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
															fill=${colors[0]} stroke="none">
															<path d="M2335 4944 c-600 -81 -1107 -450 -1367 -994 -149 -312 -203 -703
															-139 -991 129 -573 619 -1434 1423 -2501 98 -130 192 -248 209 -262 64 -55
															153 -46 216 20 56 58 397 513 566 756 686 984 1048 1719 1073 2183 21 377
															-125 822 -374 1135 -65 81 -215 231 -297 295 -369 290 -850 422 -1310 359z"/>
															</g>
															</svg>
													</div>`,
            className: "",
            iconAnchor: [0, 40],
          })
        })
      }
    }).addTo(map);

    vehicleRoute.push(routingControl)
  }, 500)
}

function removeRouting() {
  for (var i = 0; i < vehicleRoute.length; i++) {
    map.removeControl(vehicleRoute[i]);
  }
  vehicleRoute = [];
  vehicleRoute1 = [];
  vehiclePolygon = [];
}

function removeItems() {
  removeRouting()
  document.getElementById('num-location-excel').innerText = 'آپلود اکسل'
  document.getElementById('num_vehicles').value = ''
  for (const marker of markers) {
    map.removeLayer(marker)
  }
  addMarker = []
  markers = []
  markers1 = []
  listMarker = []
  listMarker1 = []
}

function handlerUploadExcel() {
  document.getElementById('input-upload').click()
}

function handlerRemoveChildSummary() {
  const duration = document.getElementById("summary_duration");
  const distance = document.getElementById("summary_distance");
  const title = document.getElementById("title_route");
  const vehicle = document.getElementById("vehicle_routes");
  duration.innerHTML = '';
  distance.innerHTML = '';
  title.innerHTML = '';
  vehicle.innerHTML = '';
}


function handlerVehicleRoutes(e) {
  for (const [i, v] of e.entries()) {

    // $('#title_route').append(`<h6> </h6>`)

    var text = "";
    if (v.length > 0) {
      for (const [i1, v1] of v.entries()) {
        text += ` ${v1} -> `
      }
      text = text.substr(0, text.length - 3);
    } else {
      text = 'مسیری وجود ندارد'
    }

    $('#vehicle_routes').append(`<div class="d-flex align-items-center"><p>ماشین شماره ${i + 1} :  ${text}</p></div>`)
  }
}
